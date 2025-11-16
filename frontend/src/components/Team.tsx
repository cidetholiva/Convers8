import { motion } from "motion/react";
import { Server, Headphones, Palette, Mic } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function Team() {
  const teamMembers = [
    {
      role: "Backend - Gemini Integration",
      icon: Server,
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      role: "Backend - Voice Processing",
      icon: Headphones,
      gradient: "from-violet-500 to-purple-500"
    },
    {
      role: "Frontend - UI + Uploads",
      icon: Palette,
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      role: "Frontend - Voice Interface",
      icon: Mic,
      gradient: "from-indigo-500 to-violet-500"
    }
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-emerald-200 to-violet-200 bg-clip-text text-transparent">
            Built By Innovators
          </h2>
          <p className="text-gray-400 text-lg">
            A passionate team bringing AI-powered learning to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-6 text-center group hover:border-cyan-500/40 transition-all cursor-pointer">
                {/* Icon with glow accent */}
                <div className="relative inline-block mb-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} blur-lg opacity-40 group-hover:opacity-70 transition-opacity rounded-full`} />
                    <member.icon className="w-7 h-7 text-white relative z-10" />
                  </div>
                  {/* Small glowing accent */}
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br ${member.gradient}`}
                       style={{ boxShadow: `0 0 12px rgba(6, 182, 212, 0.6)` }} 
                  />
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {member.role}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
