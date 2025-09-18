import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RedirectIfToken = ({ children }: { children: ReactNode }) => {
  const token = "nfjskdbnfjksnfjkslnajfklnsjdkflnjk";
  const location = useLocation();

  // Redirect user to dashboard if user is logged in
  if (token)
    return <Navigate to="/dashboard" state={{ from: location }} replace />;

  return children;
};
