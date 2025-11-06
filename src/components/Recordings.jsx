import { useEffect, useRef } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { toast } from "react-toastify";

const Recordings = ({ setEnableEnd }) => {
  const call = useCall();
  const { useIsCallRecordingInProgress } = useCallStateHooks();
  const isRecording = useIsCallRecordingInProgress();

  const isUploading = useRef(false);
  const previousRecordingState = useRef(false);
  const lastUploadedTime = useRef(null);

  useEffect(() => {
    if (!call) return;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      toast.error("Missing VITE_BACKEND_URL in env");
      return;
    }

    const waitForNewRecording = async () => {
      for (let i = 0; i < 12; i++) {
        const response = await call.queryRecordings();
        const recordings = response.recordings || [];

        const sorted = [...recordings].sort(
          (a, b) => new Date(b.end_time) - new Date(a.end_time)
        );
        const latest = sorted[0];
        if (!latest?.end_time) {
          await new Promise((res) => setTimeout(res, 5000));
          continue;
        }

        const latestEnd = new Date(latest.end_time).getTime();

        // Only proceed if it's newer than last uploaded
        if (!lastUploadedTime.current || latestEnd > lastUploadedTime.current) {
          return latest;
        }

        await new Promise((res) => setTimeout(res, 5000));
      }
      console.warn("⚠️ No new finalized recording found after waiting.");
      return null;
    };

    const uploadRecording = async (latest) => {
      if (!latest?.url || isUploading.current) return;
      try {
        isUploading.current = true;
        toast.info("Uploading finalized recording...", { autoClose: 1500 });

        const fileResponse = await fetch(latest.url);
        const blob = await fileResponse.blob();
        const endTimestamp = new Date(latest.end_time).getTime();
        const file = new File([blob], `${call.id}_${endTimestamp}.mp4`, {
          type: blob.type,
        });

        const formData = new FormData();
        formData.append("meetingId", call.id);
        formData.append("recording", file);

        const res = await fetch(`${backendUrl}/api/v1/meetings/add-recording`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.message || "Upload failed");

        lastUploadedTime.current = endTimestamp;
        toast.success("Recording uploaded successfully!");
      } catch (err) {
        toast.error("❌ Upload failed:", err);
      } finally {
        setEnableEnd(true);
        isUploading.current = false;
      }
    };

    const handleRecordingStopped = async () => {
      const latest = await waitForNewRecording();
      if (latest) await uploadRecording(latest);
    };

    if (!previousRecordingState.current && isRecording) {
      setEnableEnd(false);
      isUploading.current = false;
    }

    if (previousRecordingState.current && !isRecording) {
      handleRecordingStopped();
    }

    previousRecordingState.current = isRecording;
  }, [isRecording, call, setEnableEnd]);

  return null;
};

export default Recordings;
