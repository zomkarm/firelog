// src/App.jsx
import LandingHeader from "../components/LandingHeader";

function App() {
  return (
    <div className="min-h-screen">
      <LandingHeader />

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Monitor & Protect Your API Infrastructure</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          FireLog provides real-time logging, alerting, and threat detection for your backend systems.
        </p>
      </section>

      {/* Second Section */}
      <section className="bg-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Built for Developers & Security Teams</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Seamlessly integrate our APIs, monitor suspicious activity, and automate your threat response.
        </p>
      </section>
    </div>
  );
}

export default App;
