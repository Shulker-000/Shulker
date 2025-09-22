import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EndCallButton = ({ meetingId }) => {
  const call = useCall();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component.");
  }

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      await fetch(`${backendUrl}/api/v1/meetings/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingId,
          userId: user._id,
        }),
        credentials: "include",
      });

    } catch (err) {
      console.error("Error ending call:", err);
    } finally {
      navigate("/"); 
    }
  };

  return (
    <button
      onClick={endCall}
      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 
                 bg-red-600 text-white text-sm sm:text-base 
                 font-medium rounded-full 
                 hover:bg-red-700 transition duration-200"
    >
      End call for everyone
    </button>
  );
};

export default EndCallButton;
