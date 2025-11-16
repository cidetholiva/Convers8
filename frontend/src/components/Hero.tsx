"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { Upload, Mic } from "lucide-react";
import { GlowingOrb } from "./GlowingOrb";

export function Hero() {
  // ---------- FILE UPLOAD ----------
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    // when user clicks the button, we trigger the hidden input
    fileInputRef.current?.click();
  };

  const handleFilesSelected = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files; // user input saved here!!!
    if (!files || files.length === 0) return;

    const file = files[0];

    // FRONTEND: build formData and send file to your backend
    const formData = new FormData();
    formData.append("file", file); // "file" is the field name backend will read

    try {
      //  ‼️BACKEND: replace this URL with your real upload endpoint
      await fetch("https://your-backend.com/upload-notes", {
        method: "POST",
        body: formData, // <-- file is in the body
      });

      // maybeee add??
      // const data = await res.json();
      // show toast / status UI with `data`
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  // ---------- VOICE SESSION: just scroll to Voice Demo ----------
  const handleVoiceClick = () => {
    // scroll to <section id="voice-demo"> in VoiceDemo.tsx
    const voiceSection = document.getElementById("voice-demo");
    if (voiceSection) {
      voiceSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <GlowingOrb
        size={600}
        color="rgba(6, 182, 212, 0.15)"
        blur={100}
        className="absolute top-20 left-10 animate-pulse"
        duration={8}
      />
      <GlowingOrb
        size={500}
        color="rgba(139, 92, 246, 0.12)"
        blur={120}
        className="absolute top-40 right-20 animate-pulse"
        duration={10}
      />
      <GlowingOrb
        size={400}
        color="rgba(16, 185, 129, 0.1)"
        blur={90}
        className="absolute bottom-40 left-1/3 animate-pulse"
        duration={12}
      />

      {/* Large Glowing Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/20 blur-sm" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border-2 border-violet-500/30 blur-md" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-cyan-200 via-violet-200 to-emerald-200 bg-clip-text text-transparent">
              Learn Faster by
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Explaining.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Convers8 uses the Feynman Technique and real-time voice AI to help
            you deeply understand any topic—by explaining it out loud.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFilesSelected}
            />

            {/* Upload button */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(6, 182, 212, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 overflow-hidden"
              onClick={handleUploadClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <span className="relative z-10 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Study Notes
              </span>
            </motion.button>

            {/* Voice Session button -> scroll to VoiceDemo */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(139, 92, 246, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-full border-2 border-violet-500/50 bg-violet-500/10 backdrop-blur-sm overflow-hidden"
              onClick={handleVoiceClick}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Start Voice Session
              </span>
            </motion.button>
          </motion.div>

          {/* Floating 3D Sphere */}
          <motion.div
            className="absolute -bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400/20 to-violet-500/20 backdrop-blur-xl border border-white/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              boxShadow:
                "0 0 80px rgba(6, 182, 212, 0.3), inset 0 0 40px rgba(139, 92, 246, 0.2)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
