import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import RegisterPage from "./pages/RegisterPage";

// Admin pages
import AdminLayout from "./pages/AdminDashboard";
import AdminDashboard from "./components/forms/admin/Dashboard";
import AdminLogsPage from "./components/forms/admin/LogsPage";
import AdminAlertsPage from "./components/forms/admin/AlertsPage";
import AdminSettingsPage from "./components/forms/admin/SettingsPage";


// Client pages
import ClientLayout from "./pages/ClientDashboard";
import Dashboard from "./components/forms/client/Dashboard";
import LogsPage from "./components/forms/client/LogsPage";
import AlertsPage from "./components/forms/client/AlertsPage";
import SettingsPage from "./components/forms/client/SettingsPage";
import ClientConfigPage from "./components/forms/client/ClientConfigPage";
import ClientApiDocsPage from "./components/forms/client/ClientApiDocsPage";
import PrivateRoute from "./components/routes/PrivateRoute";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ✅ CLIENT ROUTES */}
        <Route element={<PrivateRoute allowedRole="client" />}>
          <Route path="/client" element={<ClientLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="logs" element={<LogsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="config" element={<ClientConfigPage />} />
            <Route path="documentation" element={<ClientApiDocsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ✅ ADMIN ROUTES */}
        <Route element={<PrivateRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="logs" element={<AdminLogsPage />} />
            <Route path="alerts" element={<AdminAlertsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        {/* ✅ You can do same for /admin in future */}
      </Routes>
    </Router>
  );
}

export default App;
