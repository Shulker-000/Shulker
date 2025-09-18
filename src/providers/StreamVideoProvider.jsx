import React, { useEffect, useState, createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import Loader from "../components/Loader.jsx";

const API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const StreamContext = createContext(null);
export const useStreamClient = () => useContext(StreamContext);

const tokenProvider = async (userId) => {
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

  if (!response.ok) throw new Error("Failed to fetch Stream token");
  const data = await response.json();
  return data.token;
};

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useSelector((state) => state.auth);
  const isLoggedIn = !!user && !!token;

  useEffect(() => {
    if (!isLoggedIn || !user?._id) {
      if (videoClient) {
        videoClient.disconnectUser();
        setVideoClient(null);
      }
      setLoading(false);
      return;
    }

    if (!API_KEY) {
      console.error("Stream API key is missing");
      setLoading(false);
      return;
    }

    const createClient = async () => {
      try {
        const client = StreamVideoClient.getOrCreateInstance({
          apiKey: API_KEY,
          user: {
            id: user._id,
            name: user.username || user.firstname || user._id,
            image: user.avatar,
          },
          tokenProvider: () => tokenProvider(user._id),
        });
        setVideoClient(client);
      } catch (err) {
        console.error("Error creating Stream client:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!videoClient) {
      createClient();
    }
  }, [user, token, isLoggedIn]);

  if (loading || !videoClient) return <Loader />;

  return (
    <StreamContext.Provider value={videoClient}>
      <StreamVideo client={videoClient}>{children}</StreamVideo>
    </StreamContext.Provider>
  );
};

export default StreamVideoProvider;
