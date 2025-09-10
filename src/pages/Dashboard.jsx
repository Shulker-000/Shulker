import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// Icon imports from lucide-react
import {
  Calendar,
  Users,
  Video,
  ArrowRight,
  FileText,
  Timer,
} from "lucide-react";

// --- Mock Data ---
const mockMeetings = [
  {
    id: "1",
    title: "Weekly Sync",
    date: "August 20, 2025",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Project Shulker Demo",
    date: "August 18, 2025",
    time: "02:30 PM",
    status: "Completed",
  },
  {
    id: "3",
    title: "Q3 Planning",
    date: "August 22, 2025",
    time: "09:00 AM",
    status: "Upcoming",
  },
  {
    id: "4",
    title: "Client Onboarding",
    date: "August 19, 2025",
    time: "04:00 PM",
    status: "Completed",
  },
];

// --- Dashboard Component ---
const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize the navigate function

  // Filter meetings into upcoming and past
  const upcomingMeetings = mockMeetings.filter((m) => m.status === "Upcoming");
  const pastMeetings = mockMeetings.filter((m) => m.status === "Completed");

  // --- API Utility Functions (placeholders) ---
  const startNewMeeting = () => {
    // Generate a new, unique meeting ID
    const newMeetingId = crypto.randomUUID();
    console.log(
      `Action: Starting new instant meeting with ID ${newMeetingId}...`
    );
    // Navigate to the MeetingRoom component with the new ID
    navigate(`/meetings/${newMeetingId}`);
  };

  const joinMeeting = (meetingId) => {
    console.log(`Action: Joining meeting ID ${meetingId}...`);
    // Navigate to the specific meeting room
    navigate(`/meetings/${meetingId}`);
  };

  return (
    <div className="min-h-screen lg:min-h-0 lg:h-[92vh] md:mb-4 lg:mb-0 p-4 sm:p-8 font-sans text-gray-800">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Column 1: Primary Content */}
        <div className="lg:col-span-2 xl:col-span-3 space-y-6">
          {/* Quick Actions Card */}
          <section className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={startNewMeeting}
                className="flex flex-col items-start p-6 bg-purple-100 text-purple-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-purple-200"
              >
                <Video className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">New Meeting</span>
                <span className="text-sm text-purple-600">
                  Start a call now.
                </span>
              </button>
              <button className="flex flex-col items-start p-6 bg-blue-100 text-blue-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-blue-200">
                <Calendar className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Schedule</span>
                <span className="text-sm text-blue-600">Plan for later.</span>
              </button>
              <button className="flex flex-col items-start p-6 bg-green-100 text-green-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-green-200">
                <FileText className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Past Meetings</span>
                <span className="text-sm text-green-600">
                  Review previous calls.
                </span>
              </button>
              <button className="flex flex-col items-start p-6 bg-yellow-100 text-yellow-800 rounded-2xl transition-transform transform hover:scale-105 hover:bg-yellow-200">
                <Users className="w-8 h-8 mb-2" />
                <span className="font-semibold text-lg">Invite Team</span>
                <span className="text-sm text-yellow-600">
                  Bring colleagues on board.
                </span>
              </button>
            </div>
          </section>

          {/* Upcoming Meetings Card */}
          <section className="bg-white p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Upcoming Meetings
              </h2>
              <button className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                See All <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-4">
              {upcomingMeetings.length > 0 ? (
                upcomingMeetings.map((meeting) => (
                  <li
                    key={meeting.id}
                    className="p-4 rounded-2xl bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="text-lg font-semibold">
                        {meeting.title}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {meeting.date} at {meeting.time}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex space-x-2">
                      <button
                        onClick={() => joinMeeting(meeting.id)}
                        className="flex items-center px-4 py-2 text-sm bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                      >
                        <Video className="w-4 h-4 mr-2" /> Join
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center p-8 text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>You have no upcoming meetings.</p>
                </div>
              )}
            </ul>
          </section>
        </div>

        {/* Column 2: At-a-Glance Info */}
        <div className="lg:col-span-1 xl:col-span-1 space-y-6">
          {/* Stats Card (Overview) */}
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
    </div>
  );
};

export default Dashboard;
