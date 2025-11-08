import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AcceptInvite = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isUserAuthenticated = !!user?._id; // A simple check for authentication

  useEffect(() => {
    const acceptInvitation = async () => {
      // ⚠ Check if the user is authenticated first
      if (!isUserAuthenticated) {
        toast.error("Please log in to accept the invitation.");
        navigate(`/login?redirect=/accept-invite/${meetingId}`);
        return;
      }

      if (!user || !user.email || !user._id || !meetingId) {
        toast.error("User or meeting ID missing");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/accept-invite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              meetingId,
              email: user.email,
              userId: user._id,
            }),
            credentials: "include",
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to accept invitation");
        }
        toast.success("Invitation accepted! Joining meeting...");
        navigate(`/`);
      } catch (error) {
        toast.error(error.message);
        navigate(`/`);
      }

    };

    acceptInvitation();
  }, [meetingId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-bold">Accepting Meeting Invitation...</h1>
      <p className="mt-2 text-gray-500">
        Please wait, you will be redirected shortly.
      </p>
    </div>
  );
};

export default AcceptInvite;
