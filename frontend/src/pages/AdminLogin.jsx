import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent indexing of admin pages
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);

    document.title = "Admin Login - Mathallen 24 Lugnet";

    // Check if already logged in
    const token = localStorage.getItem("mathallen24_admin_token");
    if (token) {
      navigate("/admin/dashboard");
    }

    return () => {
      document.head.removeChild(metaRobots);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("mathallen24_admin_token", response.data.access_token);
      toast.success("Välkommen!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.detail || "Inloggningen misslyckades");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Mathallen 24 Lugnet"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Mathallen 24 Lugnet Admin</h1>
          <p className="text-stone-400 mt-1">Logga in för att hantera erbjudanden</p>
        </div>

        <div className="bg-stone-800 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6" data-testid="admin-login-form">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-stone-300">
                Användarnamn
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="pl-10 bg-stone-700 border-stone-600 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  data-testid="admin-username-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-stone-300">
                Lösenord
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-stone-700 border-stone-600 text-white placeholder:text-stone-500 focus:border-red-500 focus:ring-red-500 rounded-xl"
                  data-testid="admin-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-6 font-semibold"
              data-testid="admin-login-button"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="spinner" />
                  Loggar in...
                </span>
              ) : (
                "Logga in"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-stone-500 text-sm mt-6">
          <a href="/" className="hover:text-stone-300 transition-colors" data-testid="back-to-site-link">
            ← Tillbaka till webbplatsen
          </a>
        </p>
      </div>
    </div>
  );
}
