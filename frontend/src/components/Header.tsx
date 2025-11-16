import Logo from "../assets/Convers8.png";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0e27]/60 border-b border-white/5"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Convers8 Logo"
            className="w-10 h-10 rounded-full object-cover shadow-lg shadow-cyan-500/30"
          />
          <span className="text-xl tracking-tight bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
            Convers8
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
            Home
          </a>
          <a href="#how-it-works" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
            How It Works
          </a>
          <a href="#upload" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
            Upload Notes
          </a>
          <a href="#session" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
            Start Session
          </a>
          <a href="#about" className="text-gray-300 hover:text-cyan-300 transition-colors text-sm">
            About
          </a>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-sm overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          <span className="relative z-10">Start Studying</span>
        </motion.button>
      </nav>
    </motion.header>
  );
}
