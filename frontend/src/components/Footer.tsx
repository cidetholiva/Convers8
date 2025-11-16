import { Github, Mail, Shield, Info } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <span className="text-sm">C8</span>
            </div>
            <span className="text-lg bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              Convers8
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Info className="w-4 h-4" />
              About
            </a>
            <a href="#github" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="#contact" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail className="w-4 h-4" />
              Contact
            </a>
            <a href="#privacy" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Shield className="w-4 h-4" />
              Privacy
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2025 Convers8. Learn faster by explaining.
        </div>
      </div>
    </footer>
  );
}
