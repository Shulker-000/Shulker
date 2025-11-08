import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Video,
  ArrowRight,
  FileText,
  Timer,
  Link2,
  UserPlus,
} from "lucide-react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "./../components/ui/use-toast";
import { Input } from "./../components/ui/input.jsx";
import { Textarea } from "./../components/ui/TextArea.jsx";
import MeetingModal from "../components/MeetingModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  dateTime: new Date(),
  description: "",
  participants: "", // ADDED: New field for participants
  link: "",
   meetingId: "",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const client = useStreamVideoClient();
  const user = useSelector((state) => state.auth.user);
  const { toast } = useToast();

  const [meetingState, setMeetingState] = useState(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState();
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // ADDED: Loading state for button

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!user || !user._id) {
        setIsLoading(false);
        setError("User is not authenticated. Please log in.");
        return;
      }
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(
          `${backendUrl}/api/v1/meetings/user/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch meetings."
          );
        }
        const res = await response.json();
        setMeetings(res.data || []);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetings();
  }, [user]);

  const createMeeting = async () => {
    if (!client || !user) {
      toast({ title: "Stream client not ready. Please try again." });
      return;
    }
    setLoading(true); // Set loading to true
    try {
      // Logic for Instant Meeting
      if (meetingState === "isInstantMeeting") {
        const id = uuidv4();
        const call = client.call("default", id);

        if (!call) throw new Error("Failed to create call object.");
        const startsAt = values.dateTime.toISOString() || new Date().toISOString();
        const description = values.description || "Instant Meeting";
        await call.getOrCreate({
          data: {
            starts_at: startsAt,
            custom: { description },
          },
        });

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingId: id,
              scheduledTime: new Date().toISOString(),
              participants: [], // No participants for instant meeting
              title: "Instant Meeting",
            }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create meeting on backend");
        }

        setCallDetail(call);
        navigate(`/meetings/${id}`);
        toast({ title: "Instant Meeting Created" });
      } else if (meetingState === "isScheduleMeeting") {
        // Logic for Scheduled Meeting
        if (!values.dateTime || !values.participants) {
          toast({ title: "Please fill in all required fields" });
          setLoading(false);
          return;
        }

        const id = uuidv4();
        const call = client.call("default", id);
        if (!call) throw new Error("Failed to create call object.");

        await call.getOrCreate({
          data: {
            starts_at: values.dateTime.toISOString(),
            custom: { description: values.description || "Scheduled Meeting" },
          },
        });

        const participantEmails = values.participants
          .split(",")
          .map((e) => e.trim());
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/schedule`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingId: id,
              scheduledTime: values.dateTime,
              participants: participantEmails,
              title: values.description || "Scheduled Meeting",
            }),
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Backend error:", errorData);
          throw new Error("Failed to schedule meeting on backend");
        }

        // Handle success
        setCallDetail(call);
        setMeetingState("isScheduledSuccess"); // New state to show success modal
        toast({ title: "Meeting Scheduled" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast({ title: "Failed to create Meeting" });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const upcomingMeetings = meetings.filter(
    (m) => m.status == 'scheduled'
  );
  const currentMeetings = meetings.filter(
    (m) => m.status == 'ongoing'
  );

  const renderModal = () => {
    switch (meetingState) {
      case "isInstantMeeting":
        return (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Start an Instant Meeting"
            className="text-center"
            buttonText="Start Meeting"
            handleClick={createMeeting}
            buttonDisabled={loading}
          />
        );
      case "isScheduleMeeting":
        return (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Schedule Meeting"
            handleClick={createMeeting}
            buttonText={loading ? "Scheduling..." : "Schedule Meeting"}
            buttonDisabled={loading}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add a description (optional)
              </label>
              <Textarea
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                value={values.description}
              />
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Select date and time
              </label>
              <DatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2.5 mt-4">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add Participants (comma-separated emails)
              </label>
              <Input
                type="text"
                placeholder="e.g., user1@email.com, user2@email.com"
                onChange={(e) =>
                  setValues({ ...values, participants: e.target.value })
                }
                value={values.participants}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </MeetingModal>
        );
      case "isScheduledSuccess":
        return (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Scheduled"
            handleClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/meetings/${callDetail?.id}`
              );
              toast({ title: "Link Copied" });
            }}
            className="text-center"
            buttonText="Copy Meeting Link"
          >
            <p className="text-sm text-gray-500">
              A meeting invitation has been sent to all participants.
            </p>
          </MeetingModal>
        );
      case "isJoiningMeeting":
        return (
          <MeetingModal
            isOpen={true}
            onClose={() => {
              setMeetingState(undefined);
              setValues({ ...values, link: "" });
            }}
            title="Join a Meeting"
            className="text-center"
            buttonText="Join Meeting"
            handleClick={() => {
              if (values.link.trim()) {
                navigate(`/meetings/${values.link.trim()}`);
              }
            }}
          >
            <Input
              type="text"
              placeholder="Enter meeting link or ID"
              value={values.link}
              onChange={(e) => setValues({ ...values, link: e.target.value })}
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </MeetingModal>
        );
      case "isAddParticipants":
        return (
          <MeetingModal
            isOpen={true}
            onClose={() => setMeetingState(undefined)}
            title="Add Participants"
            handleClick={async () => {
              const participantEmails = values.participants
                .split(",")
                .map((e) => e.trim());
              if (participantEmails.length === 0 || !values.meetingId) {
                toast({ title: "Enter at least one valid email." });
                return;
              }

              try {
                const res = await fetch(
                  `${
                    import.meta.env.VITE_BACKEND_URL
                  }/api/v1/meetings/add-participants`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      meetingId: values.meetingId,
                      participants: participantEmails,
                    }),
                    credentials: "include",
                  }
                );

                const data = await res.json();
                if (!res.ok)
                  throw new Error(data.message || "Failed to add participants");

                toast({ title: "Participants invited successfully" });
                setMeetingState(undefined);
                setValues(initialValues);
              } catch (err) {
                toast({ title: err.message || "Error adding participants" });
              }
            }}
            buttonText="Send Invites"
          >
            <div className="flex flex-col gap-2.5 mt-4">
              <label className="text-base font-normal leading-[22.4px] text-sky-2">
                Add Participants (comma-separated emails)
              </label>
              <Input
                type="text"
                placeholder="e.g., user1@email.com, user2@email.com"
                onChange={(e) =>
                  setValues({ ...values, participants: e.target.value })
                }
                value={values.participants}
                className="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </MeetingModal>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading meetings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-red-500 font-semibold">Error: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] md:mb-4 lg:mb-0 p-4 sm:p-8 font-sans text-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Column 1 */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setMeetingState("isInstantMeeting")}
                className="flex flex-col items-start p-6 bg-purple-100 text-purple-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-purple-200"
              >
                <Video className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Start Meeting</span>
                <span className="text-sm text-purple-600">
                  Begin instantly.
                </span>
              </button>
              <button
                onClick={() => setMeetingState("isScheduleMeeting")}
                className="flex flex-col items-start p-6 bg-blue-100 text-blue-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-blue-200"
              >
                <Calendar className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Schedule</span>
                <span className="text-sm text-blue-600">Plan for later.</span>
              </button>
              <button
                onClick={() => navigate("/past-meetings")}
                className="flex flex-col items-start p-6 bg-green-100 text-green-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-green-200"
              >
                <FileText className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Past Meetings</span>
                <span className="text-sm text-green-600">
                  Review previous calls.
                </span>
              </button>
              <button
                onClick={() => setMeetingState("isJoiningMeeting")}
                className="flex flex-col items-start p-6 bg-yellow-100 text-yellow-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-yellow-200"
              >
                <Link2 className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Join Meeting</span>
                <span className="text-sm text-yellow-600">
                  Enter a link to join.
                </span>
              </button>
            </div>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Upcoming Meetings
              </h2>
              <ul className="space-y-4">
                {upcomingMeetings.length > 0 ? (
                  upcomingMeetings.map((meeting) => (
                    <li
                      key={meeting._id}
                      className="p-4 rounded-2xl bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <div className="text-lg font-semibold">
                          {meeting.title || "Meeting"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(meeting.scheduledTime).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/meetings/${meeting.meetingId}`)
                          }
                          className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                        >
                          Join
                        </button>

                        {meeting.createdBy?._id === user?._id && (
                          <button
                          title="Add Participants"
                            onClick={() => {
                              setValues({
                                ...values,
                                meetingId: meeting.meetingId,
                              });
                              setMeetingState("isAddParticipants");
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          >
                            <UserPlus/>
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No upcoming meetings.</p>
                )}
              </ul>
            </section>
            {/* Current Meetings */}
            <section className="bg-white p-6 rounded-3xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Current Meetings
              </h2>
              <ul className="space-y-4">
                {currentMeetings.length > 0 ? (
                  currentMeetings.map((meeting) => (
                    <li
                      key={meeting._id}
                      className="p-4 rounded-2xl bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <div className="text-lg font-semibold">
                          {meeting.title || "Meeting"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(meeting.scheduledTime).toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`/meetings/${meeting.meetingId}`)
                        }
                        className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                      >
                        Join
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No ongoing meetings right now.
                  </p>
                )}
              </ul>
            </section>
          </div>
        </div>
        {/* Column 2 */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl bg-purple-50 flex flex-col items-center justify-center text-center">
                <Calendar className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-bold mt-2">
                  {upcomingMeetings.length}
                </h3>
                <p className="text-sm text-gray-500">Upcoming</p>
              </div>
              <div className="p-4 rounded-2xl bg-red-50 flex flex-col items-center justify-center text-center">
                <Timer className="w-8 h-8 text-red-500" />
                <h3 className="text-xl font-bold mt-2">2h 15m</h3>
                <p className="text-sm text-gray-500">Talk Time</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default Dashboard;
