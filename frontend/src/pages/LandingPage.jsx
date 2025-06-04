// src/App.jsx
import { Bolt, ShieldCheck, Code, AlertTriangle } from 'lucide-react';
import LandingHeader from "../components/LandingHeader";
import Footer from '../components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <LandingHeader />

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 via-white to-blue-50 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Monitor & Protect Your <span className="text-purple-600"> Infrastructure</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          FireLog delivers real-time logging, alerting, and intelligent threat detection to safeguard your systems.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition"
          >
            View Docs
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-12">Built for Developers & Security Teams</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 max-w-6xl mx-auto">
          <div className="flex flex-col items-center">
            <Bolt className="text-purple-600 w-10 h-10 mb-2" />
            <h3 className="font-bold text-lg mb-1">Real-Time Logs</h3>
            <p className="text-gray-500 text-sm">Instant visibility into API activity and user behavior.</p>
          </div>
          <div className="flex flex-col items-center">
            <AlertTriangle className="text-yellow-500 w-10 h-10 mb-2" />
            <h3 className="font-bold text-lg mb-1">Suspicious Activity Alerts</h3>
            <p className="text-gray-500 text-sm">Get notified when anomalies or threats are detected.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-green-600 w-10 h-10 mb-2" />
            <h3 className="font-bold text-lg mb-1">Security-first Design</h3>
            <p className="text-gray-500 text-sm">Built with encryption, API-key validation, and safety in mind.</p>
          </div>
          <div className="flex flex-col items-center">
            <Code className="text-blue-600 w-10 h-10 mb-2" />
            <h3 className="font-bold text-lg mb-1">Easy Integration</h3>
            <p className="text-gray-500 text-sm">Flexible REST APIs ready for instant plug-and-play.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
