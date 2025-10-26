import React from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EndCallButton = ({ meetingId }) => {
  const call = useCall();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant?.userId &&
    call.state?.createdBy?.id &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    let response;
    try {
      // Check if user ID is available
      if (!user?._id) {
        console.error("User ID missing, cannot end call");
        toast.error("User authentication error. Please re-login.");
        return;
      }

      // Ensure backend URL is defined
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        console.error("VITE_BACKEND_URL is missing");
        toast.error("Configuration error: Missing backend URL.");
        return;
      }

      // Send end-meeting request to backend
      response = await fetch(`${backendUrl}/api/v1/meetings/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId, userId: user._id }),
        credentials: "include",
      });

      // Handle backend response errors properly
      if (!response.ok) {
        let errorMessage = "Failed to end meeting due to an unknown error.";

        try {
          // Try parsing backend error message if available
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Fallback if backend sends plain text or no JSON body
          errorMessage = `Server error: Status ${response.status}`;
        }
        console.error("Backend Error:", errorMessage);
        toast.error(errorMessage);
        return; // Stop further execution if backend failed
      }

      // If backend succeeded, end the call via Stream API
      await call.endCall();
      toast.success("Meeting ended successfully for everyone.");
    } catch (err) {
      // Catch network-level or unexpected runtime errors
      console.error("Error ending call:", err);
      toast.error(`Network error: ${err.message}`);
    } finally {
      // Only navigate if backend confirmed success
      if (response?.ok) {
        navigate("/");
      }
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
