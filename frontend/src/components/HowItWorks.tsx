import { motion } from "motion/react";
import { FileText, Brain, MessageSquare } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Upload Notes",
      description: "Gemini analyzes your documents and extracts the key concepts.",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      icon: Brain,
      title: "AI Generates Questions",
      description: "Convers8 creates personalized Feynman-style questions.",
      gradient: "from-violet-500 to-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "Explain Out Loud",
      description: "The system listens, evaluates your understanding, and asks follow-ups.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-cyan-200 to-violet-200 bg-clip-text text-transparent">
            How Convers8 Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to transform your learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <GlassCard className="h-full group hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex flex-col items-center text-center p-8">
                  {/* Icon with glow */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 relative`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} blur-xl opacity-50 group-hover:opacity-75 transition-opacity`} />
                    <step.icon className="w-8 h-8 text-white relative z-10" />
                  </div>

                  <h3 className="text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
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
