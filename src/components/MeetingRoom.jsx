import React, { useState } from "react";
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
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  LayoutList,
  Copy,
  Check,
  MessageCircle,
  SquarePen,
  CaptionsIcon,
} from "lucide-react";

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
import "../custom-stream.css";

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    useCallCallingState,
    useCallClosedCaptions,
    useIsCallCaptioningInProgress,
  } = useCallStateHooks();

  const call = useCall();

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component.");
  }

  const callingState = useCallCallingState();
  const closedCaptions = useCallClosedCaptions();
  const isCaptioningInProgress = useIsCallCaptioningInProgress();

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
      const meetingId = call.id; // Stream's call ID
      navigator.clipboard.writeText(meetingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCaptions = async () => {
    try {
      if (isCaptioningInProgress) {
        await call.stopClosedCaptions();
      } else {
        await call.startClosedCaptions({ language: "en" });
      }
    } catch (error) {
      console.error("Failed to toggle captions:", error);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-50 text-gray-900">
      <StreamTheme as="main" mode="light" className="h-full w-full">
        <div className="flex w-full h-[calc(100vh-64px)] justify-center items-center">
          {/* Video Layout */}
          <div className="flex size-full w-[100vw] items-center justify-center max-w-[1000px] transition-all duration-300">
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
              {call.channel && (
                <Chat client={call.client}>
                  <Channel channel={call.channel}>
                    <MessageList />
                    <MessageInput />
                  </Channel>
                </Chat>
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
            <CallControls
              onLeave={() => navigate("/")}
              controls={["microphone", "camera", "leave-call"]}
            />
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

            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="rounded-full bg-blue-600 p-3 hover:bg-blue-700 transition-colors text-white"
              title="Copy Meeting Link"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>

            <CallStatsButton />
            <EndCallButton />
          </div>
        </div>
      </StreamTheme>
    </section>
  );
};

export default MeetingRoom;