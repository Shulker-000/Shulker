import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
  StreamTheme,
} from "@stream-io/video-react-sdk";
import Alert from "./ui/Alert";
import { Button } from "./ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Copy,
  Check,
  Settings,
} from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MeetingSetup = ({ setIsSetupComplete }) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const user = useSelector((state) => state.auth.user);

  const call = useCall();
  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [copied, setCopied] = useState(false);

  // Mic toggle effect
  useEffect(() => {
    if (call?.microphone) {
      isMicOn ? call.microphone.enable() : call.microphone.disable();
    }
  }, [isMicOn, call?.microphone]);

  // Camera toggle effect
  useEffect(() => {
    if (call?.camera) {
      isCameraOn ? call.camera.enable() : call.camera.disable();
    }
  }, [isCameraOn, call?.camera]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert title="The call has been ended by the host" iconUrl="/logo.png" />
    );

  // Function to join the meeting
  const joinCall = async ({ id }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: user._id, meetingId: id }),
        }
      );
      return response;
    } catch (err) {
      console.error("Error joining meeting:", err);
      toast.error("Network error while joining the meeting");
      return { ok: false };
    }
  };

  // Copy meeting ID
  const copyMeetingId = () => {
    navigator.clipboard.writeText(call.id);
    setCopied(true);
    toast.success("Meeting ID copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <StreamTheme as="main" mode="light" className="h-full w-full">
      <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center bg-gray-50 px-4 lg:px-10 gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center justify-center w-full lg:w-[60%] max-w-[900px] p-4 lg:p-6 gap-6">
          {/* Video Preview */}
          <div
            className="w-[500px] h-[375px] rounded-xl border border-gray-200 shadow-md overflow-hidden flex items-center justify-center bg-black"
            onContextMenu={(e) => e.preventDefault()}
          >
            {isCameraOn ? (
              <VideoPreview className="w-full h-full object-contain pointer-events-none" />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                <VideoOff size={48} className="text-gray-400 mb-3" />
                <span className="text-gray-600 text-xl font-medium">
                  Camera Off
                </span>
                <p className="text-gray-500 text-sm mt-1">
                  Turn on your camera to see yourself
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsMicOn((prev) => !prev)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow font-semibold border
                ${
                  isMicOn
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                }`}
            >
              {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
              {isMicOn ? "Mic On" : "Mic Off"}
            </button>

            <button
              onClick={() => setIsCameraOn((prev) => !prev)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow font-semibold border
                ${
                  isCameraOn
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                }`}
            >
              {isCameraOn ? <Video size={16} /> : <VideoOff size={16} />}
              {isCameraOn ? "Camera On" : "Camera Off"}
            </button>
          </div>

          {/* Join Button */}
          <Button
            className="w-full max-w-xs rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3 shadow-md"
            onClick={async () => {
              const response = await joinCall({ id: call.id });
              if (response?.ok) {
                await call.join();
                setIsSetupComplete(true);
              } else {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.message || "Failed to join the meeting");
              }
            }}
          >
            Join Meeting
          </Button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center w-full lg:w-[40%] max-w-[600px] mt-6 lg:mt-0 lg:ml-8 gap-6">
          {/* Meeting Details */}
          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Meeting Details</h2>
            <p className="text-sm text-gray-600">Share this meeting ID</p>
            <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg border">
              <span className="font-mono text-gray-800 text-sm truncate flex-1">
                {call.id}
              </span>
              <button
                onClick={copyMeetingId}
                className="p-2 rounded bg-white border hover:bg-gray-100"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Device Settings */}
          <div className="w-full bg-white rounded-xl border border-gray-200 shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Settings size={18} /> Device Settings
            </h3>
            <StreamTheme mode="light">
              <div className="device-settings-wrapper space-y-3">
                <DeviceSettings />
              </div>
            </StreamTheme>
          </div>
        </div>
      </div>
    </StreamTheme>
  );
};

export default MeetingSetup;
