import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileText, Sparkles, Video, BarChart2, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";

const PastMeetingCard = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMeetingData = async () => {
      if (!user || !user._id) {
        setIsLoading(false);
        setError("User is not authenticated. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);

        const res = await fetch(
          `${backendUrl}/api/v1/meetings/user/${user._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const msg =
            errData.message ||
            `Failed to fetch meetings (status ${res.status})`;
          throw new Error(msg);
        }

        const data = await res.json();
        const meetingList = data?.data || [];
        const selectedMeeting = meetingList.find((m) => m._id === meetingId);

        if (!selectedMeeting) {
          throw new Error("Meeting not found or inaccessible.");
        }

        setMeeting(selectedMeeting);

        const summaryRes = await fetch(
          `${backendUrl}/api/v1/summary/meeting/${meetingId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!summaryRes.ok) {
          setSummary(null);
        } else {
          const summaryData = await summaryRes.json();
          setSummary(summaryData?.data?.summary || null);
        }
      } catch (err) {
        console.error("Error fetching meeting data:", err);
        setError(
          err.message || "Unexpected error occurred while fetching data."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading meeting details...</p>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <FileText className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-red-500 font-semibold mb-2">
          Error: {error || "Meeting not found"}
        </p>
        <button
          onClick={() => navigate("/past-meetings")}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { scheduledTime, endedAt, members, recordingUrl, polls, createdBy } =
    meeting;

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
      </div>

      {/* Meeting Info */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {meetingId || "Untitled Meeting"}
        </h1>
        <p className="text-gray-600 mb-1">
          <strong>Start:</strong>{" "}
          {new Date(scheduledTime).toLocaleString("en-IN")}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>End:</strong>{" "}
          {endedAt ? new Date(endedAt).toLocaleString("en-IN") : "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Duration:</strong>{" "}
          {endedAt
            ? (() => {
                const diff = new Date(endedAt) - new Date(scheduledTime);
                const totalSeconds = Math.floor(diff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                return `${hours}h ${minutes}m ${seconds}s`;
              })()
            : "N/A"}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Host:</strong>{" "}
          {typeof createdBy === "object"
            ? createdBy?.username || createdBy?.name || "Unknown"
            : createdBy || "Unknown"}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Attendees:</strong>{" "}
          {members && members.length > 0
            ? members.map((m) => m.user.username).join(", ")
            : "No attendees"}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-500 ease-in-out">
        <div className="flex items-center mb-3 text-purple-600">
          <Sparkles className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">AI Summary</h2>
        </div>

        {summary ? (
          <div
            className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "max-h-[1000px]" : "max-h-32"
            }`}
          >
            <p className="text-gray-700 whitespace-pre-line">{summary}</p>
            {!expanded && (
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No summary available for this meeting.
          </p>
        )}

        {summary && summary.length > 20 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            {expanded ? "Show Less ▲" : "Show More ▼"}
          </button>
        )}
      </div>

      {/* Recordings */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-3 text-blue-600">
          <Video className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">
            Recordings ({recordingUrl?.length || 0})
          </h2>
        </div>

        {recordingUrl && recordingUrl.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recordingUrl.map((url, idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2 hover:shadow-md transition-all"
              >
                <span className="font-medium text-gray-800">
                  Recording {idx + 1}
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                  Click to View
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No recordings found.</p>
        )}
      </div>

      {/* Polls */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-3 text-green-600">
          <BarChart2 className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Polls</h2>
        </div>
        {polls && polls.length > 0 ? (
          <div className="space-y-4">
            {polls.map((poll, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-800 mb-2">
                  {poll.question}
                </p>
                {poll.options.map((opt, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-gray-600 text-sm"
                  >
                    <span>{opt.option}</span>
                    <span>{opt.votes} votes</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">
            No polls conducted in this meeting.
          </p>
        )}
      </div>
    </div>
  );
};

export default PastMeetingCard;
