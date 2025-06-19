import { MessageSquare, Star, BarChart3, Users, Layout, Mic, Video, Presentation } from 'lucide-react';

// Features data
const features = [
  {
    id: 1,
    title: "Live Transcription & Multilingual Subtitles",
    description: "Real-time transcription with automatic translation using advanced NLP algorithms for seamless global communication.",
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    category: "AI"
  },
  {
    id: 2,
    title: "AI Note Taker & Smart Summarizer",
    description: "Automatic generation of concise meeting summaries, key points, and action items with intelligent categorization.",
    icon: <Star className="w-8 h-8 text-blue-600" />,
    category: "AI"
  },
  {
    id: 3,
    title: "Keyword & Topic Detection + Contextual Recommendations",
    description: "Understand discussion context and recommend relevant documents, links, or resources in real-time.",
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    category: "Analytics"
  },
  {
    id: 4,
    title: "To-Do & Decision Extraction",
    description: "Automatically extract and sync actionable items to your favorite productivity platforms like Asana, Trello, or Slack.",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    category: "Productivity"
  },
  {
    id: 5,
    title: "AI Whiteboard with Diagram Generation",
    description: "Convert rough sketches into clean flowcharts or UML diagrams using computer vision and pattern recognition.",
    icon: <Layout className="w-8 h-8 text-blue-600" />,
    category: "Collaboration"
  },
  {
    id: 6,
    title: "Advanced Audio Enhancement",
    description: "Noise cancellation, echo reduction, and speech clarity enhancement using signal processing models.",
    icon: <Mic className="w-8 h-8 text-blue-600" />,
    category: "Audio"
  },
  {
    id: 7,
    title: "Active Speaker Detection & Auto Focus",
    description: "Track and highlight the active speaker using advanced face and voice analysis algorithms.",
    icon: <Video className="w-8 h-8 text-blue-600" />,
    category: "Video"
  },
  {
    id: 8,
    title: "Voice-Activated Meeting Controls",
    description: "Enable control of meeting functions via natural language understanding for hands-free operation.",
    icon: <Mic className="w-8 h-8 text-blue-600" />,
    category: "Voice"
  },
  {
    id: 9,
    title: "Focus Mode",
    description: "AI identifies critical discussion moments and automatically mutes non-essential UI elements for better concentration.",
    icon: <Star className="w-8 h-8 text-blue-600" />,
    category: "AI"
  },
  {
    id: 10,
    title: "Background Blur & Privacy Filters",
    description: "Advanced background segmentation models to blur or replace environments while maintaining professional appearance.",
    icon: <Video className="w-8 h-8 text-blue-600" />,
    category: "Privacy"
  },
  {
    id: 11,
    title: "Smart Distraction & Engagement Detection",
    description: "Computer vision to detect user attention levels, providing gentle nudges when engagement drops.",
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    category: "Analytics"
  },
  {
    id: 12,
    title: "Hand Gesture Recognition for Reactions",
    description: "Use advanced gesture recognition for natural reactions like thumbs up, raise hand, or applause.",
    icon: <Users className="w-8 h-8 text-blue-600" />,
    category: "Interaction"
  },
  {
    id: 13,
    title: "Real-Time Speaker Analytics",
    description: "Visual analytics dashboard showing talk time distribution, speaking frequency, and team balance metrics.",
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    category: "Analytics"
  },
  {
    id: 14,
    title: "Integrated File Sharing with AI Summarization",
    description: "Upload and share documents with AI automatically summarizing content for quick team reference.",
    icon: <Presentation className="w-8 h-8 text-blue-600" />,
    category: "Collaboration"
  },
  {
    id: 15,
    title: "Live Polling & Q&A with AI Moderation",
    description: "Interactive polls and AI-managed Q&A sessions with duplicate detection and intelligent summarization.",
    icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
    category: "Engagement"
  },
  {
    id: 16,
    title: "Smart Recording Management",
    description: "Backend-controlled selective recording features with AI-based indexing and searchable transcripts.",
    icon: <Video className="w-8 h-8 text-blue-600" />,
    category: "Recording"
  }
];

export default features