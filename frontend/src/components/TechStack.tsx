import { motion } from "motion/react";
import { Sparkles, Zap, Cloud, Code, Palette } from "lucide-react";

export function TechStack() {
  const technologies = [
    { name: "Google Gemini", icon: Sparkles, color: "from-blue-500 to-cyan-500" },
    { name: "Eleven Labs", icon: Zap, color: "from-violet-500 to-purple-500" },
    { name: "Cloudflare Workers", icon: Cloud, color: "from-orange-500 to-amber-500" },
    { name: "Next.js", icon: Code, color: "from-gray-600 to-gray-800" },
    { name: "Tailwind", icon: Palette, color: "from-cyan-500 to-teal-500" }
  ];

  return (
    <section className="relative py-32 px-6">
      {/* Bright gradient background strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 via-indigo-900/20 to-violet-900/20 backdrop-blur-3xl" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-teal-200 to-violet-200 bg-clip-text text-transparent">
            Powered By Cutting-Edge Tech
          </h2>
          <p className="text-gray-400 text-lg">
            Built with the best tools in the industry
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center relative`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity rounded-2xl`} />
                <tech.icon className="w-8 h-8 text-white relative z-10" />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
