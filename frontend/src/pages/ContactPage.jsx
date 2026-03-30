import React, { useState, useCallback } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

import SEO from '@/components/SEO';
import { useIntersection } from '@/hooks/useIntersection';

const API_BASE = `${import.meta.env.VITE_BACKEND_URL || ''}/api`;

// ---------------------------------------------------------------------------
// RevealSection
// ---------------------------------------------------------------------------

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Store info
// ---------------------------------------------------------------------------

const STORE_INFO = [
  {
    icon: MapPin,
    label: 'Adress',
    value: 'Lugna gatan 2, 211 60 Malmö',
    href: 'https://www.google.com/maps/search/?api=1&query=Lugna+gatan+2,+211+60+Malmö',
    external: true,
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '040-92 44 20',
    href: 'tel:+46409244 20',
  },
  {
    icon: Mail,
    label: 'E-post',
    value: 'mathallen24@mathallen.nu',
    href: 'mailto:mathallen24@mathallen.nu',
  },
  {
    icon: Clock,
    label: 'Öppettider',
    value: 'Alla dagar 08:00 - 22:00',
  },
];

// ---------------------------------------------------------------------------
// Contact Form
// ---------------------------------------------------------------------------

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const validate = useCallback(() => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Ange ditt namn';
    if (!form.email.trim()) {
      errs.email = 'Ange din e-postadress';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Ange en giltig e-postadress';
    }
    if (!form.message.trim()) errs.message = 'Skriv ett meddelande';
    return errs;
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    try {
      await axios.post(`${API_BASE}/contact`, form);
      setStatus('success');
      toast.success('Tack! Ditt meddelande har skickats.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('idle');
      toast.error(
        err.response?.data?.message || 'Något gick fel. Försök igen senare.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
          Tack för ditt meddelande!
        </h3>
        <p className="text-stone-600 mb-6">
          Vi har tagit emot ditt meddelande och återkommer så snart vi kan.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors"
        >
          Skicka ett nytt meddelande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sm:p-8 space-y-5"
    >
      <h2 className="font-heading text-2xl font-bold text-stone-900 mb-1">
        Skicka meddelande
      </h2>
      <p className="text-stone-500 text-sm mb-4">
        Fyll i formuläret nedan så återkommer vi så snart vi kan.
      </p>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Namn <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors ${
            errors.name ? 'border-red-400 bg-red-50' : 'border-stone-200 bg-white'
          }`}
          placeholder="Ditt namn"
        />
        {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-1.5">
          E-post <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors ${
            errors.email ? 'border-red-400 bg-red-50' : 'border-stone-200 bg-white'
          }`}
          placeholder="din@email.se"
        />
        {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors"
          placeholder="070-123 45 67"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-1.5">
          Meddelande <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-colors resize-none ${
            errors.message ? 'border-red-400 bg-red-50' : 'border-stone-200 bg-white'
          }`}
          placeholder="Skriv ditt meddelande här..."
        />
        {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#d12c22] hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors disabled:opacity-60 shadow-md shadow-red-600/20"
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Skickar...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Skicka meddelande
          </>
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Store Info Card
// ---------------------------------------------------------------------------

function StoreInfoCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 border-t-4 border-t-[#d12c22] p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-stone-900 mb-6">
        Butiksinformation
      </h2>
      <div className="space-y-5">
        {STORE_INFO.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-0.5">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="text-stone-900 font-medium hover:text-red-600 transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-stone-900 font-medium">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Extra info */}
      <div className="mt-8 pt-6 border-t border-stone-100">
        <h3 className="font-semibold text-stone-900 text-sm mb-2">
          Om butiken
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed">
          Mathallen 24 Lugnet ligger centralt i stadsdelen Lugnet i Malmö. Vi erbjuder
          ett brett sortiment av dagligvaror, färskvaror och internationella produkter
          till bra priser. Välkommen in!
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ContactPage
// ---------------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontakta Mathallen 24 Lugnet. Besök oss på Lugna gatan 2, Malmö eller ring 040-92 44 20. Öppet alla dagar 08-22."
        url="/kontakt"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-stone-900 to-stone-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
            Kontakta oss
          </h1>
          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto">
            Har du frågor, synpunkter eller vill du bara säga hej? Vi finns här för dig.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-12 sm:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <RevealSection className="lg:col-span-3">
              <ContactForm />
            </RevealSection>
            <RevealSection className="lg:col-span-2" delay={150}>
              <StoreInfoCard />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-0">
        <RevealSection>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
            <h2 className="font-heading text-2xl font-bold text-stone-900 mb-4">
              Hitta till oss
            </h2>
          </div>
          <div className="w-full h-[350px] sm:h-[450px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Mathallen 24 Lugnet på Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.5!2d13.0!3d55.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTHVnbmEgZ2F0YW4gMiwgMjExIDYwIE1hbG3Dtg!5e0!3m2!1ssv!2sse!4v1700000000000!5m2!1ssv!2sse&q=Lugna+gatan+2,+211+60+Malmö"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </RevealSection>
      </section>
    </>
  );
}
