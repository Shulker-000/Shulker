import React, { useState, useEffect } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import {
  Users,
  LayoutList,
  Copy,
  Check,
  MessageCircle,
  SquarePen,
} from "lucide-react";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { toast } from "react-toastify";
import "../custom-stream.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu.jsx";
import Loader from "./Loader.jsx";
import EndCallButton from "./EndCallButton.jsx";
import { cn } from "../lib/utils";
import "../index.css";
import { useSelector } from "react-redux";

const MeetingRoom = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copied, setCopied] = useState(false);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const {
    useCallCallingState,
    useCallClosedCaptions,
    useIsCallCaptioningInProgress,
  } = useCallStateHooks();

  const call = useCall();

  useEffect(() => {
    if (user && !user.isEmailVerified) {
      navigate("/profile");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user || !call) return;

    const apiKey = import.meta.env.VITE_STREAM_CHAT_API_KEY;
    const userToken = user.token; // Make sure your backend generates this securely

    const client = new StreamChat(apiKey);

    async function setupChat() {
      try {
        await client.connectUser(
          {
            id: user._id,
            name: user.name,
            image: user.image,
          },
          userToken
        );

        const channelId = "meeting-room-" + call.id;

        // Create or get existing messaging channel for this meeting
        const meetingChannel = client.channel("messaging", channelId, {
          name: "Meeting Room Chat",
          members: [user._id], // Add all participants on your backend ideally
        });

        await meetingChannel.watch();

        setChannel(meetingChannel);
        setChatClient(client);
      } catch (error) {
        console.error("Failed to connect to Stream Chat", error);
      }
    }

    setupChat();

    return () => {
      client.disconnectUser().catch(() => {});
      setChannel(null);
      setChatClient(null);
    };
  }, [user, call]);

  const callingState = useCallCallingState();
  const closedCaptions = useCallClosedCaptions();
  const isCaptioningInProgress = useIsCallCaptioningInProgress();

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component.");
  }

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="grid" />;
    }
  };

  const copyLink = () => {
    if (call) {
      const meetingId = call.id;
      navigator.clipboard.writeText(meetingId);
      toast.success("Meeting link copied!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const leaveCall = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/v1/meetings/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingId: call.id,
          userId: user._id,
        }),
        credentials: "include",
      });

      if (response.status === 403) {
        toast.error("You are host. End meeting to leave !!");
        return;
      }

      const data = await response.json();

      if (data) {
        try {
          if (!call.state?.hasLeft) {
            await call.leave();
          }
        } catch (err) {
          console.warn("Leave call error:", err);
        }
      }

      // Clean up chat client on leave
      if (chatClient) {
        chatClient.disconnectUser().catch(() => {});
        setChatClient(null);
        setChannel(null);
      }
    } catch (err) {
      console.error("Error ending call:", err);
    } finally {
      navigate("/");
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      <StreamTheme as="main" mode="light" className="h-full w-full">
        <div className="flex w-full h-[calc(100vh-64px)] justify-center items-center">
          {/* Video Layout */}
          <div
            className="flex size-full items-center justify-center max-w-[1000px] transition-all duration-300"
            style={{
              width:
                showChat || showParticipants
                  ? "calc(100vw - 320px)"
                  : "100vw",
            }}
          >
            <CallLayout />
          </div>

          {/* Participants Sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 right-80 z-20 w-80 bg-white/95 backdrop-blur-md shadow-lg border-l border-gray-200 transform transition-transform duration-300",
              showParticipants ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="h-full p-4 overflow-y-auto">
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          </div>

          {/* Chat Sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-20 w-80 bg-white/95 backdrop-blur-md shadow-lg border-l border-gray-200 transform transition-transform duration-300",
              showChat ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="h-full flex flex-col p-4">
              {chatClient && channel ? (
                <Chat client={chatClient} theme="messaging light">
                  <Channel channel={channel}>
                    <MessageList />
                    <MessageInput />
                  </Channel>
                </Chat>
              ) : (
                <Loader />
              )}
            </div>
          </div>
        </div>

        {/* Closed Captions Overlay */}
        {isCaptioningInProgress && closedCaptions.length > 0 && (
          <div className="absolute bottom-[50vh] left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm max-w-[80%] text-center">
            {closedCaptions.map(({ user, text, start_time }) => (
              <p key={`${user.id}-${start_time}`} className="caption-line">
                <span className="font-semibold">{user?.name || user?.id}:</span>{" "}
                {text}
              </p>
            ))}
          </div>
        )}

        {/* Controls Bar */}
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 py-4 px-6 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
          {/* Core Controls */}
          <div className="flex flex-1 justify-center">
            <div className={user._id === call.state.createdBy.id ? "host" : ""}>
              <CallControls
                onLeave={leaveCall}
                controls={["microphone", "camera", "leave-call"]}
              />
            </div>
          </div>

          {/* Secondary Controls */}
          <div className="flex items-center gap-4">
            {/* Whiteboard */}
            <a
              href="/whiteboard"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-blue-600 p-3 hover:bg-blue-700 transition-colors text-white flex items-center justify-center"
              title="Open Whiteboard"
            >
              <SquarePen size={20} />
            </a>

            {/* Layout Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors">
                <LayoutList size={20} className="text-gray-800" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-300 bg-gray-100 text-gray-900 shadow-lg">
                {[
                  { key: "grid", label: "Grid" },
                  { key: "speaker-left", label: "Speaker Left" },
                  { key: "speaker-right", label: "Speaker Right" },
                ].map((item, index) => (
                  <div key={item.key}>
                    <DropdownMenuItem
                      onClick={() => setLayout(item.key)}
                      className="flex cursor-pointer items-center justify-between hover:bg-gray-200"
                    >
                      <span>{item.label}</span>
                      {layout === item.key && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </DropdownMenuItem>
                    {index < 2 && (
                      <DropdownMenuSeparator className="border-gray-300" />
                    )}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Participants Toggle */}
            <button
              onClick={() => {
                setShowParticipants((prev) => !prev);
                setShowChat(false);
              }}
              className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
              title="Participants"
            >
              <Users size={20} className="text-gray-800" />
            </button>

            {/* Chat Toggle */}
            <button
              onClick={() => {
                setShowChat((prev) => !prev);
                setShowParticipants(false);
              }}
              className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
              title="Chat"
            >
              <MessageCircle size={20} className="text-gray-800" />
            </button>

            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="rounded-full bg-blue-600 p-3 hover:bg-blue-700 transition-colors text-white"
              title="Copy Meeting Link"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>

            <CallStatsButton />
            <EndCallButton meetingId={call.id} />
          </div>
        </div>
      </StreamTheme>
    </section>
  );
};

export default MeetingRoom;
