import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;

// Storage keys
const STORAGE_KEYS = {
  lastShown: "mathallen24_popup_last_shown",
  sessionShown: "mathallen24_popup_session_shown",
  neverShow: "mathallen24_popup_never_show",
};

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if device is mobile
  const isMobile = () => {
    return window.innerWidth < 768;
  };

  // Check if popup should be shown based on frequency
  const shouldShowBasedOnFrequency = (frequency) => {
    switch (frequency) {
      case "once":
        return !localStorage.getItem(STORAGE_KEYS.neverShow);

      case "daily": {
        const lastShown = localStorage.getItem(STORAGE_KEYS.lastShown);
        if (!lastShown) return true;
        const lastDate = new Date(lastShown).toDateString();
        const today = new Date().toDateString();
        return lastDate !== today;
      }

      case "session":
        return !sessionStorage.getItem(STORAGE_KEYS.sessionShown);

      case "always":
      default:
        return true;
    }
  };

  // Check if popup should be shown on current page
  const shouldShowOnPage = (pages, currentPath) => {
    if (!pages || pages.length === 0) return true;
    return pages.some((page) => {
      if (page === "/") return currentPath === "/";
      return currentPath.startsWith(page);
    });
  };

  // Mark popup as shown
  const markAsShown = (frequency) => {
    switch (frequency) {
      case "once":
        localStorage.setItem(STORAGE_KEYS.neverShow, "true");
        break;
      case "daily":
        localStorage.setItem(STORAGE_KEYS.lastShown, new Date().toISOString());
        break;
      case "session":
        sessionStorage.setItem(STORAGE_KEYS.sessionShown, "true");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Don't show popup on admin pages
    if (location.pathname.startsWith("/admin")) {
      setLoading(false);
      return;
    }

    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API}/settings`);
        const data = response.data;
        setSettings(data);

        const isEnabled = data.popup_enabled === true;
        const frequencyOk = shouldShowBasedOnFrequency(
          data.popup_frequency || "always"
        );
        const pageOk = shouldShowOnPage(data.popup_pages, location.pathname);
        const deviceOk = isMobile()
          ? data.popup_show_mobile !== false
          : data.popup_show_desktop !== false;

        if (isEnabled && frequencyOk && pageOk && deviceOk) {
          const delay = (data.popup_delay || 1) * 1000;
          setTimeout(() => {
            setIsOpen(true);
            markAsShown(data.popup_frequency || "always");
          }, delay);
        }
      } catch (error) {
        console.error("Error fetching popup settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(false);
    const link = settings?.popup_link || "/erbjudanden";

    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  if (loading || !settings) return null;

  // Handle image URL - check if it's an API path or external URL
  let imageUrl = settings?.popup_image_url || "";
  if (!imageUrl) return null;
  if (imageUrl.startsWith("/api")) {
    imageUrl = `${import.meta.env.VITE_BACKEND_URL}${imageUrl}`;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent
        className="max-w-lg w-full p-0 border-none bg-transparent shadow-none [&>button]:hidden"
        data-testid="promo-popup-container"
        onInteractOutside={handleClose}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          data-testid="promo-popup-close"
          aria-label="Stang"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Popup Image */}
        <div
          onClick={handleClick}
          className="rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
        >
          <img
            src={imageUrl}
            alt="Veckans erbjudanden"
            className="w-full h-auto"
            data-testid="promo-popup-image"
          />
        </div>

        {/* Click hint for mobile */}
        <p className="text-center text-white/80 text-sm mt-3 md:hidden">
          Tryck pa bilden for att se erbjudanden
        </p>
      </DialogContent>
    </Dialog>
  );
}
