/**
 * LogoutButton - Pulsante per effettuare il logout
 */

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  variant?: "default" | "ghost" | "outline";
  showText?: boolean;
}

export const LogoutButton = ({ variant = "ghost", showText = true }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button 
      variant={variant} 
      onClick={handleLogout}
      className="gap-2"
      size={showText ? "default" : "icon"}
    >
      <LogOut className="w-4 h-4" />
      {showText && "Esci"}
    </Button>
  );
};
