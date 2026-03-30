import { useState, useEffect, useCallback } from "react";
import { X, Mail, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;
const DISMISSED_KEY = "mathallen24_newsletter_popup_dismissed";
const SUBSCRIBED_KEY = "mathallen24_newsletter_subscribed";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const triggerPopup = useCallback(() => {
    const alreadySubscribed = localStorage.getItem(SUBSCRIBED_KEY);
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (alreadySubscribed || dismissed) return;
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // Check if already subscribed or dismissed
    const alreadySubscribed = localStorage.getItem(SUBSCRIBED_KEY);
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (alreadySubscribed || dismissed) return;

    // Trigger after time on page (15 seconds)
    const timer = setTimeout(() => {
      triggerPopup();
    }, 15000);

    // Trigger after scroll depth (50% of page)
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      if (scrollPercent >= 0.5) {
        triggerPopup();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerPopup]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as dismissed so it won't show again this session
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
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
      setSubscribed(true);

      // Mark as subscribed permanently
      localStorage.setItem(SUBSCRIBED_KEY, "true");

      toast.success("Tack for din prenumeration!");

      // Close after showing success
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      if (error.response?.status === 400) {
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        toast.info("Du ar redan prenumerant!");
        setTimeout(() => {
          setIsOpen(false);
        }, 2000);
      } else {
        toast.error("Nagot gick fel. Forsok igen.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
      data-testid="newsletter-popup-overlay"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-400"
        onClick={(e) => e.stopPropagation()}
        data-testid="newsletter-popup-container"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center transition-colors"
          data-testid="newsletter-popup-close"
          aria-label="Stang"
        >
          <X className="w-4 h-4 text-stone-600" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Missa inte vara erbjudanden!
          </h2>
          <p className="text-white/90 text-sm">
            Prenumerera pa vart nyhetsbrev och fa veckans basta deals direkt i
            din inbox
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!subscribed ? (
            <>
              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {[
                  "Exklusiva erbjudanden varje vecka",
                  "Forst med att veta om kampanjer",
                  "Tips och recept fran vara kockar",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-stone-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    type="email"
                    placeholder="Din e-postadress"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-6 text-base border-stone-200 focus:border-red-500 focus:ring-red-500 rounded-xl"
                    data-testid="newsletter-email-input"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-base"
                  data-testid="newsletter-submit-button"
                >
                  {loading ? "Skickar..." : "Prenumerera nu"}
                </Button>
              </form>

              <p className="text-center text-stone-400 text-xs mt-4">
                Genom att prenumerera godkanner du vara villkor. Avsluta nar som
                helst.
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">
                Valkommen!
              </h3>
              <p className="text-stone-600">
                Du ar nu prenumerant och kommer fa vara basta erbjudanden direkt
                i din inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
