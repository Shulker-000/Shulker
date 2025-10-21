import React, { useEffect, useState, createContext, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import Loader from "../components/Loader.jsx";
import { setStreamToken } from "../features/authSlice.js";

const API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const StreamContext = createContext(null);
export const useStreamClient = () => useContext(StreamContext);

const tokenProvider = async (userId, dispatch) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Authentication token is missing.");

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  // ✅ FIX: Parse JSON only once
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      data.message || `Server Error: Status ${response.status}`;
    throw new Error(errorMessage);
  }

  if (data?.data?.token) {
    dispatch(setStreamToken(data.data.token));
    return data.data.token;
  }

  throw new Error("Stream token not received in backend response.");
};

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!user && !!token;

  useEffect(() => {
    let client;

    const createClient = async () => {
      try {
        if (!API_KEY) {
          console.error("Stream API key is missing");
          setLoading(false);
          return;
        }

        client = StreamVideoClient.getOrCreateInstance({
          apiKey: API_KEY,
          user: {
            id: user._id,
            name: user.username || user.firstname || user._id,
            image: user.avatar,
          },
          tokenProvider: () => tokenProvider(user._id, dispatch),
        });
        setVideoClient(client);
      } catch (err) {
        console.error("Error creating Stream client:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn && user?._id) {
      createClient();
    } else if (videoClient) {
      videoClient.disconnectUser();
      setVideoClient(null);
      setLoading(false);
    }

    // ✅ FIX: Cleanup on unmount or re-render
    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [user, token, isLoggedIn, dispatch]);

  if (loading || !videoClient) return <Loader />;

  return (
    <StreamContext.Provider value={videoClient}>
      <StreamVideo client={videoClient}>{children}</StreamVideo>
    </StreamContext.Provider>
  );
};

export default StreamVideoProvider;
