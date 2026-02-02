/**
 * Login Page - Accesso con codice
 * 
 * Questa pagina richiede un codice di accesso per entrare nell'app.
 * Il codice viene hashato e confrontato con l'hash atteso.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyAccessCode, setAuthenticated } from "@/lib/auth";
import { Lock, Eye, EyeOff, KeyRound, AlertCircle } from "lucide-react";
import superProgrammatoreLogo from "@/assets/super-programmatore-logo.png";

const Login = () => {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsVerifying(true);

    try {
      const isValid = await verifyAccessCode(code);
      
      if (isValid) {
        setAuthenticated(true);
        navigate("/");
      } else {
        setError("Codice di accesso non valido. Riprova.");
        setCode("");
      }
    } catch {
      setError("Errore durante la verifica. Riprova.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <Card className="w-full max-w-md relative z-10 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <img 
              src={superProgrammatoreLogo} 
              alt="Super Programmatore Logo" 
              className="w-48 h-auto mx-auto"
            />
          </div>
          <CardDescription className="text-muted-foreground">
            Inserisci il codice di accesso per continuare
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="accessCode" className="text-sm font-medium text-foreground flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                Codice di Accesso
              </label>
              <div className="relative">
                <Input
                  id="accessCode"
                  type={showCode ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Inserisci il codice..."
                  className="pr-10 bg-background/50 border-primary/20 focus:border-primary"
                  autoComplete="off"
                  disabled={isVerifying}
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!code.trim() || isVerifying}
            >
              {isVerifying ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Verifica in corso...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Accedi
                </span>
              )}
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
