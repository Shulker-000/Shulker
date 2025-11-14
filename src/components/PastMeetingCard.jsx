import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FileText,
  Sparkles,
  Video,
  BarChart2,
  ArrowLeft,
  Clock,
  Calendar,
  Users,
  Bot,
  ChevronDown,
  HardHat,
  Server,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

const PastMeetingCard = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [showAllRecordings, setShowAllRecordings] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [pollAnswers, setPollAnswers] = useState({});

  // TEMP MOCK POLLS (remove when backend ready)
  const mockPolls = [
    {
      question: "What does FFT stand for?",
      options: [
        { option: "Fast Fourier Transform", isCorrect: true },
        { option: "Frequency Filter Table", isCorrect: false },
        { option: "Fast Function Tracker", isCorrect: false },
        { option: "Fourier Function Tool", isCorrect: false },
      ],
    },
    {
      question: "Which color model is used in digital images?",
      options: [
        { option: "RGB", isCorrect: true },
        { option: "RBY", isCorrect: false },
        { option: "HSB only", isCorrect: false },
        { option: "XYZ only", isCorrect: false },
      ],
    },
  ];


  useEffect(() => {
    const fetchMeetingData = async () => {
      if (!user || !user._id) {
        setIsLoading(false);
        setError("User is not authenticated. Please log in again.");
        return;
      }

      try {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        const res = await fetch(
          `${backendUrl}/api/v1/meetings/user/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
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
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
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
  }, [meetingId, user, backendUrl]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-gray-700"
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
          <p className="text-gray-600">Generating report overview...</p>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <FileText className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-red-500 font-bold text-lg mb-4">
          Error: {error || "Meeting not found"}
        </p>
        <button
          onClick={() => navigate("/past-meetings")}
          className="mt-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-md"
        >
          Go Back to Archive
        </button>
      </div>
    );
  }

  const { scheduledTime, endedAt, members, recordingUrl, polls, createdBy } =
    meeting;

  const effectivePolls = polls?.length ? polls : mockPolls;


  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex flex-col p-4">
      <div className="flex items-center text-gray-500 mb-1">
        <Icon className="w-4 h-4 mr-2" />
        <p className="text-xs font-medium uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-base font-semibold text-gray-800">{value}</p>
    </div>
  );

  const durationText = endedAt
    ? (() => {
      const diff = new Date(endedAt) - new Date(scheduledTime);
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      if (hours > 0) return `${hours}h ${minutes}m`;
      if (minutes > 0) return `${minutes}m ${seconds}s`;
      return `${seconds}s`;
    })()
    : "N/A";

  const hostName =
    typeof createdBy === "object"
      ? createdBy?.username || createdBy?.name || "Unknown"
      : createdBy || "Unknown";

  const attendeesCount = members ? members.length : 0;

  const visibleRecordings = showAllRecordings
    ? recordingUrl
    : recordingUrl?.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Back to Archive</span>
          </button>

          <div className="p-8 pb-0">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Session Report
            </h1>
            <div className="flex mt-2 items-center text-gray-700 font-semibold">
              <User className="w-5 h-5 mr-2 text-yellow-600" />
              Host: {hostName}
            </div>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-10 lg:gap-10">
          <div className="lg:col-span-3 space-y-6 mb-8 lg:mb-0">
            <div className="space-y-4">
              <DetailItem
                icon={Calendar}
                label="Start Time"
                value={new Date(scheduledTime).toLocaleString("en-IN")}
              />
              <DetailItem
                icon={Clock}
                label="End Time"
                value={
                  endedAt ? new Date(endedAt).toLocaleString("en-IN") : "N/A"
                }
              />
              <DetailItem icon={Clock} label="Duration" value={durationText} />
            </div>

            {/* Attendees */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-3 text-gray-700">
                <Users className="w-5 h-5 mr-2 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-800">
                  Attendees ({attendeesCount})
                </h3>
              </div>
              <div className="flex flex-col gap-4">
                {members && members.length > 0 ? (
                  members.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <img
                        src={
                          m.user.avatar ||
                          `https://ui-avatars.com/api/?name=${m.user.username}`
                        }
                        alt={m.user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-gray-800 font-medium">
                        {m.user.username}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No attendees recorded.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 space-y-10">
            {/* Summary */}
            <div className="p-8 transition-all duration-500">
              <div className="flex items-center justify-between mb-0">
                <div className="flex items-center text-yellow-600">
                  <Sparkles className="w-6 h-6 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    AI Summary
                  </h2>
                </div>
              </div>

              {summary ? (
                <>
                  <div
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[1200px]" : "max-h-60"
                      }`}
                  >
                    <p className="text-gray-700 whitespace-pre-line leading-loose text-lg">
                      {summary}
                    </p>
                    {!expanded && (
                      <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"></div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 text-sm text-gray-500 italic flex items-center">
                    <Bot className="w-4 h-4 mr-2 text-yellow-600" />
                    This content is AI-generated. Verify for critical use.
                  </div>
                </>
              ) : (
                <p className="text-gray-500 italic">
                  The quick brown fox jumps over the lazy dog.
                  My Mum tries to be cool by saying that she likes all the same things that I do.
                  A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt.
                  Last Friday I saw a spotted striped blue worm shake hands with a legless lizard.
                  A song can make or ruin a person’s day if they let it get to them.
                  Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.

                </p>
              )}

              {summary && summary.length > 500 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-5 px-6 py-2 text-sm font-semibold text-gray-700 flex items-center"
                >
                  {expanded ? "Show Less" : "Read Full Summary"}
                  <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform ${expanded ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>
              )}
            </div>

            {/* Recordings */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 -mt-6 border-gray-500">
              <div className="flex items-center mb-0 text-gray-700">
                <Video className="w-6 h-6 mr-3 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Media Attachments ({recordingUrl?.length || 0})
                </h2>
              </div>

              {recordingUrl && recordingUrl.length > 0 ? (
                <>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: showAllRecordings
                        ? `${recordingUrl.length * 80}px`
                        : `${Math.min(recordingUrl.length, 3) * 80}px`,
                    }}
                  >
                    {visibleRecordings.map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-gray-100 rounded-lg p-4 mb-2 hover:bg-gray-200 transition-all group border-b-2 border-gray-300"
                      >
                        <span className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                          Recording {idx + 1}
                        </span>
                        <span className="text-gray-600 text-sm font-mono tracking-widest">
                          &#10148;
                        </span>
                      </a>
                    ))}
                  </div>

                  {recordingUrl.length > 3 && (
                    <button
                      onClick={() => setShowAllRecordings(!showAllRecordings)}
                      className="mt-2 text-sm font-semibold text-blue-600 hover:underline focus:outline-none transition"
                    >
                      {showAllRecordings ? "Show Less" : "Show More"}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500 italic">
                  No media recordings found.
                </p>
              )}
            </div>

            {/* Polls (untouched) */}
            {/* Polls Enhanced (Interactive Mock) */}
            <div className="bg-white rounded-xl shadow-xl p-8 border-l-8 border-green-600">
              <div className="flex items-center mb-5 text-green-700">
                <BarChart2 className="w-6 h-6 mr-3 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Poll Analysis</h2>
              </div>

              {effectivePolls && effectivePolls.length > 0 ? (
                <div className="space-y-10">
                  {effectivePolls.map((poll, pollIndex) => {
                    const selected = pollAnswers[pollIndex];

                    return (
                      <div key={pollIndex} className="p-5 rounded-lg border border-gray-200 bg-gray-50">
                        <p className="font-bold text-lg text-gray-900 mb-4">
                          Q{pollIndex + 1}: {poll.question}
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {poll.options.map((opt, optIndex) => {
                            const isCorrect = opt.isCorrect;
                            const isSelected = selected === optIndex;

                            return (
                              <button
                                key={optIndex}
                                onClick={() => {
                                  if (selected == null)
                                    setPollAnswers(prev => ({ ...prev, [pollIndex]: optIndex }));
                                }}
                                className={`
                      w-full text-left px-4 py-3 rounded-lg border transition flex justify-between items-center
                      ${selected == null ? "hover:bg-gray-200" : ""}
                      ${isSelected
                                    ? isCorrect
                                      ? "bg-green-100 border-green-500"
                                      : "bg-red-100 border-red-500"
                                    : "bg-white border-gray-300"
                                  }
                    `}
                              >
                                <span className="font-medium text-gray-800">{opt.option}</span>

                                {isSelected && (
                                  <span
                                    className={`text-xs font-bold px-3 py-1 rounded-full ${isCorrect
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 text-white"
                                      }`}
                                  >
                                    {isCorrect ? "Correct" : "Wrong"}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">No interactive poll data recorded.</p>
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default PastMeetingCard;
