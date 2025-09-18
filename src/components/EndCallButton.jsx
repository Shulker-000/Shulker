import React from 'react';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const EndCallButton = () => {
  const call = useCall();
  const navigate = useNavigate();

  if (!call) {
    throw new Error('useStreamCall must be used within a StreamCall component.');
  }

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    navigate('/');
  };

  return (
<button
  onClick={endCall}
  className="px-6 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700transition"
>
  End call for everyone
</button>

  );
};

export default EndCallButton;
