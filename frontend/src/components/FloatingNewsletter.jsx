import { useState, useEffect } from "react";
import { X, Mail, ChevronUp, Gift } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;
const SUBSCRIBED_KEY = "mathallen24_newsletter_subscribed";
const MINIMIZED_KEY = "mathallen24_floating_minimized";

export default function FloatingNewsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show on admin pages
    if (location.pathname.startsWith("/admin")) {
      setIsVisible(false);
      return;
    }

    // Check if already subscribed
    const subscribed = localStorage.getItem(SUBSCRIBED_KEY);
    if (subscribed) return;

    // Check if minimized in this session
    const minimized = sessionStorage.getItem(MINIMIZED_KEY);
    if (minimized) {
      setIsMinimized(true);
    }

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleMinimize = () => {
    setIsMinimized(true);
    sessionStorage.setItem(MINIMIZED_KEY, "true");
  };

  const handleExpand = () => {
    setIsMinimized(false);
    sessionStorage.removeItem(MINIMIZED_KEY);
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem(MINIMIZED_KEY, "true");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Ange en giltig e-postadress");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      localStorage.setItem(SUBSCRIBED_KEY, "true");
      toast.success("Tack for din prenumeration!");
      setIsVisible(false);
    } catch (error) {
      if (error.response?.status === 400) {
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        toast.info("Du ar redan prenumerant!");
        setIsVisible(false);
      } else {
        toast.error("Nagot gick fel. Forsok igen.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  // Minimized state - just a small button
  if (isMinimized) {
    return (
      <button
        onClick={handleExpand}
        className="fixed bottom-6 right-6 z-[100] bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        data-testid="floating-newsletter-expand"
      >
        <Gift className="w-6 h-6" />
      </button>
    );
  }

  // Expanded state - full form
  return (
    <div
      className="fixed bottom-6 right-6 z-[100] w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-400"
      data-testid="floating-newsletter-container"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Mail className="w-5 h-5" />
          <span className="font-semibold text-sm">Nyhetsbrev</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Minimera"
          >
            <ChevronUp className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Stang"
            data-testid="floating-newsletter-close"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-stone-700 text-sm mb-3">
          Fa veckans erbjudanden direkt i din inbox!
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Din e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-sm border-stone-200 focus:border-red-500 focus:ring-red-500"
            data-testid="floating-newsletter-email"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2"
            data-testid="floating-newsletter-submit"
          >
            {loading ? "Skickar..." : "Prenumerera"}
          </Button>
        </form>
        <p className="text-stone-400 text-xs mt-2 text-center">
          Avsluta nar som helst
        </p>
      </div>
    </div>
  );
}
