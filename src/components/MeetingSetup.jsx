import React, { useEffect, useState } from "react";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import Alert from "./ui/Alert";
import { Button } from "./ui/button";
import { Mic, MicOff, Video, VideoOff, Copy, Check } from "lucide-react";

const MeetingSetup = ({ setIsSetupComplete }) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();
  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    isMicOn ? call.microphone.enable() : call.microphone.disable();
  }, [isMicOn, call.microphone]);

  useEffect(() => {
    isCameraOn ? call.camera.enable() : call.camera.disable();
  }, [isCameraOn, call.camera]);

  if (callTimeNotArrived)
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );

  if (callHasEnded)
    return (
      <Alert title="The call has been ended by the host" iconUrl="/logo.png" />
    );

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Left: Video Preview + Controls */}
      <div className="flex flex-col items-center justify-between w-full lg:w-2/3 p-6 lg:p-8">
        <div className="w-full flex flex-col items-center gap-8 flex-1 max-w-5xl">


          {/* Video area */}
          <div className="w-[90%] h-[90%] aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white relative">
            {isCameraOn ? (
              <VideoPreview className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <VideoOff size={48} className="text-slate-400 mb-3" />
                <span className="text-slate-600 text-xl font-medium">Camera Off</span>
                <p className="text-slate-500 text-sm mt-1">Turn on your camera to see yourself</p>
              </div>
            )}

            {/* Enhanced mic indicator */}
            <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg border border-white/20">
              {isMicOn ? (
                <>
                  <span className="relative">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full relative"></span>
                  </span>
                  <Mic size={18} className="text-green-600" />
                  <span className="text-sm font-medium text-slate-700">Microphone On</span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <MicOff size={18} className="text-red-600" />
                  <span className="text-sm font-medium text-slate-700">Microphone Off</span>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsMicOn((prev) => !prev)}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm border-2 hover:scale-105 active:scale-95
                ${
                  isMicOn
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                }`}
            >
              {isMicOn ? <Mic size={16} /> : <MicOff size={16} />}
              {isMicOn ? "Microphone On" : "Microphone Off"}
            </button>

            <button
              onClick={() => setIsCameraOn((prev) => !prev)}
              className={`flex items-center gap-3 px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 font-semibold text-sm border-2 hover:scale-105 active:scale-95
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
        </div>

        {/* Join Button */}
        <div className="w-full flex justify-center mt-8 max-w-md">
          <Button
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-12 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border-0"
            onClick={() => {
              call.join();
              setIsSetupComplete(true);
            }}
          >
            Join Meeting
          </Button>
        </div>
      </div>

      {/* Right: Meeting Info */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 shadow-inner overflow-y-auto">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Meeting Details
            </h2>
            <p className="text-slate-600 text-sm">
              Share the meeting ID to invite others
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg w-full shadow-sm border border-slate-200">
              <div className="flex-1 min-w-0">
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                  Meeting ID
                </label>
                <span className="font-mono text-slate-800 text-sm block truncate">
                  {call.id}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(call.id);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex-shrink-0 p-2 rounded-lg bg-white hover:bg-slate-100 transition-colors border border-slate-200"
                title="Copy meeting ID"
              >
                {copied ? (
                  <Check size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-slate-600" />
                )}
              </button>
            </div>

            {copied && (
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium text-sm bg-green-50 py-2 px-4 rounded-lg border border-green-200">
                <Check size={14} />
                Meeting ID copied!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;