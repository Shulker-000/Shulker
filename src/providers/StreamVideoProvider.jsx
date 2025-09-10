import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import Loader from '../components/Loader.jsx';

const API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const tokenProvider = async (userId) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Authentication token is missing.');

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/meetings/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    }
  );

  if (!response.ok) throw new Error('Failed to fetch Stream token');
  const data = await response.json();
  console.log(data);
  return data.token;
};

const StreamVideoProvider = ({ children }) => {
  const [videoClient, setVideoClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const isLoggedIn = !!user;

  useEffect(() => {
    if (userLoading) {
      setLoading(true);
      return;
    }

    if (!isLoggedIn || !user || !user._id) {
      if (videoClient) {
        videoClient.disconnectUser();
        setVideoClient(null);
      }
      setLoading(false);
      return;
    }

    if (!API_KEY) {
      console.error('Stream API key is missing');
      setLoading(false);
      return;
    }

    if (!videoClient) {
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
        console.log("Client: ",client);
        setVideoClient(client);

        return () => {
          client.disconnectUser();
          setVideoClient(null);
        };
      } catch (err) {
        console.error('Error creating Stream client:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user, isLoggedIn, userLoading]);

  if (loading || !videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
