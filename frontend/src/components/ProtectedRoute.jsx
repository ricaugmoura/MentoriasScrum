import { Navigate } from 'react-router-dom';

/**
 * Route guard component to protect admin routes.
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    // Redirect to login page if no token exists in storage
    return <Navigate to="/login" replace />;
  }

  // Render protected child components if authenticated
  return children;
}
