import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight, ChevronDown, Check } from 'lucide-react';
import { Combobox } from '@headlessui/react';
// Headless UI Combobox is used for the country code dropdown
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const countryCodes: CountryCode[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1' },
  { code: 'MX', name: 'México', flag: '🇲🇽', dialCode: '+52' },
  { code: 'ES', name: 'España', flag: '🇪🇸', dialCode: '+34' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', dialCode: '+591' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', dialCode: '+506' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', dialCode: '+53' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴', dialCode: '+1-809' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', dialCode: '+593' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', dialCode: '+503' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', dialCode: '+502' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', dialCode: '+504' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', dialCode: '+505' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦', dialCode: '+507' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', dialCode: '+595' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪', dialCode: '+51' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', dialCode: '+1-787' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', dialCode: '+598' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '+58' },
];

const StartPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]);
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Filter countries based on search query
  const filteredCountries = React.useMemo(() => {
    if (!query.trim()) return countryCodes;

    const searchTerm = query.toLowerCase().trim();
    return countryCodes.filter(country => {
      return (
        country.name.toLowerCase().includes(searchTerm) ||
        country.dialCode.includes(searchTerm) ||
        country.code.toLowerCase() === searchTerm
      );
    });
  }, [query]);
  const location = useLocation();
  const isSpanish = location.pathname.includes('/es');
  const comp = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Event handlers and effects for the country code dropdown are managed by Headless UI

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from("#title", {
        opacity: 0,
        y: '+=30',
        duration: 1,
      })
      .from("#subtitle", {
        opacity: 0,
        y: '+=20',
        duration: 0.8,
        delay: -0.5
      })
      .from("#buttons", {
        opacity: 0,
        y: '+=20',
        duration: 0.8,
        delay: -0.4
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  const API_BASE_URL = 'https://v3-production-2670.up.railway.app/onboarding';

  const getFlowAndLanguage = () => {
    const params = new URLSearchParams(location.search);
    let flow = params.get('flow');
    let language = params.get('language') || (isSpanish ? 'es' : 'en');

    // Handle fallback from simplified onboarding
    if (!flow) {
      const intent = params.get('intent');
      if (intent && ['free', 'premium'].includes(intent)) {
        flow = intent;
      }
    }

    return { flow, language };
  };

  // Enhanced phone number validation
  const validatePhoneNumber = (phone: string, country: CountryCode): { isValid: boolean; error?: string } => {
    const cleanedPhone = phone.replace(/\D/g, '');

    if (!cleanedPhone) {
      return {
        isValid: false,
        error: isSpanish ? 'Por favor ingresa tu número de WhatsApp' : 'Please enter your WhatsApp number'
      };
    }

    if (cleanedPhone.length < 8 || cleanedPhone.length > 15) {
      return {
        isValid: false,
        error: isSpanish
          ? 'El número debe tener entre 8 y 15 dígitos'
          : 'Phone number must be between 8 and 15 digits'
      };
    }

    // Construct E.164 format
    const fullPhoneNumber = `${country.dialCode}${cleanedPhone}`;
    const e164Regex = /^\+[1-9]\d{1,14}$/;

    if (!e164Regex.test(fullPhoneNumber)) {
      return {
        isValid: false,
        error: isSpanish
          ? 'Formato de número inválido para el país seleccionado'
          : 'Invalid number format for selected country'
      };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Validate phone number
    const validation = validatePhoneNumber(phoneNumber, selectedCountry);
    if (!validation.isValid) {
      setError(validation.error!);
      setLoading(false);
      return;
    }

    // Construct E.164 format
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    const fullPhoneNumber = `${selectedCountry.dialCode}${cleanedPhone}`;

    console.log('Submitting phone number:', {
      rawInput: phoneNumber,
      cleanedPhone,
      dialCode: selectedCountry.dialCode,
      fullPhoneNumber,
      country: selectedCountry.name
    });

    const { flow, language } = getFlowAndLanguage();

    // Validate flow parameter
    if (!flow || !['premium', 'free'].includes(flow)) {
      setError(isSpanish
        ? 'Parámetro de flujo inválido. Use ?flow=premium o ?flow=free'
        : 'Invalid flow parameter. Use ?flow=premium or ?flow=free'
      );
      setLoading(false);
      return;
    }

    try {
      console.log('Sending request to backend:', {
        url: `${API_BASE_URL}/${flow}`,
        payload: { phoneNumber: fullPhoneNumber, language },
        flow,
        language
      });

      const response = await fetch(`${API_BASE_URL}/${flow}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber, language }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response JSON:', parseError);
        setError(isSpanish
          ? 'Error del servidor. Por favor, inténtalo de nuevo más tarde.'
          : 'Server error. Please try again later.'
        );
        setLoading(false);
        return;
      }

      console.log('Backend response:', { status: response.status, data });

      if (response.ok) {
        if (flow === 'premium') {
          if (data.gumroadUrl) {
            setSuccess(isSpanish
              ? '¡Perfecto! Activando tu coach premium...'
              : 'Perfect! Activating your premium coach...'
            );
            console.log('Redirecting to Gumroad:', data.gumroadUrl);
            // Small delay to show success message
            setTimeout(() => {
              window.location.href = data.gumroadUrl;
            }, 1000);
          } else {
            setError(isSpanish
              ? 'Error: No se recibió el enlace de pago.'
              : 'Error: Payment link not received.'
            );
          }
        } else if (flow === 'free') {
          if (data.whatsappLink) {
            setSuccess(isSpanish
              ? '¡Excelente! Conectando con tu coach...'
              : 'Excellent! Connecting with your coach...'
            );
            console.log('Redirecting to WhatsApp:', data.whatsappLink);
            // Small delay to show success message
            setTimeout(() => {
              window.location.href = data.whatsappLink;
            }, 1000);
          } else {
            setError(isSpanish
              ? 'Error: No se recibió el enlace de WhatsApp.'
              : 'Error: WhatsApp link not received.'
            );
          }
        }
      } else {
        // Handle specific error codes
        if (response.status === 400) {
          setError(data.error || (isSpanish
            ? 'Datos inválidos. Verifica tu número de teléfono.'
            : 'Invalid data. Please check your phone number.'
          ));
        } else if (response.status === 429) {
          setError(isSpanish
            ? 'Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.'
            : 'Too many requests. Please wait a moment and try again.'
          );
        } else if (response.status >= 500) {
          setError(isSpanish
            ? 'Error del servidor. Por favor, inténtalo de nuevo más tarde.'
            : 'Server error. Please try again later.'
          );
        } else {
          setError(data.error || (isSpanish
            ? 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'
            : 'An error occurred. Please try again later.'
          ));
        }
      }
    } catch (err) {
      console.error('Network error:', err);
      setError(isSpanish
        ? 'Error de conexión. Verifica tu internet e inténtalo de nuevo.'
        : 'Connection error. Please check your internet and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const { language } = getFlowAndLanguage();
  const isES = language === 'es';

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-950 text-gray-100 overflow-hidden font-sans" ref={comp}>
      {/* Hero Section with video background */}
      <div className="relative w-full min-h-screen flex flex-col">
        {/* Video Background */}
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            poster="/videos/hero-video.webp"
            aria-label={isSpanish ? 'Video de fondo: corredor entrenando' : 'Background video: runner training'}
          >
            <source src="/videos/hero-video.webm" type="video/webm" />
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <img src="/videos/hero-video.webp" alt={isSpanish ? 'Corredor entrenando' : 'Runner training'} className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 backdrop-blur-sm"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="w-full max-w-4xl mx-auto text-center space-y-8">
            {/* Badges */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-8" role="group" aria-label={isSpanish ? 'Badges de confianza' : 'Trust badges'}>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20">
                <span className="w-1.5 h-1.5 bg-[#25d366] rounded-full mr-2"></span>
                {isSpanish ? 'Coach IA 24/7' : 'AI Coach 24/7'}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20">
                <span className="w-1.5 h-1.5 bg-[#25d366] rounded-full mr-2"></span>
                {isSpanish ? 'Vía WhatsApp' : 'Via WhatsApp'}
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/20">
                <span className="w-1.5 h-1.5 bg-[#25d366] rounded-full mr-2"></span>
                {isSpanish ? 'Planes personalizados' : 'Personalized plans'}
              </span>
            </div>
            
            <h1 id="title" className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-sm">
              {isSpanish
                ? 'Tu Coach de Running Personal por WhatsApp'
                : 'Your Personal Running Coach via WhatsApp'}
            </h1>

            <p id="subtitle" className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              {isSpanish
                ? 'Recibe tu plan de entrenamiento personalizado y coaching diario directamente en WhatsApp. Tu entrenador de IA te guiará paso a paso hacia tu primera maratón.'
                : 'Get your personalized training plan and daily coaching directly on WhatsApp. Your AI trainer will guide you step-by-step to your first marathon.'}
            </p>
          </div>

          {/* Form Section - Positioned below hero content */}
          <div id="contact-form" className="w-full max-w-md mx-auto mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
            <div className="p-8 rounded-2xl flex flex-col relative border border-[#1a1a1a] bg-neutral-950/90 shadow-none backdrop-blur-sm transition-all duration-300 hover:border-[#25d366]/60">
              <h2 className="text-2xl font-semibold text-white mb-4 text-center tracking-tight flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#25d366]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {isSpanish ? 'Conecta con tu Coach IA' : 'Connect with your AI Coach'}
              </h2>
              <p className="text-sm text-gray-400 mb-6 text-center">
                {isSpanish
                  ? 'Ingresa tu WhatsApp para recibir tu plan personalizado y comenzar tu entrenamiento hoy mismo'
                  : 'Enter your WhatsApp to receive your personalized plan and start training today'}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                    {isSpanish ? 'Tu WhatsApp para recibir coaching' : 'Your WhatsApp for coaching'}
                    <span className="text-red-400 ml-1" aria-label={isSpanish ? 'requerido' : 'required'}>*</span>
                  </label>
                  <div className="flex rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] focus-within:ring-2 focus-within:ring-[#25d366]/50 focus-within:border-[#25d366]/50 transition">
                    <div className="relative" ref={dropdownRef}>
                      {/* Country Dropdown Button */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-full px-3 py-3 flex items-center gap-2 text-sm text-gray-300 hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25d366]/50 border-r border-[#1a1a1a]"
                        aria-label={isSpanish ? 'Seleccionar código de país' : 'Select country code'}
                        aria-expanded={isDropdownOpen}
                        aria-haspopup="listbox"
                      >
                        <span className="text-base">{selectedCountry.flag}</span>
                        <span className="text-white">{selectedCountry.dialCode}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute z-50 mt-1 w-80 max-h-72 overflow-hidden rounded-md bg-[#0a0a0a] border border-[#1a1a1a] shadow-lg">
                          {/* Search Input */}
                          <div className="sticky top-0 bg-[#0a0a0a] p-2 border-b border-[#1a1a1a]">
                            <input
                              type="text"
                              className="w-full bg-transparent py-2 px-3 text-white focus:outline-none focus:border-b-2 focus:border-[#25d366] placeholder-gray-500"
                              placeholder={isSpanish ? 'Buscar país...' : 'Search country...'}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              autoComplete="off"
                            />
                          </div>

                          {/* Countries List */}
                          <div className="max-h-60 overflow-y-auto" role="listbox">

                            {filteredCountries.length === 0 ? (
                              <div className="px-4 py-3 text-sm text-gray-400">
                                {isSpanish ? 'No se encontraron países' : 'No countries found'}
                              </div>
                            ) : (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsDropdownOpen(false);
                                    setQuery('');
                                  }}
                                  className={`w-full px-4 py-3 text-sm cursor-pointer flex items-center gap-3 text-white hover:bg-[#25d366]/10 focus:bg-[#25d366]/10 focus:outline-none ${
                                    selectedCountry.code === country.code ? 'bg-[#25d366]/20' : ''
                                  }`}
                                  role="option"
                                  aria-selected={selectedCountry.code === country.code}
                                >
                                  <span className="text-base">{country.flag}</span>
                                  <span className="flex-1 text-left">{country.name}</span>
                                  <span className="text-gray-400">{country.dialCode}</span>
                                  {selectedCountry.code === country.code && (
                                    <Check className="w-4 h-4 text-[#25d366] ml-2" aria-hidden="true" />
                                  )}
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 relative">
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={isSpanish ? 'Ej: 5512345678' : 'Ex: 2025550100'}
                        value={phoneNumber}
                        onChange={(e) => {
                          // Allow only numbers, spaces, hyphens, and parentheses
                          const value = e.target.value.replace(/[^0-9\s-()]/g, '');
                          setPhoneNumber(value);
                        }}
                        className="w-full h-full px-4 py-3 bg-transparent text-white focus:outline-none placeholder-gray-500/60"
                        disabled={loading}
                        aria-label={isSpanish ? 'Número de teléfono' : 'Phone number'}
                        aria-describedby={`phone-help ${error ? 'phone-error' : ''} ${success ? 'phone-success' : ''}`.trim()}
                        aria-required="true"
                        aria-invalid={error ? 'true' : 'false'}
                      />
                    </div>
                  </div>

                  {error && (
                    <p id="phone-error" className="mt-1.5 text-sm text-red-400" role="alert">
                      {error}
                    </p>
                  )}

                  {success && (
                    <p id="phone-success" className="mt-1.5 text-sm text-[#25d366]" role="status">
                      {success}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-[#25d366] focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:ring-offset-2 flex items-center justify-center gap-2 ${
                    loading
                      ? 'bg-[#25d366]/20 text-[#25d366]/70 cursor-not-allowed'
                      : 'bg-transparent text-[#25d366] hover:bg-[#25d366]/10 border-opacity-60'
                  }`}
                  disabled={loading}
                  aria-describedby={loading ? 'loading-status' : undefined}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-[#25d366]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span id="loading-status">
                        {isSpanish ? 'Procesando...' : 'Processing...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>{isSpanish ? 'Comenzar mi entrenamiento' : 'Start my training'}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {/* Additional help text */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    {isSpanish
                      ? 'Al continuar, aceptas recibir tu plan de entrenamiento personalizado, coaching diario y seguimiento de progreso vía WhatsApp de Andes Running Club.'
                      : 'By continuing, you agree to receive your personalized training plan, daily coaching, and progress tracking via WhatsApp from Andes Running Club.'
                    }
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
