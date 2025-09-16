import React, { useState } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { Users, LayoutList } from "lucide-react";

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

const MeetingRoom = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

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
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white text-black">
      {/* Main video layout */}
      <div className="relative flex size-full items-center justify-center pt-4">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>

        {/* Participants sidebar */}
        <div
          className={cn(
            "h-[calc(100vh-86px)] ml-2 transition-all duration-300 ease-in-out",
            {
              "w-[300px] block": showParticipants,
              "w-0 hidden": !showParticipants,
            }
          )}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      {/* Controls bar */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 border-t border-gray-300 bg-white/95 px-4 py-3 shadow-lg">
        <CallControls
          onLeave={() => navigate("/")}
          controls={[
            "microphone",
            "camera",
            "screenshare",
            "settings",
            "leave-call",
          ]}
        />

        {/* Layout switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors">
            <LayoutList size={20} className="text-gray-800" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-gray-300 bg-gray-100 text-black shadow-lg">
            {[
              { key: "grid", label: "Grid" },
              { key: "speaker-left", label: "Speaker-Left" },
              { key: "speaker-right", label: "Speaker-Right" },
            ].map((item, index) => (
              <div key={item.key}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.key)}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {item.label}
                </DropdownMenuItem>
                {index < 2 && (
                  <DropdownMenuSeparator className="border-gray-300" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Call stats */}
        <CallStatsButton />

        {/* Participants toggle */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors"
        >
          <Users size={20} className="text-gray-800" />
        </button>

        {/* End call */}
        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
