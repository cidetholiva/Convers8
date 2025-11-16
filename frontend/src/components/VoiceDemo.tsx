import { motion } from "motion/react";
import { Mic, Volume2 } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { GlowingOrb } from "./GlowingOrb";

export function VoiceDemo() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
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
            {/* AI Message */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/30">
                  <p className="text-gray-200">
                    "Explain operant conditioning in simple terms."
                  </p>
                </div>
              </div>
            </div>

            {/* Waveform Animation */}
            <div className="flex items-center justify-center gap-1 my-12">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-cyan-500 to-teal-400 rounded-full"
                  animate={{
                    height: [20, Math.random() * 60 + 20, 20],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Microphone Button */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <Mic className="w-8 h-8 text-white relative z-10" />
              </motion.button>
            </div>

            {/* Response Placeholder */}
            <div className="flex items-start gap-4 mt-8 justify-end">
              <div className="flex-1 text-right">
                <div className="inline-block px-6 py-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30">
                  <p className="text-gray-300 italic">Your response appears here...</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-white" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
