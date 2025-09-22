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

    if (!user || isCallLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
                <Loader className="animate-spin text-gray-700 w-16 h-16" />
                <p className="mt-4 text-lg font-medium">
                    Preparing your meeting...
                </p>
            </div>
        );
    }

    if (!call) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800">
                <p className="text-3xl font-bold">Call Not Found</p>
                <p className="mt-2 text-gray-600">
                    The meeting you are looking for does not exist or has ended.
                </p>
            </div>
        );
    }

    const isUserNotAllowed =
        call.type === "invited" &&
        (!user || !call.state.members.find((m) => m.user.id === user.id));

    if (isUserNotAllowed) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Alert title="Access Denied" description="You are not allowed to join this meeting." />
            </div>
        );
    }

    return (
        <main className="h-screen w-full bg-gray-50 flex items-center justify-center">
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
