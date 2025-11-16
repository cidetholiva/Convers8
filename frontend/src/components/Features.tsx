import { motion } from "motion/react";
import { Mic, Volume2, Brain, BarChart3, Target } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function Features() {
  const features = [
    {
      icon: Mic,
      title: "Real-time Speech Recognition",
      description: "Advanced voice processing captures every word with precision",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: Volume2,
      title: "ElevenLabs Natural Voice",
      description: "Lifelike AI responses that feel like talking to a tutor",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Brain,
      title: "Gemini-Powered Analysis",
      description: "Deep concept extraction and understanding evaluation",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: BarChart3,
      title: "Session History & Insights",
      description: "Track your progress and mastery over time",
      gradient: "from-indigo-500 to-violet-500"
    },
    {
      icon: Target,
      title: "Knowledge Gap Detection",
      description: "AI identifies areas that need more practice",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-violet-200 to-emerald-200 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need for an immersive learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full group hover:border-cyan-500/40 transition-all duration-300 cursor-pointer">
                <div className="p-6">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-lg opacity-40 group-hover:opacity-70 transition-opacity rounded-xl`} />
                    <feature.icon className="w-6 h-6 text-white relative z-10" />
                  </div>

                  <h3 className="text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
