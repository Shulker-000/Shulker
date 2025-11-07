import React, { useState, useEffect, useCallback } from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  StreamTheme,
  StreamCall,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import {
  Users,
  LayoutList,
  Copy,
  Check,
  MessageCircle,
  SquarePen,
  Image as ImageIcon,
  Subtitles,
  Focus as FocusIcon,
  XCircle,
} from "lucide-react";
import { StreamChat } from "stream-chat";
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
import BackgroundFilters from "./BackgroundFilters.jsx";
import Recordings from "./Recordings.jsx";

const MeetingRoom = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const streamToken = useSelector((state) => state.auth.streamToken);

  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showBackgroundSelector, setShowBackgroundSelector] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [enableEnd, setEnableEnd] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  const { useCallCallingState, useCameraState } = useCallStateHooks();
  const call = useCall();
  const callingState = useCallCallingState();
  const cameraState = useCameraState();
  const isCameraOn = cameraState?.status === "enabled";

  const isMeetingOwner =
    call?.state?.createdBy?.id &&
    user?._id &&
    call.state.createdBy.id === user._id;

  // ✅ Email verification check
  useEffect(() => {
    if (user && !user.isEmailVerified) {
      toast.error("Please verify your email to join the meeting.");
      navigate("/profile");
    }
  }, [user, navigate]);

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  // ✅ Stream Chat setup
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
        if (client.userID) await client.disconnectUser();

        await client.connectUser(
          {
            id: user._id.toString(),
            name: user.name || user.username || user._id.toString(),
            image: user.image || user.avatar || "",
          },
          streamToken
        );

        const channelId = `meeting-room-${call.id}`;
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

  // ✅ Focus Mode logic
  const enableFocus = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      document.addEventListener("contextmenu", disableContext);
      document.addEventListener("keydown", blockKeys);
      document.addEventListener("visibilitychange", blockVisibility);
      setFocusMode(true);
      toast.info("Focus mode enabled. Enable DND Mode For Better Focus Experience.");
    } catch (err) {
      console.error("Failed to enable focus mode:", err);
      toast.error("Focus mode failed to start.");
    }
  }, []);

  const disableFocus = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      document.removeEventListener("contextmenu", disableContext);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("visibilitychange", blockVisibility);
      setFocusMode(false);
      toast.info("Focus mode disabled.");
    } catch (err) {
      console.error("Failed to disable focus mode:", err);
    }
  }, []);

  const disableContext = (e) => e.preventDefault();

  const blockKeys = (e) => {
    const blockedCombos = [
      "Alt",
      "Tab",
      "Meta",
      "Control",
      "Escape",
      "F11",
      "F5",
      "F12",
    ];
    if (blockedCombos.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const blockVisibility = (e) => {
    if (document.hidden) {
      document.title = "Focus mode active - Stay in!";
      e.preventDefault();
    }
  };

  // ✅ Leave Call
  const leaveCall = async () => {
    try {
      if (!user?._id) {
        toast.error("User ID missing. Please log in again.");
        return;
      }

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Configuration error: Missing backend URL.");
        return;
      }

      const response = await fetch(`${backendUrl}/api/v1/meetings/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId: call.id, userId: user._id }),
        credentials: "include",
      });

      if (response.status === 403) {
        toast.error("You are the host. End the meeting to leave!");
        return;
      }

      const data = await response.json();
      if (data && !call.state?.hasLeft) {
        await call.leave();}
    } catch (err) {
      console.error("Error ending call:", err);
    } finally {
      await disableFocus();
      navigate("/");
    }
  };

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <SpeakerLayout participantsBarPosition="right" />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "speaker-right":
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const copyLink = () => {
    if (call) {
      const meetingLink = `${window.location.origin}/meetings/${call.id}`;
      navigator.clipboard.writeText(meetingLink);
      toast.success("Meeting link copied!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      <StreamTheme as="main" mode="light" className="h-full w-full">
        <StreamCall call={call}>
          <BackgroundFilters showSelector={showBackgroundSelector}>
            <div className="flex w-full h-[calc(100vh-64px)] justify-center items-center relative">
              <div className="flex w-[100vw] items-center justify-center max-w-[1000px]">
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
              />
            </div>

            {/* Bottom Controls */}
            <div className="fixed bottom-0 left-0 w-full flex items-center justify-center gap-4 py-4 px-6 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200">
              <div className="flex flex-1 justify-center">
                <div
                  className={user._id === call.state.createdBy.id ? "host" : ""}
                >
                  <CallControls onLeave={leaveCall} />
                  <Recordings setEnableEnd={setEnableEnd} />
                </div>
              </div>

              {/* Focus Mode */}
              <button
                onClick={() => (focusMode ? disableFocus() : enableFocus())}
                className={cn(
                  "rounded-full p-3 transition-colors",
                  focusMode
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                )}
                title={
                  focusMode ? "Disable Focus Mode" : "Enable Focus Mode (Lock)"
                }
              >
                {focusMode ? <XCircle size={20} /> : <FocusIcon size={20} />}
              </button>

              {/* Background Filter, Participants, Chat, etc. */}
              {isCameraOn && (
                <button
                  onClick={() => setShowBackgroundSelector((prev) => !prev)}
                  className={cn(
                    "rounded-full p-3 transition-colors",
                    showBackgroundSelector
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  )}
                  title="Change Background Effects"
                >
                  <ImageIcon size={20} />
                </button>
              )}

              <button
                onClick={() => {
                  setShowParticipants((prev) => !prev);
                  if (!showParticipants) setShowChat(false);
                }}
                className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
                title="Participants"
              >
                <Users size={20} className="text-gray-800" />
              </button>

              <button
                onClick={() => {
                  setShowChat((prev) => !prev);
                  if (!showChat) setShowParticipants(false);
                }}
                className="rounded-full bg-gray-200 p-3 hover:bg-gray-300 transition-colors"
                title="Chat"
              >
                <MessageCircle size={20} className="text-gray-800" />
              </button>

              <button
                onClick={copyLink}
                className="rounded-full bg-blue-600 p-3 hover:bg-blue-700 transition-colors text-white"
                title="Copy Meeting Link"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>

              <CallStatsButton />
              <EndCallButton
                meetingId={call.id}
                disabledEndButton={enableEnd}
                disableFocus={disableFocus}
              />
            </div>
          </BackgroundFilters>
        </StreamCall>
      </StreamTheme>
    </section>
  );
};

export default MeetingRoom;
