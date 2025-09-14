import React, { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, LayoutList } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/DropdownMenu.jsx';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '../lib/utils';
import { useGetCallById } from '../hooks/useGetCallById.jsx';

const MeetingRoom = () => {
  const { id } = useParams();
  const { useCallCallingState } = useCallStateHooks();
  const navigate = useNavigate();
  const { call, isCallLoading } = useGetCallById(id);
  const [layout, setLayout] = useState('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);

  const callingState = useCallCallingState();

  if (isCallLoading || callingState !== CallingState.JOINED) {
    return <Loader />;
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900 text-white">
      {/* Video & Participants Section */}
      <div className="relative flex h-[calc(100vh-96px)] w-full items-center justify-center px-2">
        {/* Call Layout */}
        <div className="flex size-full rounded-xl bg-gray-800/30 shadow-lg overflow-hidden">
          <CallLayout />
        </div>

        {/* Participants Sidebar */}
        <div
          className={cn(
            'absolute right-0 top-0 h-full bg-gray-800/95 shadow-xl transition-all duration-300 ease-in-out',
            showParticipants ? 'w-80 opacity-100' : 'w-0 opacity-0'
          )}
        >
          {showParticipants && (
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-4 border-t border-gray-700 bg-gray-900/95 px-4 py-3 shadow-lg">
        {/* Full Call Controls */}
        <CallControls
          onLeave={() => navigate(`/`)}
          micButton
          cameraButton
          screenShareButton
          settingsButton
        />

        {/* Layout Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full bg-gray-700 p-2 hover:bg-gray-600 transition-colors">
            <LayoutList size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border border-gray-700 bg-gray-800 text-white shadow-lg">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase())}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  {item}
                </DropdownMenuItem>
                {index < 2 && (
                  <DropdownMenuSeparator className="border-gray-700" />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Call Stats */}
        <CallStatsButton />

        {/* Participants Toggle */}
        <button
          onClick={() => setShowParticipants((prev) => !prev)}
          className="rounded-full bg-gray-700 p-2 hover:bg-gray-600 transition-colors"
        >
          <Users size={20} />
        </button>

        {/* End Call */}
        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
