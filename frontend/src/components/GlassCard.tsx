import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div 
      className={`rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl ${className}`}
      style={{
        boxShadow: "0 8px 32px 0 rgba(6, 182, 212, 0.1), inset 0 0 40px rgba(139, 92, 246, 0.05)"
      }}
    >
      {children}
    </div>
  );
}
