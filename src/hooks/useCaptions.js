// src/hooks/useCaptions.js
import { useEffect, useState, useRef } from "react";

export function useCaptions(call, isCaptionsOn) {
  const [captionText, setCaptionText] = useState("");
  const [processing, setProcessing] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const intervalRef = useRef(null);

  // 🔧 Convert webm → wav (16kHz mono)
  async function webmToWav(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const audioCtx = new AudioContext({ sampleRate: 16000 });
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const samples = audioBuffer.getChannelData(0);
    const wavBuffer = encodeWav(samples, 16000);
    return new Blob([wavBuffer], { type: "audio/wav" });
  }

  function encodeWav(samples, sampleRate) {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    function writeString(view, offset, str) {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    }

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, 1, true); // mono
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true); // byte rate
    view.setUint16(32, 2, true); // block align
    view.setUint16(34, 16, true); // bits/sample
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    let offset = 44;
    for (let i = 0; i < samples.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, samples[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  }

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_AI_URL;
    if (!backendUrl || !call) return;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        recorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        recorder.onstop = async () => {
          const webmBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          chunksRef.current = [];
          setProcessing(true);

          try {
            // 🎧 Convert to proper WAV before sending
            const wavBlob = await webmToWav(webmBlob);

            const formData = new FormData();
            formData.append("file", wavBlob, `${call.id}_chunk.wav`);

            const res = await fetch(`${backendUrl}/recognize`, {
              method: "POST",
              body: formData,
            });

            let data;
            try {
              data = await res.json();
            } catch {
              const text = await res.text();
              console.error("Non-JSON response:", text);
              return;
            }

            // 🧠 Log output + current meeting ID
            console.log("🎙️ Caption result:", {
              meetingId: call.id,
              response: data,
            });

            if (data?.final?.english) {
              setCaptionText(data.final.english);
            }
          } catch (err) {
            console.error("Caption error:", err);
          } finally {
            setProcessing(false);
          }
        };

        // record short chunks continuously
        // record short chunks continuously
        recorder.start();
        intervalRef.current = setInterval(() => {
          if (recorder.state === "recording") {
            recorder.stop();

            // 🧩 Add slight delay before restarting next chunk
            setTimeout(() => {
              if (recorder && recorder.state === "inactive") {
                recorder.start();
              }
            }, 500); // 0.5s delay avoids corrupted chunks
          }
        }, 7000);

      } catch (err) {
        console.error("Failed to start captions:", err);
      }
    };

    const stopRecording = () => {
      clearInterval(intervalRef.current);
      if (recorderRef.current) {
        if (recorderRef.current.state !== "inactive") recorderRef.current.stop();
        recorderRef.current.stream.getTracks().forEach((t) => t.stop());
        recorderRef.current = null;
      }
      setCaptionText("");
    };

    if (isCaptionsOn) startRecording();
    else stopRecording();

    return () => stopRecording();
  }, [isCaptionsOn, call]);

  return { captionText, processing };
}
