import { Navigate } from 'react-router-dom';

function AdminProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole') || 'user';
  const isAdmin = userRole === 'admin';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    // Redirect non-admin users to dashboard
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default AdminProtectedRoute;

