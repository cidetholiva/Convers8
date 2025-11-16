import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { VoiceDemo } from "./components/VoiceDemo";
import { Features } from "./components/Features";
import { DashboardPreview } from "./components/DashboardPreview";
import { TechStack } from "./components/TechStack";
import { Team } from "./components/Team";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e27] via-[#0d1b2a] to-[#1b263b] text-white overflow-x-hidden">
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-50" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
           }} 
      />
      
      <Header />
      <Hero />
      <HowItWorks />
      <VoiceDemo />
      <Features />
      <DashboardPreview />
      <TechStack />
      <Team />
      <Footer />
    </div>
  );
}
