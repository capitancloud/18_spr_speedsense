/**
 * ProtectedRoute - Componente che protegge le route
 * 
 * Se l'utente non è autenticato, viene reindirizzato alla pagina di login.
 */

import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
