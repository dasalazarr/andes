import React from 'react';
import { FaBullseye, FaChalkboardTeacher, FaUsers, FaBrain, FaShieldAlt, FaMedal, FaWhatsapp, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { articleImages } from '../config/images';

// Article and Plan Data

export const heroContent = {
  es: {
    preheading: "El club de running de Pamplona · Coach por WhatsApp",
    headline: {
      variantA: {
        lead: "Enamórate de correr",
        accent: "en dos semanas.",
      },
      variantB: {
        lead: "Enamórate de correr",
        accent: "en dos semanas.",
      },
    },
    description: "Quedadas que se sienten como un plan con amigas y una coach en WhatsApp que se adapta a ti. Tu primera carrera, sin miedo y sin lesiones.",
    ctaPrimaryText: "Empezar Gratis por WhatsApp",
    ctaSecondaryText: "Conoce el club",
    limitNotice: "15 días Premium gratis · Sin tarjeta · Sin bloqueo",
    keyBenefits: "Sin descargas · Plan en 60 segundos · A tu ritmo, siempre",
    imageSrc: '/images/club/hero.webp',
  },
  en: {
    preheading: "The Pamplona running club · Coach on WhatsApp",
    headline: {
      variantA: {
        lead: "Fall in love with running",
        accent: "in two weeks.",
      },
      variantB: {
        lead: "Fall in love with running",
        accent: "in two weeks.",
      },
    },
    description: "Meetups that feel like plans with friends, and a WhatsApp coach that adapts to you. Your first race — no fear, no injuries.",
    ctaPrimaryText: "Start Free on WhatsApp",
    ctaSecondaryText: "Meet the club",
    limitNotice: "15 days of Premium free · No card · No lockout",
    keyBenefits: "No downloads · First plan in 60 seconds · Always at your pace",
    imageSrc: '/images/club/hero.webp',
  },
};

// How It Works Section
export const howItWorksContent = {
  es: {
    sectionTitle: "Cómo Funciona",
    sectionSubtitle: "De cero a tu plan personalizado en 60 segundos",
    steps: [
      {
        iconName: "MessageCircle",
        title: "Escríbenos por WhatsApp",
        description: "Sin descargas. Solo envía un mensaje y empezamos.",
      },
      {
        iconName: "ClipboardList",
        title: "Responde 3 preguntas",
        description: "Tu nivel, tu objetivo, tu disponibilidad. Eso es todo.",
      },
      {
        iconName: "Zap",
        title: "Recibe tu plan personalizado",
        description: "Listo para entrenar en menos de 60 segundos.",
      },
    ],
  },
  en: {
    sectionTitle: "How It Works",
    sectionSubtitle: "From zero to your personalized plan in 60 seconds",
    steps: [
      {
        iconName: "MessageCircle",
        title: "Text us on WhatsApp",
        description: "No downloads. Just send a message and we start.",
      },
      {
        iconName: "ClipboardList",
        title: "Answer 3 questions",
        description: "Your level, your goal, your availability. That's it.",
      },
      {
        iconName: "Zap",
        title: "Get your personalized plan",
        description: "Ready to train in under 60 seconds.",
      },
    ],
  },
};

// Product Demo Content — WhatsApp conversation mockup
export const productDemoContent: {
  es: { sectionTitle: string; sectionSubtitle: string; messages: { from: "coach" | "user"; text: string; }[] };
  en: { sectionTitle: string; sectionSubtitle: string; messages: { from: "coach" | "user"; text: string; }[] };
} = {
  es: {
    sectionTitle: "Así se ve una conversación con tu coach",
    sectionSubtitle: "No es un bot genérico. Es un coach que recuerda, ajusta y previene lesiones.",
    messages: [
      { from: "user", text: "Hoy hice 5K pero la rodilla derecha me molesta un poco." },
      { from: "coach", text: "Gracias por contarme. Hoy descansas. Mañana caminata 25 min en lugar de los 6K que tocaban — bajamos carga 30% mientras la molestia cede.\n\nSi sigue mañana, lo marcamos para revisar antes del fin de semana." },
      { from: "user", text: "Listo. ¿Y la carrera del domingo?" },
      { from: "coach", text: "Si la rodilla mejora antes del viernes, llegamos. Si no, movemos el rodaje largo a 8K en vez de 12K. Tu meta de 21K en marzo no se mueve — solo este micro." },
    ],
  },
  en: {
    sectionTitle: "This is what a coaching conversation looks like",
    sectionSubtitle: "Not a generic bot. A coach that remembers, adjusts, and prevents injuries.",
    messages: [
      { from: "user", text: "Did 5K today but my right knee feels a little off." },
      { from: "coach", text: "Thanks for flagging. Rest today. Tomorrow's 6K becomes a 25-min walk — load down 30% until it settles.\n\nIf it's still there tomorrow, we'll review before the weekend." },
      { from: "user", text: "Got it. What about Sunday's race?" },
      { from: "coach", text: "If your knee clears by Friday, we're on. If not, the long run becomes 8K instead of 12K. Your March 21K goal stays — only this micro shifts." },
    ],
  },
};

// Live Demo Content
export const liveDemoContent = {
  es: {
    chatBubble: "👟 ¡Excelente 5 K! Mañana 30 min suaves. ¿Listo?",
    liveIndicators: {
      runnersTraining: "6 782 corredores entrenando hoy",
      goalsCrushed: "3 500 metas logradas ⭐"
    }
  },
  en: {
    chatBubble: "👟 Great 5 K! Tomorrow 30 min easy. Ready?",
    liveIndicators: {
      runnersTraining: "6,782 runners training today",
      goalsCrushed: "3,500 goals crushed ⭐"
    }
  }
};

// Lead Magnet Content
export const leadMagnetContent = {
  es: {
    title: "Descarga gratis: '10 errores que causan lesiones antes del KM 30'"
  },
  en: {
    title: "Free download: '10 Mistakes That Cause Injuries Before Mile 20'"
  }
};

export const benefitsContent = {
  es: {
    sectionTitle: "Lo que vas a ganar",
    sectionSubtitle: "Tres cosas que no encuentras en un PDF de Google ni en una app fría.",
    benefits: [
      {
        icon: FaWhatsapp,
        headline: "Una coach que te recuerda",
        copy: "Recuerda cómo te fue el martes y ajusta el viernes. Sin volver a explicarle quién eres cada vez.",
        proof: "Memoria persistente · Cero re-onboarding",
        testimonial: "Es como escribirle a una amiga que sabe de running.",
      },
      {
        icon: FaCalendarAlt,
        headline: "Un plan que se mueve contigo",
        copy: "¿Mala noche, agujetas, viaje? El plan se reordena solo. Sin culpa y sin volver a empezar.",
        proof: "Recálculo de carga diario",
        testimonial: "La constancia importa más que la perfección.",
      },
      {
        icon: FaChartLine,
        headline: "Una alarma antes de la lesión",
        copy: "Detecta la sobrecarga antes de que te haga daño y baja el volumen automáticamente.",
        proof: "Prevención de lesiones de fábrica",
        testimonial: "Te frena a tiempo para que no tengas que parar.",
      },
    ],
  },
  en: {
    sectionTitle: "What you actually get",
    sectionSubtitle: "Three things you won't find in a PDF plan from Google or a cold app.",
    benefits: [
      {
        icon: FaWhatsapp,
        headline: "A coach that remembers you",
        copy: "Remembers Tuesday's run and adjusts Friday's. No re-explaining who you are every time.",
        proof: "Persistent memory · Zero re-onboarding",
        testimonial: "Like texting a friend who knows about running.",
      },
      {
        icon: FaCalendarAlt,
        headline: "A plan that moves with you",
        copy: "Bad night, sore legs, travel? The plan reshuffles itself. No guilt, no starting over.",
        proof: "Daily load recalculation",
        testimonial: "Consistency matters more than perfection.",
      },
      {
        icon: FaChartLine,
        headline: "An alarm before injury",
        copy: "Detects overload before it hurts you and dials the volume back automatically.",
        proof: "Injury prevention built in",
        testimonial: "It slows you down in time, so you never have to stop.",
      },
    ],
  },
};

export const indicatorsContent = {
  es: {
    preheading: "Prevención, no reacción",
    title: "El coach que cuida tu cuerpo semana a semana.",
    highlight: "Monitoreamos tu carga de entrenamiento cada semana. Si escala demasiado rápido, te avisamos y bajamos el volumen antes de que aparezca la lesión.",
    pillars: [
      "¿Hoy te sentiste pesada? Mañana entrenas más suave. Así de simple.",
      "Si vamos camino a la sobrecarga, frenamos antes — no después de la lesión.",
      "Tu coach recuerda tus molestias pasadas y las tiene en cuenta en cada ajuste.",
    ],
    image: {
      src: "/coaching.avif",
      alt: "Entrenador conversando con una corredora durante una sesión al aire libre",
    },
    stats: [
      { value: "72", label: "NPS (beta)" },
      { value: "64%", label: "Completa su primer plan" },
      { value: "60", label: "Segundos para tu primer plan" },
      { value: "24/7", label: "Disponibilidad del coach" },
    ],
    statsDisclaimer: "Datos de nuestros primeros usuarios beta.",
  },
  en: {
    preheading: "Prevention, not reaction",
    title: "The coach that watches your body week over week.",
    highlight: "We monitor your training load every week. If it spikes too fast, we warn you and cut volume before an injury shows up.",
    pillars: [
      "Felt heavy today? Tomorrow's session gets easier. That simple.",
      "Heading toward overload? We pull back before the injury — not after.",
      "Your coach remembers past aches and factors them into every adjustment.",
    ],
    image: {
      src: "/coaching.avif",
      alt: "Coach guiding a runner during an outdoor session",
    },
    stats: [
      { value: "72", label: "NPS (beta)" },
      { value: "64%", label: "First plan completion" },
      { value: "60", label: "Seconds to your first plan" },
      { value: "24/7", label: "Coach availability" },
    ],
    statsDisclaimer: "Based on our first beta users.",
  },
};

export const testimonialsContent = {
  es: {
    sectionTitle: "Lo que dicen nuestros primeros corredores",
    sectionDisclaimer: "Historias representativas basadas en experiencias de nuestros primeros usuarios beta.",
    testimonials: [
      {
        quote: "Completé mi primera maratón en 4:15. El plan se adaptó a mi horario de oficina y el coach me avisaba cuando estaba forzando de más.",
        author: "Ana P.",
        detail: "Ciudad de México · Beta tester",
        result: "42.2km en 4:15",
      },
      {
        quote: "Mejoré mi 10K de 52 a 45 minutos en 3 meses. Lo que más me sirvió fue que ajustaba el plan cuando me sentía cansado.",
        author: "Carlos L.",
        detail: "Santiago de Chile · Beta tester",
        result: "-7 min en 3 meses",
      },
      {
        quote: "Empecé sin saber nada de correr y ahora hago 5K sin parar. Es como WhatsAppear con un amigo que sabe de running.",
        author: "Sofía G.",
        detail: "Bogotá · Beta tester",
        result: "0 a 5K en 8 semanas",
      },
    ],
  },
  en: {
    sectionTitle: "What our first runners say",
    sectionDisclaimer: "Representative stories based on early beta user experiences.",
    testimonials: [
      {
        quote: "I finished my first marathon in 4:15. The plan adapted to my office schedule and the coach warned me when I was pushing too hard.",
        author: "Ana P.",
        detail: "Mexico City · Beta tester",
        result: "42.2km in 4:15",
      },
      {
        quote: "I improved my 10K from 52 to 45 minutes in 3 months. What helped most was the plan adjusting when I felt tired.",
        author: "Carlos L.",
        detail: "Santiago, Chile · Beta tester",
        result: "-7 min in 3 months",
      },
      {
        quote: "I started knowing nothing about running and now I do 5K without stopping. It's like texting a friend who knows about running.",
        author: "Sofia G.",
        detail: "Bogotá · Beta tester",
        result: "0 to 5K in 8 weeks",
      },
    ],
  },
};


interface PricingPlan {
  name: string;
  iconName: string;
  price: string;
  priceDetail: string;
  annualPrice?: string;
  annualPriceDetail?: string;
  description: string;
  features: (string | { text: string; tooltip: string })[];
  ctaText: string;
  ctaDisclaimer?: string;
  ctaSecondaryText?: string;
  comparisonPrice?: string;
  savingsPercentage?: string;
  urgencyText?: string;
  popularBadge?: string;
  guarantee?: string;
  href?: string;
  isPopular: boolean;
  buttonVariant: 'primary' | 'secondary';
  image?: string;
  imageAlt?: string;
}

interface PricingContent {
  sectionTitle: string;
  sectionSubtitle: string;
  competitiveAnchor: string;
  plans: PricingPlan[];
}

interface PricingContentStructure {
  sectionTitle: string;
  sectionSubtitle: string;
  competitiveAnchor: string;
  limitNote: string;
  comparisonRows: Array<{
    feature: string;
    free: string;
    premium: string;
  }>;
  plans: PricingPlan[];
}

export const pricingContent: {
  es: PricingContentStructure;
  en: PricingContentStructure;
} = {
  es: {
    sectionTitle: "Free vs Premium, sin letra pequeña",
    sectionSubtitle: "Empieza gratis hoy y mejora cuando quieras.",
    competitiveAnchor: "",
    limitNote: "Empiezas con 15 días de Premium gratis. Después sigues gratis en modo Lite (sin bloqueo).",
    comparisonRows: [
      { feature: "Entrenamiento base", free: "Sí", premium: "Sí" },
      { feature: "Modo Lite sin bloqueo", free: "Sí", premium: "Sí" },
      { feature: "Recordatorios proactivos", free: "No", premium: "Sí" },
      { feature: "Seguimiento semanal personalizado", free: "No", premium: "Sí" },
      { feature: "Detección de inactividad", free: "No", premium: "Sí" },
      { feature: "Medallas y countdown de carrera", free: "No", premium: "Sí" },
    ],
    plans: [
      {
        name: "Empieza Gratis",
        iconName: "Rocket",
        price: "Gratis",
        priceDetail: "",
        description: "Empiezas con 15 días de Premium completo. Después, Andes sigue funcionando gratis en modo Lite, sin bloqueo.",
        features: [
          "15 días de Premium gratis al empezar.",
          "Funcional siempre, incluso después del umbral.",
          "Plan base para empezar desde cero.",
          "Acompañamiento en modo Lite sin bloqueo.",
          "Ideal para preparar tu primer 5K/10K.",
        ],
        ctaText: "Empezar Gratis",
        ctaDisclaimer: "Sin tarjeta • Funciona siempre",
        isPopular: false,
        buttonVariant: "secondary",
        image: "/starter_es.png",
        imageAlt: "Corredora entrenando en un lago al amanecer",
      },
      {
        name: "Premium",
        iconName: "Zap",
        price: "$9.99",
        priceDetail: "/mes",
        annualPrice: "$8.49",
        annualPriceDetail: "/mes (facturado anual)",
        savingsPercentage: "Ahorra 15%",
        popularBadge: "MÁS ELEGIDO",
        description: "Desbloquea templates proactivos y seguimiento personalizado para acelerar resultados.",
        features: [
          "Recordatorios automáticos de entrenamiento.",
          "Seguimiento semanal personalizado.",
          "Detección de inactividad y reactivación.",
          "Medallas de progreso y countdown de carrera.",
          "Mayor personalización por contexto y objetivo.",
        ],
        ctaText: "Desbloquear Premium",
        ctaDisclaimer: "Cancela cuando quieras",
        guarantee: "30 días de garantía · Devolvemos tu dinero si no ves resultados",
        isPopular: true,
        buttonVariant: "primary",
        image: "/pro_es.png",
        imageAlt: "Corredor atravesando un bosque en carrera",
      },
    ],
  },
  en: {
    sectionTitle: "Free vs Premium, no surprises",
    sectionSubtitle: "Start free today and upgrade when you want.",
    competitiveAnchor: "",
    limitNote: "You start with 15 days of Premium free. After that, you stay free in Lite mode (no lockout).",
    comparisonRows: [
      { feature: "Core training plan", free: "Yes", premium: "Yes" },
      { feature: "Lite mode without lockout", free: "Yes", premium: "Yes" },
      { feature: "Proactive reminders", free: "No", premium: "Yes" },
      { feature: "Personalized weekly follow-up", free: "No", premium: "Yes" },
      { feature: "Inactivity follow-up", free: "No", premium: "Yes" },
      { feature: "Medals and race countdown", free: "No", premium: "Yes" },
    ],
    plans: [
      {
        name: "Start Free",
        iconName: "Rocket",
        price: "Free",
        priceDetail: "",
        description: "You start with 15 days of full Premium. After that, Andes keeps working free in Lite mode, with no lockout.",
        features: [
          "15 days of Premium free when you start.",
          "Always functional, even after the threshold.",
          "Starter plan for beginner runners.",
          "Lite support with no service lockout.",
          "Strong entry point for first 5K/10K.",
        ],
        ctaText: "Start Free",
        ctaDisclaimer: "No card • Always works",
        isPopular: false,
        buttonVariant: "secondary",
        image: "/starter_en.png",
        imageAlt: "Athlete swimming in open water at sunrise",
      },
      {
        name: "Premium",
        iconName: "Zap",
        price: "$9.99",
        priceDetail: "/month",
        annualPrice: "$8.49",
        annualPriceDetail: "/month (billed annually)",
        savingsPercentage: "Save 15%",
        popularBadge: "MOST CHOSEN",
        description: "Unlock proactive templates and personalized follow-up to accelerate progress.",
        features: [
          "Proactive training reminders.",
          "Personalized weekly follow-up.",
          "Inactivity detection and re-engagement.",
          "Progress medals and race countdown.",
          "Deeper context-aware personalization.",
        ],
        ctaText: "Unlock Premium",
        ctaDisclaimer: "Cancel anytime",
        guarantee: "30-day guarantee · Money back if you don't see results",
        isPopular: true,
        buttonVariant: "primary",
        image: "/pro_en.png",
        imageAlt: "Trail runner sprinting through a forest",
      },
    ],
  },
};

export const faqContent = {
  es: {
    sectionTitle: "Tus dudas, resueltas",
    sectionSubtitle: "Las preguntas que te harías antes de empezar",
    faqs: [
      {
        question: "¿Tengo que ser rápida o estar en forma para empezar?",
        answer: "No. Andes existe justo para lo contrario: para que empieces desde cero, a tu ritmo. Las quedadas del club son a ritmo de conversación y tu plan puede empezar con caminatas. Nadie te va a dejar atrás.",
      },
      {
        question: "¿Es realmente gratis? ¿Cuál es la trampa?",
        answer: "No hay trampa. Empiezas con 15 días de Premium completo gratis, sin tarjeta. Después sigues gratis: 30 mensajes inteligentes y luego modo Lite sin bloqueo. Premium ($9.99/mes) mantiene los recordatorios proactivos y el seguimiento personalizado, pero nunca te quedarás sin coach.",
      },
      {
        question: "No sé nada de running. ¿Es para mí?",
        answer: "Especialmente para ti. Andes empieza con caminatas y trote suave, sin presión. Te pregunta tu nivel, tu objetivo y tu disponibilidad. Si nunca corriste, tu plan empieza desde cero.",
      },
      {
        question: "¿Cómo es diferente de buscar planes en Google?",
        answer: "Un plan de Google es estático — no sabe que hoy dormiste mal o que te duele la rodilla. Andes escucha tu feedback cada día y ajusta el plan en tiempo real. Es la diferencia entre un PDF y un coach.",
      },
      {
        question: "¿Y si me lesiono siguiendo el plan?",
        answer: "Andes ajusta tu carga cada día según cómo te sentiste. Si reportas dolor o fatiga, reduce la intensidad automáticamente. Prevención de lesiones está integrada en cada plan — no es un extra, es la base.",
      },
      {
        question: "¿Qué pasa si falto a un entrenamiento?",
        answer: "La vida pasa. Dile a Andes 'hoy no pude correr' y ajusta tu semana automáticamente. Sin culpa, sin sobrecargas. La consistencia importa más que la perfección.",
      },
      {
        question: "¿Necesito equipo especial o reloj GPS?",
        answer: "No. Solo necesitas zapatillas cómodas y tu teléfono. Puedes registrar carreras con Strava o simplemente con un cronómetro.",
      },
      {
        question: "¿Puedo cancelar Premium cuando quiera?",
        answer: "Sí, en 1 clic desde WhatsApp. Y si no ves resultados en 30 días, te devolvemos tu dinero.",
      },
    ],
  },
  en: {
    sectionTitle: "Your questions, answered",
    sectionSubtitle: "The things you'd ask before getting started",
    faqs: [
      {
        question: "Do I need to be fast or fit to start?",
        answer: "No. Andes exists for exactly the opposite: to help you start from zero, at your pace. Club meetups run at conversation pace and your plan can start with walks. Nobody gets left behind.",
      },
      {
        question: "Is it really free? What's the catch?",
        answer: "No catch. You start with 15 days of full Premium free, no card needed. After that you stay free: 30 smart messages, then Lite mode with no lockout. Premium ($9.99/month) keeps proactive reminders and personalized follow-up, but you'll never lose your coach.",
      },
      {
        question: "I know nothing about running. Is this for me?",
        answer: "Especially for you. Andes starts with walking and light jogging, no pressure. It asks your level, your goal, and your availability. If you've never run, your plan starts from zero.",
      },
      {
        question: "How is this different from Googling a plan?",
        answer: "A Google plan is static — it doesn't know you slept badly or your knee hurts. Andes listens to your daily feedback and adjusts in real time. It's the difference between a PDF and a coach.",
      },
      {
        question: "What if I get injured following the plan?",
        answer: "Andes adjusts your training load every day based on how you felt. If you report pain or fatigue, it automatically reduces intensity. Injury prevention is built into every plan — it's not an add-on, it's the foundation.",
      },
      {
        question: "What if I miss a workout?",
        answer: "Life happens. Tell Andes 'I couldn't run today' and it adjusts your week automatically. No guilt, no overloading. Consistency matters more than perfection.",
      },
      {
        question: "Do I need special gear or a GPS watch?",
        answer: "No. You just need comfortable shoes and your phone. You can track runs with Strava or simply a stopwatch.",
      },
      {
        question: "Can I cancel Premium anytime?",
        answer: "Yes, in 1 click from WhatsApp. And if you don't see results in 30 days, we'll refund your money.",
      },
    ],
  },
};

export const ctaContent = {
  es: {
    title: "Tu primera carrera empieza con un mensaje.",
    subtitle: "Sin descargas. Sin tarjeta. Sin bloqueo. Solo abre WhatsApp.",
    buttonText: "Empezar Gratis por WhatsApp",
    secondaryLinkText: "Ver planes Premium →",
  },
  en: {
    title: "Your first race starts with a message.",
    subtitle: "No download. No card. No lockout. Just open WhatsApp.",
    buttonText: "Start Free on WhatsApp",
    secondaryLinkText: "See Premium plans →",
  },
};

export const freePlansSectionContent = {
  es: {
    title: "Explora Más Planes Gratuitos",
    sectionSubtitle: "Planes de entrenamiento para llevar tu carrera al siguiente nivel, sin costo alguno.",
  },
  en: {
    title: "Explore More Free Plans",
    sectionSubtitle: "Training plans to take your running to the next level, completely free.",
  },
};

// Existing testimonialsContent will be replaced by gritStoriesContent
/*
export const testimonialsContent = {
  es: {
    sectionTitle: "Lo Que Dicen Nuestros Corredores",
    testimonials: [
      {
        quote: "¡Gracias a Andes Runners, completé mi primera maratón! El plan fue perfecto y la comunidad increíble.",
        author: "Ana Pérez",
        detail: "Corredora de Maratón, Ciudad de México",
      },
      {
        quote: "Mejoré mi tiempo en 10K significativamente. Los consejos de nutrición y entrenamiento fueron clave.",
        author: "Carlos López",
        detail: "Corredor de 10K, Santiago de Chile",
      },
      {
        quote: "Empecé desde cero y ahora corro 5K sin problemas. ¡Totalmente recomendado!",
        author: "Sofía Gómez",
        detail: "Principiante Feliz, Bogotá",
      },
    ],
  },
  en: {
    sectionTitle: "What Our Runners Say",
    testimonials: [
      {
        quote: "Thanks to Andes Runners, I completed my first marathon! The plan was perfect and the community was incredible.",
        author: "Ana Perez",
        detail: "Marathon Runner, Mexico City",
      },
      {
        quote: "I significantly improved my 10K time. The nutrition and training tips were key.",
        author: "Carlos Lopez",
        detail: "10K Runner, Santiago, Chile",
      },
      {
        quote: "I started from scratch and now I run 5K without any problems. Totally recommended!",
        author: "Sofia Gomez",
        detail: "Happy Beginner, Bogota",
      },
    ],
  },
};
*/

// Articles Section Content
interface ArticlesSectionText {
  title: string;
  subtitle: string;
}

export interface ArticlesSectionContent {
  en: ArticlesSectionText;
  es: ArticlesSectionText;
}

export interface ReadMoreButtonText {
  en: string;
  es: string;
}

export type Language = "en" | "es";

export interface LanguageSpecificText {
  en: string;
  es: string;
}

export interface TrainingPlan {
  id: string;
  title: LanguageSpecificText;
  description: LanguageSpecificText;
  level: LanguageSpecificText;
  iconName: string;
  status: LanguageSpecificText;
  downloadUrl: string;
}

export interface Article {
  id: string;
  title: LanguageSpecificText;
  excerpt: LanguageSpecificText;
  fullContent: LanguageSpecificText; // Placeholder for now
  image: string;
  imageAlt?: LanguageSpecificText; // Alt text for accessibility
  date: string; // Date can remain language-agnostic
  category?: LanguageSpecificText;
  // Author is removed
  readMoreUrl?: string; // Optional, if some articles link externally
}

export const articlesContent: Article[] = [
  {
    id: "nutricion-corredores",
    title: {
      en: "Nutrition for Runners",
      es: "Nutrición para Corredores",
    },
    excerpt: {
      en: "Learn what to eat to maximize your energy and recovery.",
      es: "Aprende qué comer para maximizar tu energía y recuperación.",
    },
    fullContent: {
      en: `## The Runner's Plate: Fueling for Performance\n\n### Pre-Run Nutrition\n- **2-3 hours before**: A balanced meal with complex carbs, lean protein, and healthy fats\n- **30-60 minutes before**: A small snack like a banana or energy bar\n- **Hydration**: 500ml of water 2 hours before running\n\n### During Your Run\n- **Under 60 minutes**: Water is usually sufficient\n- **60+ minutes**: 30-60g of carbs per hour from sports drinks or gels\n- **Electrolytes**: Essential for runs longer than 90 minutes\n\n### Recovery Meals\n- **30-minute window**: 3:1 ratio of carbs to protein\n- **Hydration**: Replace 150% of lost fluids\n- **Anti-inflammatory foods**: Berries, fatty fish, and tart cherry juice`,
      es: `## El Plato del Corredor: Nutrición para el Rendimiento\n\n### Antes de Correr\n- **2-3 horas antes**: Comida balanceada con carbohidratos complejos, proteína magra y grasas saludables\n- **30-60 minutos antes**: Un snack pequeño como un plátano o barra energética\n- **Hidratación**: 500ml de agua 2 horas antes de correr\n\n### Durante la Carrera\n- **Menos de 60 minutos**: Agua es suficiente\n- **Más de 60 minutos**: 30-60g de carbohidratos por hora de bebidas deportivas o geles\n- **Electrolitos**: Esenciales para carreras de más de 90 minutos\n\n### Recuperación\n- **Primeros 30 minutos**: Proporción 3:1 de carbohidratos a proteína\n- **Hidratación**: Reponer 150% de los líquidos perdidos\n- **Alimentos antiinflamatorios**: Frutos rojos, pescado azul y jugo de cereza ácida`
    },
    image: articleImages.nutrition.url,
    imageAlt: articleImages.nutrition.alt,
    date: "May 15, 2023",
  },
  {
    id: "preparacion-maraton",
    title: {
      en: "Marathon Preparation Guide",
      es: "Guía de Preparación para Maratón",
    },
    excerpt: {
      en: "Essential tips for successfully completing your first 42km race.",
      es: "Consejos esenciales para completar con éxito tu primera carrera de 42km.",
    },
    fullContent: {
      en: `# Your First Marathon: A 16-Week Journey\n\n## Training Phases\n1. **Base Building (Weeks 1-4)**\n   - Focus on consistent mileage\n   - Include one long run per week\n   - Add strength training 2x/week\n\n2. **Build Phase (Weeks 5-12)**\n   - Increase long run distance gradually\n   - Add speed work and hill training\n   - Practice race nutrition\n\n3. **Taper (Weeks 13-16)**\n   - Reduce mileage by 20-30% each week\n   - Maintain intensity but reduce volume\n   - Focus on rest and recovery\n\n## Race Day Strategy\n- **Pacing**: Start 15-30 seconds slower than goal pace\n- **Hydration**: Sip water every 15-20 minutes\n- **Nutrition**: 30-60g carbs/hour after first hour`,
      es: `# Tu Primer Maratón: Un Viaje de 16 Semanas\n\n## Fases de Entrenamiento\n1. **Base (Semanas 1-4)**\n   - Enfócate en kilometraje consistente\n   - Incluye una carrera larga semanal\n   - Añade entrenamiento de fuerza 2x/semana\n\n2. **Fase de Construcción (Semanas 5-12)**\n   - Aumenta gradualmente la distancia larga\n   - Incluye trabajo de velocidad y cuestas\n   - Practica tu nutrición de carrera\n\n3. **Taper (Semanas 13-16)**\n   - Reduce el kilometraje en un 20-30% cada semana\n   - Mantén la intensidad pero reduce el volumen\n   - Enfócate en el descanso y la recuperación\n\n## Estrategia del Día de la Carrera\n- **Ritmo**: Comienza 15-30 segundos más lento que tu ritmo objetivo\n- **Hidratación**: Bebe agua cada 15-20 minutos\n- **Nutrición**: 30-60g de carbohidratos/hora después de la primera hora`
    },
    image: articleImages.marathon.url,
    imageAlt: articleImages.marathon.alt,
    date: "June 2, 2023",
  },
  {
    id: "prevencion-lesiones",
    title: {
      en: "Injury Prevention for Runners",
      es: "Prevención de Lesiones para Corredores",
    },
    excerpt: {
      en: "Key strategies to stay injury-free while training.",
      es: "Estrategias clave para mantenerte libre de lesiones mientras entrenas.",
    },
    fullContent: {
      en: `# Stay Strong: Injury Prevention for Runners

## Common Running Injuries
- **Shin Splints**: Pain along the shin bone
- **IT Band Syndrome**: Outer knee pain
- **Plantar Fasciitis**: Heel pain
- **Runner's Knee**: Pain behind kneecap

## Prevention Strategies
1. **Strength Training**
   - Focus on hips, glutes, and core
   - 2-3 sessions per week
   - Bodyweight exercises count!

2. **Proper Warm-up**
   - Dynamic stretches only
   - 5-10 minutes of easy running
   - Include drills like high knees and butt kicks

3. **Listen to Your Body**
   - Don't ignore persistent pain
   - Take rest days seriously
   - Adjust training as needed`,

      es: `# Sin Lesiones: Prevención para Corredores

## Lesiones Comunes
- **Periostitis**: Dolor en la espinilla
- **Síndrome de la Cintilla Iliotibial**: Dolor en la parte externa de la rodilla
- **Fascitis Plantar**: Dolor en el talón
- **Rodilla del Corredor**: Dolor detrás de la rótula

## Estrategias de Prevención
1. **Entrenamiento de Fuerza**
   - Enfócate en caderas, glúteos y core
   - 2-3 sesiones por semana
   - Ejercicios con peso corporal son suficientes

2. **Calentamiento Adecuado**
   - Solo estiramientos dinámicos
   - 5-10 minutos de trote suave
   - Incluye ejercicios como rodillas altas y talones al glúteo

3. **Escucha a tu Cuerpo**
   - No ignores el dolor persistente
   - Tómate en serio los días de descanso
   - Ajusta el entrenamiento según sea necesario`
    },
    image: articleImages.injuryPrevention.url,
    imageAlt: articleImages.injuryPrevention.alt,
    date: "July 10, 2023",
  },
  {
    id: "elegir-zapatillas",
    title: {
      en: "Choosing the Right Running Shoes",
      es: "Cómo Elegir las Zapatillas Correctas",
    },
    excerpt: {
      en: "A guide to finding the perfect footwear and preventing injuries.",
      es: "Una guía para encontrar el calzado perfecto y prevenir lesiones.",
    },
    fullContent: {
      en: `## Finding Your Perfect Pair\n\n### Understanding Your Foot\n- **Arch Type**: Determine if you have flat, neutral, or high arches.\n- **Gait Analysis**: A specialty store can analyze your running form to check for overpronation or supination.\n\n### Types of Running Shoes\n- **Neutral**: For runners with normal pronation.\n- **Stability**: For runners who overpronate.\n- **Motion Control**: For severe overpronators.\n\n### Key Considerations\n- **Cushioning**: From minimalist to maximalist, choose based on comfort and running surface.\n- **Fit**: Leave a thumb's width of space between your longest toe and the end of the shoe.`,
      es: `## Encontrando tu Par Perfecto\n\n### Entendiendo tu Pie\n- **Tipo de Arco**: Determina si tienes arcos planos, neutros o altos.\n- **Análisis de la Pisada**: Una tienda especializada puede analizar tu forma de correr para detectar sobrepronación o supinación.\n\n### Tipos de Zapatillas\n- **Neutras**: Para corredores con pronación normal.\n- **Estabilidad**: Para corredores que sobrepronan.\n- **Control de Movimiento**: Para sobrepronadores severos.\n\n### Consideraciones Clave\n- **Amortiguación**: Desde minimalista hasta maximalista, elige según la comodidad y la superficie de carrera.\n- **Ajuste**: Deja el ancho de un pulgar de espacio entre tu dedo más largo y la punta de la zapatilla.`
    },
    image: articleImages.choosingShoes.url,
    imageAlt: articleImages.choosingShoes.alt,
    date: "August 5, 2023",
    category: {
      en: "Gear",
      es: "Equipamiento",
    },
  },
];


export const readMoreButtonContent: ReadMoreButtonText = {
  en: "Read more",
  es: "Leer más",
};

export const articlesSectionContent: ArticlesSectionContent = {
  en: {
    title: "Learn and Improve",
    subtitle: "Practical guides to take your running to the next level.",
  },
  es: {
    title: "Aprende y Mejora",
    subtitle: "Guías prácticas para llevar tu carrera al siguiente nivel.",
  },
};

export const planRequestContent = {
  es: {
    title: "Solicita tu Plan Beta Personalizado",
    subtitle: "Completa el formulario a continuación y nuestros entrenadores crearán un plan específicamente adaptado a tus necesidades y objetivos.",
  },
  en: {
    title: "Request Your Beta Personalized Plan",
    subtitle: "Complete the form below and our coaches will create a plan specifically tailored to your needs and goals.",
  },
};

export const gritStoriesContent = {
  es: {
    sectionTitle: "Historias de GRIT",
    sectionSubtitle: "El éxito no es solo llegar a la meta, es la transformación en el camino. Inspírate con quienes ya lo lograron.",
    stories: [
      {
        name: "Carlos",
        location: "Bogotá, Colombia",
        imageKey: "carlos", // Corresponds to keys in runnerImages
        achievement: "De sedentario a maratonista en 14 meses.",
        fullStory: "La historia de Carlos es un testimonio de disciplina. Pasó de un estilo de vida completamente sedentario a correr su primera maratón en solo 14 meses, demostrando que con la guía correcta, cualquier meta es alcanzable.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "5:45 min/km",
          vdot: "42",
          maxDistance: "42.2 km",
          trainingDays: "420 días",
          weeklyKm: "45 km/sem"
        },
        keyKpi: "42.2 km en 4:15"
      },
      {
        name: "Ana",
        location: "Santiago, Chile",
        imageKey: "ana",
        achievement: "Entrenó consistentemente durante 6 meses acumulando 45 km semanales.",
        fullStory: "Ana encontró en el running una herramienta poderosa para su salud mental. Canalizó su energía en el entrenamiento constante y desarrolló una disciplina admirable, acumulando 45 kilómetros semanales durante meses.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "6:20 min/km",
          vdot: "35",
          maxDistance: "21.1 km",
          trainingDays: "180 días",
          weeklyKm: "25 km/sem"
        },
        keyKpi: "45 km en total"
      },
      {
        name: "Miguel",
        location: "Ciudad de México, México",
        imageKey: "miguel",
        achievement: "3 maratones entrenando a las 4:30 AM durante 5 años.",
        fullStory: "Para Miguel, la disciplina es un estilo de vida. Durante 5 años, se ha levantado antes del amanecer para entrenar, completando tres maratones y convirtiéndose en una inspiración para toda la comunidad.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "5:15 min/km",
          vdot: "48",
          maxDistance: "42.2 km",
          trainingDays: "1,825 días",
          weeklyKm: "65 km/sem"
        },
        keyKpi: "3 maratones en 5 años"
      },
      {
        name: "Carmen",
        location: "San José, Costa Rica",
        imageKey: "carmen",
        achievement: "Empezó a correr a los 45, ahora con 52 ha completado 6 maratones.",
        fullStory: "Carmen demuestra que nunca es tarde para empezar. Inició su viaje en el running a los 45 años y, con una constancia admirable, ha completado seis maratones, rompiendo barreras de edad y estereotipos.",
        kpis: {
          pace: "6:05 min/km",
          vdot: "38",
          maxDistance: "42.2 km",
          trainingDays: "2,555 días",
          weeklyKm: "35 km/sem"
        },
        keyKpi: "6 maratones a los 52"
      },
      {
        name: "Javier",
        location: "Madrid",
        imageKey: "javier",
        achievement: "Transformó su rutina de vida a través del running después de su divorcio.",
        fullStory: "Tras un difícil divorcio en Madrid, Javier descubrió el running hace 4 meses como una forma de reconstruir su vida. El deporte le dio una nueva estructura, confianza y una comunidad que lo apoyó en cada paso de su transformación.",
        keyKpi: "4 meses corriendo"
      },
      {
        name: "María",
        location: "Medellín, Colombia",
        imageKey: "maria",
        achievement: "Madre de tres que mantuvo una racha de 4 semanas corriendo 5K diarios.",
        fullStory: "Como madre ocupada, María encontró tiempo para mantener una impresionante racha de 4 semanas corriendo 5K cada día, demostrando que la consistencia supera la intensidad cuando se trata de resultados sostenibles.",
        keyKpi: "Racha de 4 semanas"
      }
    ]
  },
  en: {
    sectionTitle: "GRIT Stories",
    sectionSubtitle: "Success isn't just reaching the finish line; it's the transformation along the way. Get inspired by those who have already achieved it.",
    stories: [
      {
        name: "Carlos",
        location: "Bogotá, Colombia",
        imageKey: "carlos",
        achievement: "From sedentary to marathoner in 14 months.",
        fullStory: "Carlos's story is a testament to discipline. He went from a completely sedentary lifestyle to running his first marathon in just 14 months, proving that with the right guidance, any goal is achievable.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "5:45 min/km",
          vdot: "42",
          maxDistance: "42.2 km",
          trainingDays: "420 days",
          weeklyKm: "45 km/week"
        },
        keyKpi: "42.2 km in 4:15"
      },
      {
        name: "Ana",
        location: "Santiago, Chile",
        imageKey: "ana",
        achievement: "Trained consistently for 6 months accumulating 45 km weekly.",
        fullStory: "Ana found in running a powerful tool for her mental health. She channeled her energy into consistent training and developed admirable discipline, accumulating 45 kilometers weekly over several months.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "6:20 min/km",
          vdot: "35",
          maxDistance: "21.1 km",
          trainingDays: "180 days",
          weeklyKm: "25 km/week"
        },
        keyKpi: "45 km in total"
      },
      {
        name: "Miguel",
        location: "Mexico City, Mexico",
        imageKey: "miguel",
        achievement: "3 marathons training at 4:30 AM for 5 years.",
        fullStory: "For Miguel, discipline is a way of life. For 5 years, he has woken up before dawn to train, completing three marathons and becoming an inspiration to the entire community.",
        blogCanonicalId: "marathon-prep",
        kpis: {
          pace: "5:15 min/km",
          vdot: "48",
          maxDistance: "42.2 km",
          trainingDays: "1,825 days",
          weeklyKm: "65 km/week"
        },
        keyKpi: "3 marathons in 5 years"
      },
      {
        name: "Carmen",
        location: "San José, Costa Rica",
        imageKey: "carmen",
        achievement: "Started running at 45, now at 52 she has completed 6 marathons.",
        fullStory: "Carmen proves that it's never too late to start. She began her running journey at 45 and, with admirable consistency, has completed six marathons, breaking age barriers and stereotypes.",
        keyKpi: "6 marathons at 52"
      },
      {
        name: "Javier",
        location: "Madrid",
        imageKey: "javier",
        achievement: "Transformed his life routine through running after his divorce.",
        fullStory: "After a difficult divorce in Madrid, Javier discovered running 4 months ago as a way to rebuild his life. The sport gave him a new structure, confidence, and a community that supported him through every step of his transformation.",
        keyKpi: "4 months running"
      },
      {
        name: "María",
        location: "Medellín, Colombia",
        imageKey: "maria",
        achievement: "Mother of three who maintained a 4-week streak of daily 5K runs.",
        fullStory: "As a busy mother, Maria found time to maintain an impressive 4-week streak of running 5K every day, proving that consistency trumps intensity when it comes to sustainable results.",
        keyKpi: "4-week streak"
      }
    ]
  }
};

export const cityCommunityContent = {
  es: {
    sectionTitle: "Encuentra tu comunidad en tu ciudad",
    sectionSubtitle: "Únete a nuestros grupos locales y corre acompañado donde quiera que estés.",
    cities: [
      { id: "1", name: "Bogotá", imageSrc: "/images/ciudades/1.png", link: "#" },
      { id: "2", name: "Ciudad de México", imageSrc: "/images/ciudades/2.png", link: "#" },
      { id: "3", name: "Santiago", imageSrc: "/images/ciudades/3.png", link: "#" },
      { id: "4", name: "Buenos Aires", imageSrc: "/images/ciudades/4.png", link: "#" },
      { id: "5", name: "Lima", imageSrc: "/images/ciudades/5.png", link: "#" },
      { id: "6", name: "Medellín", imageSrc: "/images/ciudades/6.png", link: "#" },
    ],
  },
  en: {
    sectionTitle: "Find Your Community in Your City",
    sectionSubtitle: "Join our local groups and run together wherever you are.",
    cities: [
      { id: "1", name: "Bogotá", imageSrc: "/images/ciudades/1.png", link: "#" },
      { id: "2", name: "Mexico City", imageSrc: "/images/ciudades/2.png", link: "#" },
      { id: "3", name: "Santiago", imageSrc: "/images/ciudades/3.png", link: "#" },
      { id: "4", name: "Buenos Aires", imageSrc: "/images/ciudades/4.png", link: "#" },
      { id: "5", name: "Lima", imageSrc: "/images/ciudades/5.png", link: "#" },
      { id: "6", name: "Medellín", imageSrc: "/images/ciudades/6.png", link: "#" },
    ],
  },
};


export const articles = [
  {
    id: "nutricion",
    title: "Nutrición para Corredores", // Spanish
    excerpt: "Aprende qué comer para maximizar tu energía y recuperación.", // Spanish
    imageUrl: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // Nutrición para Corredores
    content: <p>Contenido completo sobre nutrición para corredores, incluyendo qué comer antes, durante y después de correr...</p>, // Spanish
  },
  {
    id: "zapatillas",
    title: "Cómo Elegir Zapatillas de Running", // Spanish
    excerpt: "Guía para encontrar el calzado perfecto y prevenir lesiones.", // Spanish
    image: 'https://images.unsplash.com/photo-1517488629431-1a288ab085c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Cómo Elegir Zapatillas de Running
    content: <p>Guía detallada sobre tipos de pisada, características de zapatillas y cómo elegir las adecuadas para ti...</p>, // Spanish
  },
  {
    id: "plan-maraton",
    title: "Crea tu Plan de Maratón", // Spanish
    excerpt: "Componentes clave de un plan exitoso, de la base al 'tapering'.", // Spanish
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80', // Crea tu Plan de Maratón
    content: <p>Descubre los elementos esenciales para un plan de maratón: kilometraje, días de descanso, 'tapering' y más...</p>, // Spanish
  },
];

export const trainingPlans = [
  {
    id: "5k-plan",
    title: {
      es: "Plan de 5K: Tu Primera Carrera",
      en: "5K Plan: Your First Race"
    },
    description: {
      es: "Perfecto para principiantes. Te lleva de cero a correr 5K en 8 semanas.",
      en: "Perfect for beginners. Takes you from zero to running 5K in 8 weeks."
    },
    duration: {
      es: "8 semanas",
      en: "8 weeks"
    },
    difficulty: "Beginner" as const,
    pdfUrl: "/plans/Andes_Runners_5K_Plan_Principiante.pdf",
    isLeadMagnet: true,
  },
  {
    id: "10k-plan",
    title: {
      es: "Plan de 10K: Supera la Distancia",
      en: "10K Plan: Go the Distance"
    },
    description: {
      es: "Ideal si ya corres 5K. Mejora tu resistencia para conquistar los 10K.",
      en: "Ideal if you already run 5K. Improve your endurance to conquer 10K."
    },
    duration: {
      es: "10 semanas",
      en: "10 weeks"
    },
    difficulty: "Intermediate" as const,
    pdfUrl: "/plans/Andes_Runners_10K_Plan_Intermedio.pdf",
    isLeadMagnet: false,
  },
  {
    id: "21k-plan",
    title: {
      es: "Plan de 21K: Media Maratón",
      en: "21K Plan: Half Marathon"
    },
    description: {
      es: "Un plan completo para prepararte para tu primera media maratón.",
      en: "A complete plan to prepare for your first half marathon."
    },
    duration: {
      es: "12 semanas",
      en: "12 weeks"
    },
    difficulty: "Intermediate" as const,
    pdfUrl: "/plans/Andes_Runners_21K_Plan_Intermedio.pdf",
    isLeadMagnet: false,
  },
  {
    id: "marathon-plan",
    title: {
      es: "Plan de Maratón: Tu Gran Reto",
      en: "Marathon Plan: Your Big Challenge"
    },
    description: {
      es: "Prepárate para conquistar los 42K con un plan diseñado para el éxito.",
      en: "Prepare to conquer 42K with a plan designed for success."
    },
    duration: {
      es: "16 semanas",
      en: "16 weeks"
    },
    difficulty: "Advanced" as const,
    pdfUrl: "#",
    isUnderConstruction: true,
  },
];

// Ambassadors Page (/embajadores) — pivote club de experiencia Pamplona
export const ambassadorsContent = {
  es: {
    seo: {
      title: "Embajadoras Andes — Lidera el club de running de tu ciudad",
      description:
        "Buscamos embajadoras en Pamplona que quieran que más mujeres se enamoren de correr. Premium gratis, eventos y comunidad. Aplica en 1 minuto por WhatsApp.",
    },
    hero: {
      preheading: "Programa de embajadoras · Pamplona",
      headlineLead: "Corre con nosotras.",
      headlineAccent: "Lidera tu ciudad.",
      description:
        "Andes es el club que ayuda a mujeres a enamorarse de correr: quedadas, coffee runs y una coach por WhatsApp que te acompaña entre evento y evento. Buscamos a las primeras 5 embajadoras fundadoras de Pamplona.",
      ctaText: "Quiero ser embajadora",
      ctaNote: "Aplicas por WhatsApp · Respuesta en 24h",
    },
    whatIs: {
      title: "Qué hace una embajadora",
      items: [
        {
          title: "Co-organiza las quedadas",
          description: "Coffee runs y carreras suaves los jueves, con cafés y espacios aliados de Pamplona. Nosotros ponemos la logística; tú, la energía.",
        },
        {
          title: "Es el rostro local del club",
          description: "Recibe a las que llegan por primera vez y haz que nadie corra sola. Tu historia inspira a las que aún no se atreven.",
        },
        {
          title: "Crea contenido con apoyo",
          description: "Reels y fotos de los eventos con el kit y las ideas que te damos. Tú eliges cuánto y cómo.",
        },
      ],
    },
    benefits: {
      title: "Lo que recibes",
      items: [
        { title: "Premium gratis", description: "Coach completo por WhatsApp mientras seas embajadora." },
        { title: "Eventos con +1", description: "Acceso prioritario a todas las quedadas y experiencias, con invitación para una amiga." },
        { title: "Visibilidad", description: "Presencia en las redes de Andes y co-creación de contenido con el club." },
        { title: "Programa de referidas", description: "Próximamente: recompensas por cada corredora que se una gracias a ti." },
      ],
    },
    howItWorks: {
      title: "Cómo funciona",
      steps: [
        { title: "Aplica por WhatsApp", description: "Un mensaje. Sin formularios eternos." },
        { title: "Charla de 15 minutos", description: "Nos conocemos y te contamos el plan de Pamplona." },
        { title: "Tu primera quedada", description: "Co-organizas tu primer evento con todo nuestro apoyo." },
      ],
    },
    socialProof: {
      title: "Sé fundadora",
      description:
        "El club está naciendo en Pamplona. Las primeras 5 embajadoras definen la cultura: accesible, aspiracional y de cero juicio. Ese lugar en la historia no se repite.",
    },
    faq: {
      title: "Preguntas rápidas",
      items: [
        {
          question: "¿Necesito ser rápida o experta?",
          answer: "No. Necesitas haber pasado por empezar. Si sabes lo que cuesta el primer kilómetro, sabes acompañar a otra que lo está viviendo.",
        },
        {
          question: "¿Cuánto tiempo requiere?",
          answer: "Unas 2 horas por semana: la quedada y un poco de contenido. Tú marcas el ritmo.",
        },
        {
          question: "¿Me pagan?",
          answer: "Hoy: Premium gratis, eventos y visibilidad. Pronto: programa de referidas con recompensas por cada corredora que traigas.",
        },
      ],
    },
    finalCta: {
      title: "Pamplona está a una embajadora de distancia.",
      subtitle: "Si quieres que más mujeres se enamoren de correr, esa embajadora eres tú.",
      ctaText: "Aplicar por WhatsApp",
    },
  },
  en: {
    seo: {
      title: "Andes Ambassadors — Lead your city's running club",
      description:
        "We're looking for ambassadors who want more women to fall in love with running. Free Premium, events and community. Apply in 1 minute on WhatsApp.",
    },
    hero: {
      preheading: "Ambassador program · Pamplona",
      headlineLead: "Run with us.",
      headlineAccent: "Lead your city.",
      description:
        "Andes is the club helping women fall in love with running: meetups, coffee runs and a WhatsApp coach between events. We're looking for our first 5 founding ambassadors in Pamplona.",
      ctaText: "I want to be an ambassador",
      ctaNote: "Apply on WhatsApp · Reply within 24h",
    },
    whatIs: {
      title: "What an ambassador does",
      items: [
        { title: "Co-hosts the meetups", description: "Coffee runs and easy-pace Thursday runs with partner cafés. We bring the logistics; you bring the energy." },
        { title: "Is the club's local face", description: "Welcome first-timers so nobody runs alone. Your story inspires those who haven't dared yet." },
        { title: "Creates content with support", description: "Reels and photos from events, with our kit and ideas. You choose how much and how." },
      ],
    },
    benefits: {
      title: "What you get",
      items: [
        { title: "Free Premium", description: "Full WhatsApp coach while you're an ambassador." },
        { title: "Events with a +1", description: "Priority access to every meetup and experience, with an invite for a friend." },
        { title: "Visibility", description: "Presence on Andes channels and content co-created with the club." },
        { title: "Referral program", description: "Coming soon: rewards for every runner who joins thanks to you." },
      ],
    },
    howItWorks: {
      title: "How it works",
      steps: [
        { title: "Apply on WhatsApp", description: "One message. No endless forms." },
        { title: "15-minute chat", description: "We meet and share the Pamplona plan." },
        { title: "Your first meetup", description: "Co-host your first event with our full support." },
      ],
    },
    socialProof: {
      title: "Be a founder",
      description:
        "The club is being born in Pamplona. The first 5 ambassadors define its culture: accessible, aspirational, zero judgment. That place in the story doesn't repeat.",
    },
    faq: {
      title: "Quick questions",
      items: [
        { question: "Do I need to be fast or experienced?", answer: "No. You need to have gone through starting. If you know what the first kilometer costs, you know how to support someone living it." },
        { question: "How much time does it take?", answer: "About 2 hours a week: the meetup plus some content. You set the pace." },
        { question: "Do I get paid?", answer: "Today: free Premium, events and visibility. Soon: a referral program with rewards for every runner you bring." },
      ],
    },
    finalCta: {
      title: "Pamplona is one ambassador away.",
      subtitle: "If you want more women to fall in love with running, that ambassador is you.",
      ctaText: "Apply on WhatsApp",
    },
  },
};

// Club Section (home) — pivote club de experiencia Pamplona
export const clubContent = {
  es: {
    preheading: "Más que una app",
    title: "Un club que te espera en Pamplona",
    description:
      "Coffee runs, quedadas a ritmo de conversación y gente que también está empezando. La coach te acompaña entre semana; el club te espera el jueves.",
    features: [
      { title: "Quedadas los jueves", description: "Rutas suaves de 3–4 km con café al final, en espacios aliados de la ciudad." },
      { title: "Cero juicio", description: "Ritmo de conversación. Nadie se queda atrás, nadie corre sola." },
      { title: "Tu coach entre evento y evento", description: "La misma coach de WhatsApp sabe a qué quedada fuiste y qué toca después." },
    ],
    image: {
      src: "/images/club/quedada.webp",
      alt: "Grupo de corredoras charlando y sonriendo durante una quedada al amanecer",
    },
    ctaText: "Únete al club por WhatsApp",
    ambassadorLinkText: "¿Quieres liderarlo? Hazte embajadora →",
  },
  en: {
    preheading: "More than an app",
    title: "A club waiting for you in Pamplona",
    description:
      "Coffee runs, conversation-pace meetups and people who are also just starting. Your coach walks with you during the week; the club waits for you on Thursday.",
    features: [
      { title: "Thursday meetups", description: "Easy 3–4 km routes ending in coffee, at partner spots around the city." },
      { title: "Zero judgment", description: "Conversation pace. Nobody gets left behind, nobody runs alone." },
      { title: "Your coach between events", description: "The same WhatsApp coach knows which meetup you joined and what comes next." },
    ],
    image: {
      src: "/images/club/quedada.webp",
      alt: "Group of women runners chatting and smiling during a sunrise meetup",
    },
    ctaText: "Join the club on WhatsApp",
    ambassadorLinkText: "Want to lead it? Become an ambassador →",
  },
};
