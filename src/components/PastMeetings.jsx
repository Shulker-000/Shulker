import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, Clock, Sparkles } from 'lucide-react';

// Mock data to simulate backend response
const mockPastMeetings = [
  {
    id: '1',
    title: 'Weekly Project Sync',
    date: 'September 15, 2025',
    duration: '45 mins',
    summary: 'Discussed project milestones, assigned tasks for the upcoming week, and identified a potential blocker with the API integration. Next steps were defined.',
  },
  {
    id: '2',
    title: 'Client Onboarding Call',
    date: 'September 12, 2025',
    duration: '1 hr 10 mins',
    summary: 'Introduced the new client to the team and product features. Answered questions regarding pricing and support. Scheduled a follow-up for next week.',
  },
  {
    id: '3',
    title: 'Q3 Planning Session',
    date: 'September 8, 2025',
    duration: '2 hrs',
    summary: 'Reviewed Q2 performance and set strategic goals for Q3. Allocated budgets for marketing and development. Action items were assigned to department heads.',
  },
];

const PastMeetings = () => {
  const navigate = useNavigate();

  // Function to simulate fetching data from a backend
  // useEffect(() => {
  //   const fetchMeetings = async () => {
  //     // const response = await fetch('/api/v1/meetings/past');
  //     // const data = await response.json();
  //     // setMeetings(data);
  //   };
  //   fetchMeetings();
  // }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Past Meetings & AI Summaries
        </h1>

        <div className="space-y-6">
          {mockPastMeetings.length > 0 ? (
            mockPastMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{meeting.title}</h2>
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
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {meeting.summary}
                </p>

                {/* Button to view full details (including full transcript, etc.) */}
                <button
                  onClick={() => alert(`Viewing full summary for ${meeting.title}`)}
                  className="flex items-center text-blue-600 font-medium hover:underline transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Full Report
                </button>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-white rounded-2xl shadow-lg">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500 font-medium">No past meetings found.</p>
              <p className="text-sm text-gray-400 mt-2">
                Your completed meetings will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastMeetings;
