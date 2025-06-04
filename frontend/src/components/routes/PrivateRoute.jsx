// src/components/routes/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // 'admin' or 'client'

  if (!token) return <Navigate to="/" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;

  return <Outlet />;
}
