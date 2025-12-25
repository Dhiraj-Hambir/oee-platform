import { Navigate } from 'react-router-dom';
import { hasRouteAccess } from '../utils/permissions';

function PermissionProtectedRoute({ children, route }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail') || '';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has access to this route
  if (!hasRouteAccess(userEmail, route)) {
    // Redirect to dashboard if user doesn't have access
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PermissionProtectedRoute;

