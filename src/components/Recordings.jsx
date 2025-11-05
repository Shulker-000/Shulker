import { useEffect, useRef } from "react";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { toast } from "react-toastify";

const Recordings = () => {
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
      console.error("❌ Missing VITE_BACKEND_URL in env");
      return;
    }

    const waitForNewRecording = async () => {
      for (let i = 0; i < 12; i++) {
        // up to ~60s
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
          console.log("🆕 New finalized recording found:", latest);
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
        console.log("✅ Uploaded recording:", data);
      } catch (err) {
        console.error("❌ Upload failed:", err);
        toast.error("Failed to upload recording");
      } finally {
        isUploading.current = false;
      }
    };

    const handleRecordingStopped = async () => {
      console.log("🎬 Recording stopped → waiting for finalized file...");
      const latest = await waitForNewRecording();
      if (latest) await uploadRecording(latest);
    };

    if (!previousRecordingState.current && isRecording) {
      console.log("🔴 Recording started → reset state");
      isUploading.current = false;
    }

    if (previousRecordingState.current && !isRecording) {
      handleRecordingStopped();
    }

    previousRecordingState.current = isRecording;
  }, [isRecording, call]);

  return null;
};

export default Recordings;
