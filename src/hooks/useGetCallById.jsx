import { useEffect, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useSelector } from "react-redux";

export const useGetCallById = (id) => {
  const [call, setCall] = useState(null);
  const [isCallLoading, setIsCallLoading] = useState(true);
  const [error, setError] = useState(null);

  const client = useStreamVideoClient();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!client || !id || !user) {
      setIsCallLoading(false);
      return;
    }

    let isMounted = true;

    const loadCall = async () => {
      setIsCallLoading(true);
      setError(null);

      try {
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (isMounted) {
          setCall(calls.length > 0 ? calls[0] : null);
        }
      } catch (err) {
        console.error("Error fetching call:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsCallLoading(false);
      }
    };

    loadCall();

    return () => {
      isMounted = false;
    };
  }, [client, id, user]);

  return { call, isCallLoading, error };
};
