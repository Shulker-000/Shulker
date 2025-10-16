import React, { useState, useEffect } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  // PaginatedGridLayout, // Not used in final render
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
import { StreamChat } from "stream-chat"; // Keep StreamChat for client initialization
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu.jsx";
import MeetingChat from "./MeetingChat.jsx";
import Loader from "./Loader.jsx";
import EndCallButton from "./EndCallButton.jsx";
import { cn } from "../lib/utils";
import "../index.css";
import { useSelector } from "react-redux";

const MeetingRoom = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const streamToken = useSelector((state) => state.auth.streamToken);

  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copied, setCopied] = useState(false);

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const {
    useCallCallingState,
  } = useCallStateHooks();

  const call = useCall();

  useEffect(() => {
    if (user && !user.isEmailVerified) {
      toast.error("Please verify your email to join the meeting.");
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component.");
  }

  useEffect(() => {
    if (!user || !call || !streamToken) return;

    const apiKey = import.meta.env.VITE_STREAM_API_KEY;
    if (!apiKey) {
      console.error("Stream API Key not found.");
      return;
    }

    const client = new StreamChat(apiKey);
    let isMounted = true;

    async function setupChat() {
      try {

        if (client.userID) {
          await client.disconnectUser();
        }

        const userIdString = user._id.toString();

        await client.connectUser(
          {
            id: userIdString,
            name: user.name || user.username || userIdString,
            image: user.image || user.avatar || "", // Use user.avatar if available from redux/backend
          },
          streamToken
        );

        const channelId = "meeting-room-" + call.id;
        const meetingChannel = client.channel("messaging", channelId, {
          name: "Meeting Room Chat",
        });
        await meetingChannel.watch(); 

        if (isMounted) {
          setChannel(meetingChannel);
          setChatClient(client);
        }
      } catch (error) {
        console.error("Failed to connect to Stream Chat", error);
        toast.error("Failed to connect to chat. Please refresh.");
      }
    }

    setupChat();

    return () => {
      isMounted = false;
      if (client) {
        client.disconnectUser().catch(() => { });
      }
      setChatClient(null);
      setChannel(null);
    };
  }, [user, call, streamToken, navigate]);

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <SpeakerLayout participantsBarPosition="right" />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };

  const copyLink = () => {
    if (call) {
      // Assuming the link to join the meeting uses the call.id
      const meetingLink = `${window.location.origin}/meeting/${call.id}`; 
      navigator.clipboard.writeText(meetingLink);
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
        toast.error("You are the host. End the meeting to leave!");
        return;
      }

      const data = await response.json();

      if (data) {
        if (!call.state?.hasLeft) {
          await call.leave();
        }
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
          <div className="flex w-[100vw] size-full items-center justify-center max-w-[1000px] transition-all duration-300">
            <CallLayout />
          </div>

          {/* Participants Sidebar */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-20 w-80 bg-white/95 backdrop-blur-md shadow-lg border-l border-gray-200 transform transition-transform duration-300",
              showParticipants ? "translate-x-0" : "translate-x-full"
            )}
          >
            <div className="h-full p-4">
              <CallParticipantsList
                onClose={() => setShowParticipants(false)}
              />
            </div>
          </div>

          {/* Chat Sidebar */}
          <MeetingChat
            chatClient={chatClient}
            channel={channel}
            showChat={showChat}
            setShowChat={setShowChat}
            // Removed: user prop - no longer needed in MeetingChat component
          />
        </div>

        {/* Bottom Controls */}
        <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 py-4 px-6 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
          <div className="flex flex-1 justify-center">
            <div className={user._id === call.state.createdBy.id ? "host" : ""}>
              <CallControls
                onLeave={leaveCall}
                controls={["microphone", "camera", "leave-call"]}
              />
            </div>
          </div>

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

            {/* Layout Menu */}
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
                if (!showParticipants) setShowChat(false); // close chat if opening participants
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
                if (!showChat) setShowParticipants(false); // close participants if opening chat
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
