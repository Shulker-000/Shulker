// src/lib/PersonalRoomId.js
import { updateUserProfile } from "../features/authSlice";

const PersonalRoomId = async (token, dispatch, currentUser) => {
  try {
    if (currentUser?.personalRoomId) {
      console.log("User already has personal room:", currentUser.personalRoomId);
      return currentUser.personalRoomId;
    }

    const createResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const createJson = await createResponse.json();
    const meetingId = createJson?.data?.meetingId;
    if (!meetingId) throw new Error("Backend didn't return meetingId");

    const saveResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/personal-meeting-room`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ meetingId }),
      }
    );

    const saveJson = await saveResponse.json();

    console.log("✅ Personal meeting room response:", saveJson);
    const updatedUser = saveJson?.data;
    console.log("👤 Updated user returned from backend:", updatedUser);

    // 3️⃣ Update Redux (this also saves in localStorage)
    if (dispatch && updatedUser) {
      dispatch(updateUserProfile(updatedUser));
    }

    return updatedUser?.personalRoomId;
  } catch (error) {
    console.error("❌ Error creating personal room:", error);
    throw error;
  }
};

export default PersonalRoomId;
