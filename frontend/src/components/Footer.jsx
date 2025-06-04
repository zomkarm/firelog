// src/components/Footer.jsx
import { Github, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-10 px-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-purple-700">🔥 FireLog</h2>
          <p className="text-sm text-gray-500">Secure. Monitor. Respond.</p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-gray-600">
          <a href="#" className="hover:text-purple-600 transition">Documentation</a>
          <a href="/login" className="hover:text-purple-600 transition">Login</a>
          <a href="/register" className="hover:text-purple-600 transition">Register</a>
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-gray-500">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition">
            <Github size={20} />
          </a>
          <a href="mailto:support@firelog.io" className="hover:text-purple-600 transition">
            <Mail size={20} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6">
        &copy; {new Date().getFullYear()} FireLog. All rights reserved.
      </div>
    </footer>
  );
}
