import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Calendar, Clock, Sparkles, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

const AttendeesModal = ({ isOpen, onClose, attendees }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-sans">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4 sm:mx-0 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Attendees</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <XCircle size={24} />
          </button>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <div key={attendee._id} className="flex items-center space-x-4">
                <img
                  src={attendee.avatar}
                  alt={attendee.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-gray-800 font-medium">{attendee.username}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No attendees found for this meeting.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const PastMeetings = () => {
  const navigate = useNavigate();
  const [pastMeetings, setPastMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!user || !user._id) {
        setIsLoading(false);
        setError("User is not authenticated. Please log in.");
        return;
      }

      setIsLoading(true);
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(
          `${backendUrl}/api/v1/meetings/user/${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch past meetings."
          );
        }

        const res = await response.json();
        res.data = res.data.filter((meeting) => meeting.status === "ended");
        res.data.sort(
          (a, b) => new Date(b.endedAt).getTime() - new Date(a.endedAt).getTime()
        );
        setPastMeetings(res.data);
      } catch (err) {
        console.error("Error fetching past meetings:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, [user]);

  console.log(pastMeetings);

  const handleAvatarClick = (attendees) => {
    setSelectedAttendees(attendees);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAttendees([]);
  };

  const formatMeetingTitle = (startISO, endISO) => {
    const startDate = new Date(startISO);
    const endDate = new Date(endISO);
    const result = {};
    result.formattedDate = startDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    result.formattedStart = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    result.formattedEnd = endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return result;
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-gray-400 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
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
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans text-gray-800">
      <div className="w-[90vw] mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Past Meetings
        </h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {pastMeetings.length > 0 ? (
            pastMeetings.map((meeting) => (
              console.log(meeting.scheduledTime, meeting.endedAt),
              <div
                key={meeting._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div onClick={() => navigate(`/meetings/${meeting._id}/report`)}>
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {formatMeetingTitle(meeting.scheduledTime, meeting.endedAt)
                        .formattedDate}{" "}
                      <br />
                      {formatMeetingTitle(meeting.scheduledTime, meeting.endedAt)
                        .formattedStart}{" "}
                      -{" "}
                      {formatMeetingTitle(meeting.scheduledTime, meeting.endedAt)
                        .formattedEnd}
                    </h2>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{meeting.date}</span>
                      <Clock className="w-4 h-4" />
                      <span>{meeting.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600 mb-3">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold">AI Summary</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                    {meeting.summary}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-600 mb-2 block">
                    Attendees:
                  </span>
                  <div className="flex items-center flex-wrap -space-x-2">
                    {meeting.members &&
                      meeting.members.map((member) => (
                        <div key={member._id}>
                          <img
                            src={member.user.avatar}
                            alt={member.user.username}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm transition-transform duration-200 hover:scale-110 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAvatarClick(meeting.members);
                            }}
                          />
                        </div>
                      ))}
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-12 bg-white rounded-2xl shadow-lg">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500 font-medium">
                No past meetings found.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Your completed meetings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
      <AttendeesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        attendees={selectedAttendees}
      />
    </div>
  );
};

export default PastMeetings;