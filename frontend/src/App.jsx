import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Client pages
import ClientLayout from "./pages/ClientDashboard";
import Dashboard from "./components/forms/client/Dashboard";
import LogsPage from "./components/forms/client/LogsPage";
import AlertsPage from "./components/forms/client/AlertsPage";
import SettingsPage from "./components/forms/client/SettingsPage";
import ClientConfigPage from "./components/forms/client/ClientConfigPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ CLIENT ROUTES */}
        <Route path="/client" element={<ClientLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="config" element={<ClientConfigPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* ✅ You can do same for /admin in future */}
      </Routes>
    </Router>
  );
}

export default App;
