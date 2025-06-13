import React from 'react';
import { 
  Brain, 
  MessageSquare, 
  Globe, 
  FileText, 
  Target, 
  PaintBucket, 
  Volume2, 
  Users, 
  Mic, 
  Eye, 
  Hand, 
  BarChart3, 
  Upload, 
  Vote, 
  Video,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturesPage = () => {
  const aiFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Live Transcription & Multilingual Subtitles",
      description: "Real-time transcription with automatic translation using advanced NLP. Break language barriers and ensure everyone understands every word.",
      benefits: ["50+ languages supported", "99% accuracy", "Real-time translation"],
      gradient: "from-[#A1E3F9] to-[#578FCA]"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Note Taker & Smart Summarizer",
      description: "Automatic generation of concise meeting summaries, key points, and action items. Never miss important details again.",
      benefits: ["Auto-generated summaries", "Key point extraction", "Action item tracking"],
      gradient: "from-[#D1F8EF] to-[#A1E3F9]"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Keyword & Topic Detection",
      description: "Understand discussion context and automatically recommend relevant documents, links, and resources based on conversation topics.",
      benefits: ["Context-aware suggestions", "Smart recommendations", "Topic tracking"],
      gradient: "from-[#578FCA] to-[#3674B5]"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "To-Do & Decision Extraction",
      description: "Automatically extract actionable items and sync them to productivity platforms like Notion, Trello, and Asana.",
      benefits: ["Auto task creation", "Platform integration", "Decision tracking"],
      gradient: "from-[#A1E3F9] to-[#578FCA]"
    },
    {
      icon: <PaintBucket className="w-8 h-8" />,
      title: "AI Whiteboard with Diagram Generation",
      description: "Convert rough sketches into clean flowcharts, UML diagrams, and professional visuals using computer vision.",
      benefits: ["Sketch recognition", "Auto-formatting", "Professional diagrams"],
      gradient: "from-[#D1F8EF] to-[#578FCA]"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Advanced Audio Enhancement",
      description: "Crystal-clear audio with noise cancellation, echo reduction, and speech clarity enhancement using AI signal processing.",
      benefits: ["Noise cancellation", "Echo reduction", "Speech enhancement"],
      gradient: "from-[#578FCA] to-[#A1E3F9]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Active Speaker Detection & Auto Focus",
      description: "Automatically track and highlight the active speaker using advanced face and voice analysis algorithms.",
      benefits: ["Auto speaker focus", "Face detection", "Voice analysis"],
      gradient: "from-[#A1E3F9] to-[#3674B5]"
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice-Activated Meeting Controls",
      description: "Control meeting functions using natural language commands. Say 'mute all' or 'start recording' and watch it happen.",
      benefits: ["Voice commands", "Natural language", "Hands-free control"],
      gradient: "from-[#D1F8EF] to-[#A1E3F9]"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Focus Mode & Engagement Detection",
      description: "AI identifies critical discussion moments and detects user attention, providing gentle nudges when engagement drops.",
      benefits: ["Attention tracking", "Focus optimization", "Engagement alerts"],
      gradient: "from-[#578FCA] to-[#3674B5]"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Background Blur & Privacy Filters",
      description: "Advanced background segmentation to blur or replace environments, ensuring privacy and professionalism.",
      benefits: ["Smart background blur", "Virtual backgrounds", "Privacy protection"],
      gradient: "from-[#3674B5] to-[#578FCA]"
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Hand Gesture Recognition",
      description: "Use natural hand gestures for reactions like thumbs up, raise hand, or applause without touching any buttons.",
      benefits: ["Gesture recognition", "Natural reactions", "Touchless interaction"],
      gradient: "from-[#A1E3F9] to-[#D1F8EF]"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Speaker Analytics",
      description: "Visual analytics on talk time, frequency, and speaker balance to ensure inclusive and balanced discussions.",
      benefits: ["Talk time tracking", "Speaker balance", "Participation insights"],
      gradient: "from-[#3674B5] to-[#A1E3F9]"
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "AI File Sharing & Summarization",
      description: "Upload and share documents with AI automatically summarizing content for quick reference and understanding.",
      benefits: ["Auto file summary", "Quick reference", "Content extraction"],
      gradient: "from-[#D1F8EF] to-[#578FCA]"
    },
    {
      icon: <Vote className="w-8 h-8" />,
      title: "Live Polling & AI Moderation",
      description: "Interactive polls and AI-managed Q&A with duplicate detection, question summarization, and smart moderation.",
      benefits: ["Interactive polls", "Duplicate detection", "Smart moderation"],
      gradient: "from-[#578FCA] to-[#D1F8EF]"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Smart Recording Management",
      description: "Selective recording with AI-based indexing, making it easy to find and reference specific moments from meetings.",
      benefits: ["Selective recording", "AI indexing", "Moment search"],
      gradient: "from-[#A1E3F9] to-[#3674B5]"
    }
  ];

  const impactStats = [
    { number: "70%", label: "Reduction in post-meeting workload", icon: <Clock className="w-6 h-6" /> },
    { number: "50+", label: "Languages supported for translation", icon: <Globe className="w-6 h-6" /> },
    { number: "99%", label: "Transcription accuracy", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "5x", label: "Faster meeting summaries", icon: <Zap className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D1F8EF] to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#3674B5] via-[#578FCA] to-[#A1E3F9]">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm rounded-full px-6 py-3">
                <Brain className="w-8 h-8 text-white" />
                <Sparkles className="w-6 h-6 text-[#D1F8EF]" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              AI-Powered Meeting
              <span className="block bg-gradient-to-r from-[#D1F8EF] to-[#A1E3F9] bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of video conferencing with 15+ cutting-edge AI features that make meetings smarter, 
              more inclusive, and incredibly productive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#3674B5] px-8 py-4 rounded-lg font-semibold hover:bg-[#D1F8EF] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <span>Try AI Features Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#3674B5] transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#578FCA] to-[#3674B5] rounded-full flex items-center justify-center text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-[#3674B5] mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="py-20 bg-gradient-to-br from-[#D1F8EF]/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#3674B5] mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of AI features transforms every aspect of your meeting experience, 
              from real-time translation to automated action items.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#A1E3F9]/20 hover:border-[#578FCA]/30 h-full flex flex-col min-h-[400px]">
                  {/* Icon Section - Fixed Height */}
                  <div className="flex justify-center mb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Title Section - Fixed Height */}
                  <div className="text-center mb-4 h-16 flex items-center justify-center">
                    <h3 className="text-lg font-bold text-[#3674B5] group-hover:text-[#578FCA] transition-colors duration-200 leading-tight">
                      {feature.title}
                    </h3>
                  </div>
                  
                  {/* Description Section - Flexible Height */}
                  <p className="text-gray-600 text-sm leading-relaxed text-center mb-6 flex-grow">
                    {feature.description}
                  </p>
                  
                  {/* Benefits Section - Fixed Position at Bottom */}
                  <div className="space-y-2 mt-auto">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-[#578FCA] rounded-full flex-shrink-0"></div>
                        <span className="leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-[#3674B5] to-[#578FCA]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of teams already using AI to make their meetings more productive, 
            inclusive, and engaging.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#3674B5] px-8 py-4 rounded-lg font-semibold hover:bg-[#D1F8EF] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <Link
                  to="/login"
                >
                  Get Started
                </Link>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#3674B5] transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;