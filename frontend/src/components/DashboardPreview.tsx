import { motion } from "motion/react";
import { Clock, TrendingUp } from "lucide-react";
import { GlassCard } from "./GlassCard";

export function DashboardPreview() {
  const recentSessions = [
    { topic: "Operant Conditioning", mastery: 85, duration: "12 min" },
    { topic: "Quantum Entanglement", mastery: 72, duration: "18 min" },
    { topic: "Keynesian Economics", mastery: 91, duration: "15 min" }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-cyan-200 to-indigo-200 bg-clip-text text-transparent">
            Study Session Dashboard
          </h2>
          <p className="text-gray-400 text-lg">
            Track your learning journey in real-time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Concept Mastery Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 group hover:border-violet-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl">Concept Mastery</h3>
              </div>

              {/* Progress circles */}
              <div className="space-y-4">
                {["Psychology", "Physics", "Economics"].map((subject, i) => {
                  const progress = [85, 72, 91][i];
                  return (
                    <div key={subject}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-300">{subject}</span>
                        <span className="text-cyan-400">{progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full"
                          style={{
                            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)"
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* Recent Sessions Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8 group hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl">Recent Sessions</h3>
              </div>

              <div className="space-y-3">
                {recentSessions.map((session, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer group/item"
                  >
                    <div className="flex-1">
                      <div className="text-sm mb-1">{session.topic}</div>
                      <div className="text-xs text-gray-500">{session.duration}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-cyan-400">{session.mastery}%</div>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 group-hover/item:shadow-lg group-hover/item:shadow-cyan-400/50" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
