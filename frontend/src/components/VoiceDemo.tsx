"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mic, Volume2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { GlowingOrb } from "./GlowingOrb";

const STT_API_URL = "http://127.0.0.1:8787/sst";

export function VoiceDemo() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0); // 0–1 loudness
  const [userTranscript, setUserTranscript] = useState(""); // what user said
  const [aiResponse, setAiResponse] = useState(""); // AI answer (backend)

  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const rafRef = useRef<number | null>(null);

  // ---------- START MIC + WAVEFORM + RECORDING ----------
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // --- MediaRecorder: collects raw audio for backend ---
      const mediaRecorder = new MediaRecorder(stream);
      recorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          const res = await fetch(STT_API_URL, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            console.error("STT request failed:", res.status, res.statusText);
            setUserTranscript("Server error while processing audio.");
            return;
          }

          const data = await res.json();
          console.log("STT response:", data);

          const transcript =
            (data as any).transcript ??
            (data as any).text ??
            (data as any).result ??
            "";

          if (transcript) {
            setUserTranscript(transcript);
          } else {
            setUserTranscript("Got a response, but no transcript field.");
          }

          if ((data as any).answer) {
            setAiResponse((data as any).answer);
          }

          // 🔊 If backend sent TTS audio, play it
          const audioBase64 = (data as any).audio_base64;
          if (audioBase64) {
            try {
              const byteChars = atob(audioBase64);
              const byteNumbers = new Array(byteChars.length);
              for (let i = 0; i < byteChars.length; i++) {
                byteNumbers[i] = byteChars.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray.buffer], { type: "audio/mpeg" });
              const url = URL.createObjectURL(blob);

              const audio = new Audio(url);
              audio.play().catch((err) => {
                console.error("Error playing TTS audio:", err);
              });
            } catch (err) {
              console.error("Error decoding/playing TTS audio:", err);
            }
          }
        } catch (err) {
          console.error("Error sending audio to STT endpoint:", err);
          setUserTranscript("Could not reach the speech server.");
        }
      };

      mediaRecorder.start();

      // --- Web Audio API: drive waveform based on mic volume ---
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioCtx();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);

      const updateLevel = () => {
        analyser.getByteTimeDomainData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = dataArray[i] - 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length);

        const level = Math.min(rms / 12, 1); // normalize & clamp
        setAudioLevel(level);

        rafRef.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  // ---------- STOP RECORDING ----------
  const stopRecording = () => {
    setIsRecording(false);
    setAudioLevel(0);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // clean up on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedUserText =
    userTranscript || "Your response appears here...";

  // dynamic styles for mic button based on state
  const micButtonGradient = isRecording
    ? "bg-gradient-to-br from-rose-500 to-red-500"
    : "bg-gradient-to-br from-cyan-500 to-teal-500";

  return (
    <section
      id="voice-demo"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Orbs */}
      <GlowingOrb
        size={500}
        color="rgba(16, 185, 129, 0.12)"
        blur={100}
        className="absolute top-10 right-10"
        duration={10}
      />
      <GlowingOrb
        size={400}
        color="rgba(99, 102, 241, 0.1)"
        blur={90}
        className="absolute bottom-10 left-10"
        duration={12}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-emerald-200 to-cyan-200 bg-clip-text text-transparent">
            Voice Interaction Demo
          </h2>
          <p className="text-gray-400 text-lg">
            Experience natural, conversational learning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard className="p-8 md:p-12">
            {/* AI Prompt */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30">
                  <p className="text-gray-200">
                    "Don't hesitate, let's conversate!"
                  </p>
                </div>
              </div>
            </div>


            {/* Microphone Button + state label */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMicClick}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center group ${micButtonGradient}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                {isRecording && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-cyan-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
                <Mic className="w-8 h-8 text-white relative z-10" />
              </motion.button>

              <p className="text-sm text-gray-400">
                {isRecording
                  ? "Recording… click to stop"
                  : "Click to start recording"}
              </p>
            </div>

            {/* User transcript bubble */}
            <div className="flex items-start gap-4 mt-8 justify-end">
              <div className="flex-1 text-right">
                <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
                  <p className="text-gray-300 italic">
                    {displayedUserText}
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* AI response bubble (optional) */}
            {aiResponse && (
              <div className="flex items-start gap-4 mt-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30">
                    <p className="text-gray-200">{aiResponse}</p>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
