import React, { useState } from "react";
import { useSelector } from "react-redux";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader.jsx";
import Alert from "../components/ui/Alert.jsx";
import MeetingSetup from "../components/MeetingSetup.jsx";
import MeetingRoom from "../components/MeetingRoom.jsx";
import { useGetCallById } from "../hooks/useGetCallById.jsx";

const MeetingPage = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Loading state
  if (!user || isCallLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <Loader className="animate-spin text-gray-700 w-16 h-16" />
        <p className="mt-4 text-lg font-medium text-gray-700">
          Preparing your meeting...
        </p>
      </div>
    );
  }


  // Call not found state
  if (!call) {

    console.error("Call Not Found. Debug Info:", {
      meetingId: id,
      user,
      isCallLoading,
    });

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <p className="text-3xl font-bold text-gray-800">Call Not Found</p>
        <p className="mt-2 text-gray-600">
          The meeting you are looking for does not exist or has ended.
        </p>
      </div>
    );
  }

  // Not allowed state
  const notAllowed =
    call.type === "invited" &&
    !call.state.members.find((m) => m.user.id === user.id);

  if (notAllowed) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <Alert title="Access Denied" description="You are not allowed to join this meeting." />
      </div>
    );
  }

  // Main meeting screen
  return (
    <main className="h-screen w-full bg-gray-200 flex items-center justify-center">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
