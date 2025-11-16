import { motion } from "motion/react";

interface GlowingOrbProps {
  size: number;
  color: string;
  blur: number;
  className?: string;
  duration?: number;
}

export function GlowingOrb({ size, color, blur, className = "", duration = 8 }: GlowingOrbProps) {
  return (
    <motion.div
      className={`rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
