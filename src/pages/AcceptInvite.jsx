import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "./../components/ui/use-toast";

const AcceptInvite = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useSelector((state) => state.auth.user);
  const isUserAuthenticated = !!user?.token; // A simple check for authentication

  useEffect(() => {
    const acceptInvitation = async () => {
      // ⚠ Check if the user is authenticated first
      if (!isUserAuthenticated) {
        toast({ title: "Please log in to accept the invitation." });
        navigate(`/login?redirect=/accept-invite/${meetingId}`);
        return;
      }

      if (!user || !user.email || !user._id || !meetingId) {
        toast({ title: "User or meeting ID missing" });
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/accept-invite`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: Bearer`${token}`,
            },
            body: JSON.stringify({
              meetingId,
              email: user.email,
              userId: user._id,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({})); // Use the safe data to extract the message
          throw new Error(
            errorData.message || `Server Error: Status ${response.status}`
          );
        }

        toast({ title: "Invitation accepted! Joining meeting..." });
        navigate(`/meetings/${meetingId}`);
      } catch (error) {
        console.error("Error accepting invitation:", error);
        toast({
          title: "Failed to accept invitation",
          description: error.message,
        });
      }
    };

    acceptInvitation();
  }, [meetingId, user, navigate, toast, isUserAuthenticated]);

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
