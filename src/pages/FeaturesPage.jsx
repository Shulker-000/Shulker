import React from "react";
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
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const aiFeatures = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Live Transcription & Multilingual Subtitles",
      description:
        "Real-time transcription with automatic translation using advanced NLP. Break language barriers and ensure everyone understands every word.",
      benefits: [
        "50+ languages supported",
        "99% accuracy",
        "Real-time translation",
      ],
      gradient: "from-[#48cae4] to-[#00b4d8]",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Note Taker & Smart Summarizer",
      description:
        "Automatic generation of concise meeting summaries, key points, and action items. Never miss important details again.",
      benefits: [
        "Auto-generated summaries",
        "Key point extraction",
        "Action item tracking",
      ],
      gradient: "from-[#90e0ef] to-[#48cae4]",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Keyword & Topic Detection",
      description:
        "Understand discussion context and automatically recommend relevant documents, links, and resources based on conversation topics.",
      benefits: [
        "Context-aware suggestions",
        "Smart recommendations",
        "Topic tracking",
      ],
      gradient: "from-[#0077b6] to-[#0096c7]",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "To-Do & Decision Extraction",
      description:
        "Automatically extract actionable items and sync them to productivity platforms like Notion, Trello, and Asana.",
      benefits: [
        "Auto task creation",
        "Platform integration",
        "Decision tracking",
      ],
      gradient: "from-[#00b4d8] to-[#0077b6]",
    },
    {
      icon: <PaintBucket className="w-8 h-8" />,
      title: "AI Whiteboard with Diagram Generation",
      description:
        "Convert rough sketches into clean flowcharts, UML diagrams, and professional visuals using computer vision.",
      benefits: [
        "Sketch recognition",
        "Auto-formatting",
        "Professional diagrams",
      ],
      gradient: "from-[#ade8f4] to-[#48cae4]",
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Advanced Audio Enhancement",
      description:
        "Crystal-clear audio with noise cancellation, echo reduction, and speech clarity enhancement using AI signal processing.",
      benefits: ["Noise cancellation", "Echo reduction", "Speech enhancement"],
      gradient: "from-[#0096c7] to-[#00b4d8]",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Active Speaker Detection & Auto Focus",
      description:
        "Automatically track and highlight the active speaker using advanced face and voice analysis algorithms.",
      benefits: ["Auto speaker focus", "Face detection", "Voice analysis"],
      gradient: "from-[#023e8a] to-[#0077b6]",
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Voice-Activated Meeting Controls",
      description:
        "Control meeting functions using natural language commands. Say 'mute all' or 'start recording' and watch it happen.",
      benefits: ["Voice commands", "Natural language", "Hands-free control"],
      gradient: "from-[#48cae4] to-[#90e0ef]",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Focus Mode & Engagement Detection",
      description:
        "AI identifies critical discussion moments and detects user attention, providing gentle nudges when engagement drops.",
      benefits: [
        "Attention tracking",
        "Focus optimization",
        "Engagement alerts",
      ],
      gradient: "from-[#0077b6] to-[#023e8a]",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Background Blur & Privacy Filters",
      description:
        "Advanced background segmentation to blur or replace environments, ensuring privacy and professionalism.",
      benefits: [
        "Smart background blur",
        "Virtual backgrounds",
        "Privacy protection",
      ],
      gradient: "from-[#03045e] to-[#023e8a]",
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Hand Gesture Recognition",
      description:
        "Use natural hand gestures for reactions like thumbs up, raise hand, or applause without touching any buttons.",
      benefits: [
        "Gesture recognition",
        "Natural reactions",
        "Touchless interaction",
      ],
      gradient: "from-[#90e0ef] to-[#caf0f8]",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-Time Speaker Analytics",
      description:
        "Visual analytics on talk time, frequency, and speaker balance to ensure inclusive and balanced discussions.",
      benefits: [
        "Talk time tracking",
        "Speaker balance",
        "Participation insights",
      ],
      gradient: "from-[#0096c7] to-[#48cae4]",
    },
    {
      icon: <Upload className="w-8 h-8" />,
      title: "AI File Sharing & Summarization",
      description:
        "Upload and share documents with AI automatically summarizing content for quick reference and understanding.",
      benefits: ["Auto file summary", "Quick reference", "Content extraction"],
      gradient: "from-[#ade8f4] to-[#00b4d8]",
    },
    {
      icon: <Vote className="w-8 h-8" />,
      title: "Live Polling & AI Moderation",
      description:
        "Interactive polls and AI-managed Q&A with duplicate detection, question summarization, and smart moderation.",
      benefits: [
        "Interactive polls",
        "Duplicate detection",
        "Smart moderation",
      ],
      gradient: "from-[#00b4d8] to-[#90e0ef]",
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Smart Recording Management",
      description:
        "Selective recording with AI-based indexing, making it easy to find and reference specific moments from meetings.",
      benefits: ["Selective recording", "AI indexing", "Moment search"],
      gradient: "from-[#48cae4] to-[#023e8a]",
    },
  ];

  const impactStats = [
    {
      number: "70%",
      label: "Reduction in post-meeting workload",
      icon: <Clock className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Languages supported for translation",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      number: "99%",
      label: "Transcription accuracy",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      number: "5x",
      label: "Faster meeting summaries",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#caf0f8] to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#03045e] via-[#023e8a] to-[#0077b6]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img src="/LogoIcon.svg" alt="Logo" className="h-28 w-28" />{" "}
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl opacity-0 transition-opacity duration-300"></div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                AI-Powered Meeting
                <span className="block bg-gradient-to-r from-[#90e0ef] to-[#48cae4] bg-clip-text text-transparent">
                  Revolution
                </span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
                Experience the future of video conferencing with 15+
                cutting-edge AI features that make meetings smarter, more
                inclusive, and incredibly productive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <button className="bg-white text-[#023e8a] px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-[#90e0ef] hover:text-[#03045e] transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:-translate-y-1">
                  <span>Try AI Features Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#023e8a] transition-all duration-300 transform hover:-translate-y-1">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-gradient-to-b from-[#caf0f8] to-[#ade8f4] hover:from-[#ade8f4] hover:to-[#90e0ef] transition-all duration-300 transform hover:-translate-y-2 shadow-md hover:shadow-lg"
                >
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-[#0077b6] to-[#0096c7] rounded-full flex items-center justify-center text-white shadow-lg">
                      <div className="scale-75 md:scale-100">{stat.icon}</div>
                    </div>
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#03045e] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#023e8a] text-xs md:text-sm font-medium px-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="py-16 md:py-20 bg-gradient-to-br from-[#caf0f8]/30 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#03045e] mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-lg md:text-xl text-[#023e8a] max-w-3xl mx-auto px-4">
                Our comprehensive suite of AI features transforms every aspect
                of your meeting experience, from real-time translation to
                automated action items.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="group h-full">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#90e0ef]/30 hover:border-[#48cae4]/50 h-full flex flex-col">
                    {/* Icon Section */}
                    <div className="flex justify-center mb-4">
                      <div
                        className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                    </div>

                    {/* Title Section */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg md:text-xl font-bold text-[#03045e] group-hover:text-[#0077b6] transition-colors duration-200 leading-tight">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description Section */}
                    <p className="text-[#023e8a] text-sm md:text-base leading-relaxed text-center mb-6 flex-grow">
                      {feature.description}
                    </p>

                    {/* Benefits Section */}
                    <div className="space-y-2 mt-auto">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center space-x-2 text-xs md:text-sm text-[#0077b6]"
                        >
                          <div className="w-1.5 h-1.5 bg-[#48cae4] rounded-full flex-shrink-0"></div>
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
        <div className="py-16 md:py-20 bg-gradient-to-r from-[#03045e] via-[#023e8a] to-[#0077b6]">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Meetings?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 px-4">
              Join thousands of teams already using AI to make their meetings
              more productive, inclusive, and engaging.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link to="/login" className="cursor-pointer">
                <button className="bg-white text-[#3674B5] px-8 py-4 rounded-lg font-semibold hover:bg-[#D1F8EF] transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
