import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'mathallen24_cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setAnimate(true));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setAnimate(false);
    setTimeout(() => setVisible(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setAnimate(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[60] p-4 transition-all duration-300 ease-out',
        animate
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
      )}
    >
      <Card className="max-w-2xl mx-auto shadow-2xl border-stone-200">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-stone-900 mb-1">
                Vi använder cookies
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Vi använder cookies för att förbättra din upplevelse på vår
                webbplats. Genom att fortsätta använda sidan godkänner du vår
                användning av cookies i enlighet med vår{' '}
                <a
                  href="/integritetspolicy"
                  className="text-red-600 underline hover:text-red-700"
                >
                  integritetspolicy
                </a>
                .
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="text-xs"
              >
                Avvisa
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="bg-red-600 hover:bg-red-700 text-white text-xs"
              >
                Acceptera
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
