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
    description: "Quedadas que se sienten como un plan con amigos y una coach en WhatsApp que se adapta a ti. Tu primera carrera, sin miedo y sin lesiones.",
    ctaPrimaryText: "Empezar Gratis por WhatsApp",
    ctaSecondaryText: "Conoce el club",
    limitNotice: "15 días Pro gratis · Sin tarjeta · Sin bloqueo",
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
    limitNotice: "15 days of Pro free · No card · No lockout",
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

// "Tu primera semana con Andes" — sección experiencial de la home (sustituye al chat demo).
// Cada día revela un atributo; el jueves (club) es el clímax. Casual-first: minutos y sensación.
// Los videos se generan en andes/andes-launch-video (npm run render:landing) → /videos/week/{id}-{lang}.*
export type WeekDayId = "mon" | "tue" | "wed" | "thu" | "sun";

export interface WeekDay {
  id: WeekDayId;
  day: string;
  title: string;
  body: string;
  attribute: string;
  videoAlt: string;
  isClub?: boolean;
}

export const weekStoryContent: Record<"es" | "en", {
  preheading: string;
  sectionTitle: string;
  sectionSubtitle: string;
  clubBadge: string;
  clubCta: string;
  days: WeekDay[];
}> = {
  es: {
    preheading: "Así se siente empezar",
    sectionTitle: "Tu primera semana con Andes",
    sectionSubtitle: "Un coach en tu WhatsApp entre semana. Un club que te espera el jueves.",
    clubBadge: "El corazón de Andes",
    clubCta: "Quiero ir a la próxima quedada",
    days: [
      {
        id: "mon",
        day: "Lunes",
        title: "Escribes “quiero empezar”. Tu plan llega en 60 segundos.",
        body: "Tres preguntas y listo: caminar y trotar a tu ritmo, sin descargar nada. La quedada del jueves ya viene en tu semana.",
        attribute: "Solo WhatsApp",
        videoAlt: "Chat de WhatsApp donde Andes crea un plan de primera semana con la quedada del club incluida",
      },
      {
        id: "tue",
        day: "Martes",
        title: "Cuentas cómo te fue con un mensaje. Nada de formularios.",
        body: "“Hoy 20 min, me costó” basta. Tu coach lo registra, lo recuerda y ajusta lo que viene.",
        attribute: "Un coach que recuerda",
        videoAlt: "Mensaje de WhatsApp que se convierte en un entreno registrado con tiempo y sensación",
      },
      {
        id: "wed",
        day: "Miércoles",
        title: "¿Te molesta algo? El plan se mueve contigo.",
        body: "Bajas la carga antes de que la molestia sea lesión. Sin culpa, sin empezar de cero.",
        attribute: "Prevención, no reacción",
        videoAlt: "El coach ajusta el entreno del jueves tras una molestia en la rodilla",
      },
      {
        id: "thu",
        day: "Jueves",
        title: "Corres con gente que también está empezando.",
        body: "Quedada suave a ritmo de conversación y café al final. Aquí es donde correr deja de ser una obligación y pasa a ser tu plan de la semana.",
        attribute: "Nadie corre solo",
        videoAlt: "Miembros del club Andes en una quedada en Pamplona",
        isClub: true,
      },
      {
        id: "sun",
        day: "Domingo",
        title: "Miras atrás y ves tu primera semana hecha.",
        body: "Resumen de tu semana, tu racha y la semana 2 lista. El hábito se ve, y eso engancha.",
        attribute: "Progreso que se nota",
        videoAlt: "Resumen semanal con salidas, minutos y quedada completadas",
      },
    ],
  },
  en: {
    preheading: "What starting feels like",
    sectionTitle: "Your first week with Andes",
    sectionSubtitle: "A coach in your WhatsApp during the week. A club waiting for you on Thursday.",
    clubBadge: "The heart of Andes",
    clubCta: "Save me a spot at the next meetup",
    days: [
      {
        id: "mon",
        day: "Monday",
        title: "You text “I want to start”. Your plan arrives in 60 seconds.",
        body: "Three questions and you're set: walk and jog at your pace, nothing to download. Thursday's meetup is already in your week.",
        attribute: "Just WhatsApp",
        videoAlt: "WhatsApp chat where Andes builds a first-week plan including the club meetup",
      },
      {
        id: "tue",
        day: "Tuesday",
        title: "You tell it how it went in one message. No forms.",
        body: "“20 min today, it was tough” is enough. Your coach logs it, remembers it and adjusts what comes next.",
        attribute: "A coach that remembers",
        videoAlt: "A WhatsApp message turning into a logged session with time and feeling",
      },
      {
        id: "wed",
        day: "Wednesday",
        title: "Something feels off? The plan moves with you.",
        body: "Load goes down before a niggle becomes an injury. No guilt, no starting over.",
        attribute: "Prevention, not reaction",
        videoAlt: "The coach adjusts Thursday's session after a knee niggle",
      },
      {
        id: "thu",
        day: "Thursday",
        title: "You run with people who are also just starting.",
        body: "An easy, conversation-pace meetup with coffee at the end. This is where running stops being a chore and becomes the plan you look forward to.",
        attribute: "Nobody runs alone",
        videoAlt: "Andes club members at a meetup in Pamplona",
        isClub: true,
      },
      {
        id: "sun",
        day: "Sunday",
        title: "You look back and see your first week done.",
        body: "A recap of your week, your streak and week 2 ready. You can see the habit forming — and that's what keeps you going.",
        attribute: "Progress you can see",
        videoAlt: "Weekly recap with runs, minutes and meetup completed",
      },
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

// Stats de la home (fila bajo "Tu primera semana"). La parte de prevención vive ahora en el miércoles de weekStoryContent.
export const indicatorsContent = {
  es: {
    stats: [
      { value: "15 días", label: "De Pro gratis al empezar" },
      { value: "60 seg", label: "Para tu primer plan" },
      { value: "24/7", label: "Tu coach siempre disponible" },
      { value: "€0", label: "Para empezar, sin tarjeta" },
    ],
  },
  en: {
    stats: [
      { value: "15 days", label: "Of full Pro when you start" },
      { value: "60 sec", label: "To your first plan" },
      { value: "24/7", label: "Your coach, always available" },
      { value: "€0", label: "To start, no card needed" },
    ],
  },
};

// Voces del club — SOLO frases reales de miembros con consentimiento registrado
// (ver docs/content-engine-club-2026-10.md). Mientras la lista esté vacía, la sección no se muestra.
// Formato: { quote, author: nombre de pila, detail: "Miembro fundador · Pamplona", photo?: "/images/club/voces/<nombre>.webp" }
export interface ClubVoice {
  quote: string;
  author: string;
  detail: string;
  photo?: string;
}

export const clubVoicesContent: Record<"es" | "en", { preheading: string; sectionTitle: string; voices: ClubVoice[] }> = {
  es: {
    preheading: "Miembros fundadores",
    sectionTitle: "Voces del club",
    voices: [],
  },
  en: {
    preheading: "Founding members",
    sectionTitle: "Voices from the club",
    voices: [],
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
    sectionTitle: "Free vs Pro, sin letra pequeña",
    sectionSubtitle: "Empieza gratis hoy y mejora cuando quieras.",
    competitiveAnchor: "",
    limitNote: "Empiezas con 15 días de Pro gratis. Después sigues gratis en modo Lite (sin bloqueo).",
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
        description: "Empiezas con 15 días de Pro completo. Después, Andes sigue funcionando gratis en modo Lite, sin bloqueo.",
        features: [
          "15 días de Pro gratis al empezar.",
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
        imageAlt: "Persona corriendo junto a un lago al amanecer",
      },
      {
        name: "Pro",
        iconName: "Zap",
        price: "€9,99",
        priceDetail: "/mes",
        annualPrice: "€8,33",
        annualPriceDetail: "/mes (facturado anual)",
        savingsPercentage: "Ahorra 17%",
        popularBadge: "MÁS ELEGIDO",
        description: "Desbloquea templates proactivos y seguimiento personalizado para acelerar resultados.",
        features: [
          "Recordatorios automáticos de entrenamiento.",
          "Seguimiento semanal personalizado.",
          "Detección de inactividad y reactivación.",
          "Medallas de progreso y countdown de carrera.",
          "Mayor personalización por contexto y objetivo.",
        ],
        ctaText: "Desbloquear Pro",
        ctaDisclaimer: "Cancela cuando quieras",
        guarantee: "30 días de garantía · Devolvemos tu dinero si no ves resultados",
        isPopular: true,
        buttonVariant: "primary",
        image: "/pro_es.png",
        imageAlt: "Persona corriendo por un bosque en carrera",
      },
    ],
  },
  en: {
    sectionTitle: "Free vs Pro, no surprises",
    sectionSubtitle: "Start free today and upgrade when you want.",
    competitiveAnchor: "",
    limitNote: "You start with 15 days of Pro free. After that, you stay free in Lite mode (no lockout).",
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
        description: "You start with 15 days of full Pro. After that, Andes keeps working free in Lite mode, with no lockout.",
        features: [
          "15 days of Pro free when you start.",
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
        name: "Pro",
        iconName: "Zap",
        price: "€9.99",
        priceDetail: "/month",
        annualPrice: "€8.33",
        annualPriceDetail: "/month (billed annually)",
        savingsPercentage: "Save 17%",
        popularBadge: "MOST CHOSEN",
        description: "Unlock proactive templates and personalized follow-up to accelerate progress.",
        features: [
          "Proactive training reminders.",
          "Personalized weekly follow-up.",
          "Inactivity detection and re-engagement.",
          "Progress medals and race countdown.",
          "Deeper context-aware personalization.",
        ],
        ctaText: "Unlock Pro",
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
        question: "¿Tengo que estar en forma para empezar?",
        answer: "No. Andes existe justo para lo contrario: para que empieces desde cero, a tu ritmo. Las quedadas del club son a ritmo de conversación y tu plan puede empezar con caminatas. Nadie te va a dejar atrás.",
      },
      {
        question: "¿Es realmente gratis? ¿Cuál es la trampa?",
        answer: "No hay trampa. Empiezas con 15 días de Pro completo gratis, sin tarjeta. Después sigues gratis: 30 mensajes inteligentes y luego modo Lite sin bloqueo. Pro (€9,99/mes) mantiene los recordatorios proactivos y el seguimiento personalizado, pero nunca te quedarás sin coach.",
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
        question: "¿Puedo cancelar Pro cuando quiera?",
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
        answer: "No catch. You start with 15 days of full Pro free, no card needed. After that you stay free: 30 smart messages, then Lite mode with no lockout. Pro (€9.99/month) keeps proactive reminders and personalized follow-up, but you'll never lose your coach.",
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
        question: "Can I cancel Pro anytime?",
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
    secondaryLinkText: "Ver planes Pro →",
  },
  en: {
    title: "Your first race starts with a message.",
    subtitle: "No download. No card. No lockout. Just open WhatsApp.",
    buttonText: "Start Free on WhatsApp",
    secondaryLinkText: "See Pro plans →",
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
      title: "Embajadores Andes — Lidera el club de running de tu ciudad",
      description:
        "Buscamos embajadores en Pamplona que quieran que más gente se enamore de correr. Pro gratis, eventos y comunidad. Aplica en 1 minuto por WhatsApp.",
    },
    hero: {
      preheading: "Programa de embajadores · Pamplona",
      headlineLead: "Corramos juntos.",
      headlineAccent: "Lidera tu ciudad.",
      description:
        "Andes es el club que ayuda a la gente a enamorarse de correr: quedadas, coffee runs y una coach por WhatsApp que te acompaña entre evento y evento. Buscamos a los primeros 5 embajadores fundadores de Pamplona.",
      ctaText: "Quiero ser embajador",
      ctaNote: "Aplicas por WhatsApp · Respuesta en 24h",
    },
    manifesto: "Lidera tu ciudad.",
    stats: [
      { value: "5", label: "Fundadores en Pamplona" },
      { value: "2h", label: "Por semana" },
      { value: "24h", label: "Respuesta por WhatsApp" },
      { value: "100%", label: "Coach incluido" },
    ],
    whatIs: {
      title: "Qué hace un embajador",
      items: [
        {
          title: "Co-organiza las quedadas",
          description: "Coffee runs y carreras suaves los jueves, con cafés y espacios aliados de Pamplona. Nosotros ponemos la logística; tú, la energía.",
        },
        {
          title: "Es el rostro local del club",
          description: "Recibe a quienes llegan por primera vez y haz que nadie corra solo. Tu historia inspira a quienes aún no se atreven.",
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
        { title: "Pro gratis", description: "Coach completo por WhatsApp mientras seas embajador." },
        { title: "Eventos con +1", description: "Acceso prioritario a todas las quedadas y experiencias, con invitación para un amigo." },
        { title: "Visibilidad", description: "Presencia en las redes de Andes y co-creación de contenido con el club." },
        { title: "Programa de referidos", description: "Próximamente: recompensas por cada persona que se una gracias a ti." },
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
      title: "Sé fundador",
      description:
        "El club está naciendo en Pamplona. Los primeros 5 embajadores definen la cultura: accesible, aspiracional y de cero juicio. Ese lugar en la historia no se repite.",
    },
    faq: {
      title: "Preguntas rápidas",
      items: [
        {
          question: "¿Necesito tener experiencia o ser rápido?",
          answer: "No. Necesitas haber pasado por empezar. Si sabes lo que cuesta el primer kilómetro, sabes acompañar a alguien que lo está viviendo.",
        },
        {
          question: "¿Cuánto tiempo requiere?",
          answer: "Unas 2 horas por semana: la quedada y un poco de contenido. Tú marcas el ritmo.",
        },
        {
          question: "¿Me pagan?",
          answer: "Hoy: Pro gratis, eventos y visibilidad. Pronto: programa de referidos con recompensas por cada persona que traigas.",
        },
      ],
    },
    finalCta: {
      title: "Pamplona está a un embajador de distancia.",
      subtitle: "Si quieres que más gente se enamore de correr, ese embajador eres tú.",
      ctaText: "Aplicar por WhatsApp",
    },
  },
  en: {
    seo: {
      title: "Andes Ambassadors — Lead your city's running club",
      description:
        "We're looking for ambassadors who want more people to fall in love with running. Free Pro, events and community. Apply in 1 minute on WhatsApp.",
    },
    hero: {
      preheading: "Ambassador program · Pamplona",
      headlineLead: "Run with us.",
      headlineAccent: "Lead your city.",
      description:
        "Andes is the club helping people fall in love with running: meetups, coffee runs and a WhatsApp coach between events. We're looking for our first 5 founding ambassadors in Pamplona.",
      ctaText: "I want to be an ambassador",
      ctaNote: "Apply on WhatsApp · Reply within 24h",
    },
    manifesto: "Lead your city.",
    stats: [
      { value: "5", label: "Founders in Pamplona" },
      { value: "2h", label: "Per week" },
      { value: "24h", label: "Reply on WhatsApp" },
      { value: "100%", label: "Coach included" },
    ],
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
        { title: "Free Pro", description: "Full WhatsApp coach while you're an ambassador." },
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
        { question: "Do I get paid?", answer: "Today: free Pro, events and visibility. Soon: a referral program with rewards for every runner you bring." },
      ],
    },
    finalCta: {
      title: "Pamplona is one ambassador away.",
      subtitle: "If you want more people to fall in love with running, that ambassador is you.",
      ctaText: "Apply on WhatsApp",
    },
  },
};

// Página de ciudad (producto local). Audiencia: corredor casual de Pamplona
// que quiere empezar con el club + la coach. Distinta de ambassadorsContent
// (que recluta líderes). El idioma es ortogonal a la ciudad: /pamplona (en) y /es/pamplona (es).
export const pamplonaContent = {
  es: {
    seo: {
      title: "Andes Pamplona — Empieza a correr con tu club y tu coach",
      description:
        "El club de running de Pamplona para empezar desde cero: quedadas a ritmo de conversación y una coach por WhatsApp que se adapta a ti. Empieza gratis, sin tarjeta.",
    },
    hero: {
      badge: "Pamplona",
      preheading: "Tu club de running · Pamplona",
      headlineLead: "Enamórate de correr",
      headlineAccent: "en dos semanas.",
      description:
        "En Pamplona no corres solo. Quedadas a ritmo de conversación y una coach por WhatsApp que empieza donde estás tú —aunque hoy sea caminar. Sin presión, sin juicio.",
      ctaText: "Empezar gratis",
      ctaNote: "Gratis · Sin tarjeta · Por WhatsApp",
    },
    stats: [
      { value: "2 semanas", label: "Para enamorarte de correr" },
      { value: "15 días", label: "De Pro gratis al empezar" },
      { value: "€0", label: "Para empezar, sin tarjeta" },
      { value: "24/7", label: "Tu coach en WhatsApp" },
    ],
    value: {
      title: "No necesitas ser corredor. Solo empezar.",
      items: [
        {
          title: "Empieza donde estás",
          description: "Tu plan puede arrancar caminando. Andes se adapta a tu nivel, tu objetivo y tu semana real. Nada de ritmos imposibles.",
        },
        {
          title: "Una coach que te escucha",
          description: "Le cuentas cómo te sentiste y ajusta el plan cada día. Si te duele algo o dormiste mal, baja la carga. Es un coach, no un PDF.",
        },
        {
          title: "El club te espera el jueves",
          description: "Coffee runs y quedadas por Pamplona con gente que también está empezando. La coach entre semana; el club, en la calle.",
        },
      ],
    },
    howItWorks: {
      title: "Cómo empiezas",
      steps: [
        { title: "Escribe por WhatsApp", description: "Un mensaje y listo. Sin apps que descargar ni formularios eternos." },
        { title: "Tu primera semana", description: "Andes te pregunta por qué corres y arma tu plan. Empiezas hoy mismo, a tu ritmo." },
        { title: "Corre con el club", description: "Te sumas a la próxima quedada en Pamplona. Nadie se queda atrás." },
      ],
    },
    club: {
      title: "Un club que te espera en Pamplona",
      description:
        "Andes nació para que la gente normal se enamore de correr. Quedadas a ritmo de conversación, cafés aliados y una comunidad de cero juicio. Empezar es más fácil acompañado.",
      imageAlt: "Grupo del club Andes en una quedada en Pamplona",
    },
    pricing: {
      title: "Empieza gratis. Pro cuando quieras.",
      subtitle: "Empiezas con 15 días de Pro completo, sin tarjeta. Después sigues gratis en modo Lite, sin bloqueo.",
      freeTitle: "Gratis",
      freeDescription: "Tu plan base y la coach por WhatsApp, siempre funcional. Ideal para tu primer 5K.",
      premiumTitle: "Pro",
      premiumPrice: "€9,99",
      premiumDetail: "/mes",
      premiumDescription: "Recordatorios proactivos, seguimiento semanal y medallas de progreso para no soltar el hábito.",
      note: "Empiezas con 15 días de Pro gratis, sin tarjeta.",
      ctaText: "Empezar gratis",
    },
    ambassadorCta: {
      title: "¿Y si lideras el club?",
      description: "Si quieres que más gente de Pamplona se enamore de correr, conviértete en embajador fundador.",
      linkText: "Conoce el programa de embajadores →",
    },
    faq: {
      title: "Preguntas rápidas",
      items: [
        { question: "¿Tengo que estar en forma?", answer: "No. Andes existe para lo contrario: empezar desde cero, a tu ritmo. Las quedadas son a ritmo de conversación y tu plan puede empezar caminando." },
        { question: "¿Es de verdad gratis?", answer: "Sí. Empiezas con 15 días de Pro completo, sin tarjeta. Después sigues gratis en modo Lite, sin bloqueo. Pro (€9,99/mes) es opcional." },
        { question: "¿Dónde son las quedadas?", answer: "En Pamplona, con cafés y espacios aliados. Te avisamos por WhatsApp de la próxima en cuanto te sumes." },
      ],
    },
    finalCta: {
      title: "Pamplona corre. Súmate.",
      subtitle: "Tu primera carrera empieza con un mensaje.",
      ctaText: "Empezar gratis por WhatsApp",
      ctaNote: "Gratis · Sin tarjeta",
    },
  },
  en: {
    seo: {
      title: "Andes Pamplona — Start running with your club and your coach",
      description:
        "Pamplona's running club to start from zero: conversation-pace meetups and a WhatsApp coach that adapts to you. Start free, no card needed.",
    },
    hero: {
      badge: "Pamplona",
      preheading: "Your running club · Pamplona",
      headlineLead: "Fall in love with running",
      headlineAccent: "in two weeks.",
      description:
        "In Pamplona you don't run alone. Conversation-pace meetups and a WhatsApp coach that starts where you are —even if today that means walking. No pressure, no judgment.",
      ctaText: "Start free",
      ctaNote: "Free · No card · On WhatsApp",
    },
    stats: [
      { value: "2 weeks", label: "To fall in love with running" },
      { value: "15 days", label: "Of Pro free when you start" },
      { value: "€0", label: "To start, no card needed" },
      { value: "24/7", label: "Your coach on WhatsApp" },
    ],
    value: {
      title: "You don't need to be a runner. Just start.",
      items: [
        {
          title: "Start where you are",
          description: "Your plan can start with walking. Andes adapts to your level, your goal and your real week. No impossible paces.",
        },
        {
          title: "A coach that listens",
          description: "Tell it how you felt and it adjusts the plan every day. Sore or slept badly? It eases the load. It's a coach, not a PDF.",
        },
        {
          title: "The club waits on Thursday",
          description: "Coffee runs and meetups around Pamplona with people also starting out. The coach midweek; the club, on the street.",
        },
      ],
    },
    howItWorks: {
      title: "How you start",
      steps: [
        { title: "Message on WhatsApp", description: "One message and you're in. No apps to download, no endless forms." },
        { title: "Your first week", description: "Andes asks why you run and builds your plan. You start today, at your pace." },
        { title: "Run with the club", description: "Join the next meetup in Pamplona. Nobody gets left behind." },
      ],
    },
    club: {
      title: "A club that waits for you in Pamplona",
      description:
        "Andes was born so everyday people fall in love with running. Conversation-pace meetups, partner cafés and a zero-judgment community. Starting is easier together.",
      imageAlt: "Andes club group during a Pamplona meetup",
    },
    pricing: {
      title: "Start free. Pro when you want.",
      subtitle: "You start with 15 days of full Pro, no card. After that you stay free in Lite mode, no lockout.",
      freeTitle: "Free",
      freeDescription: "Your base plan and the WhatsApp coach, always functional. Ideal for your first 5K.",
      premiumTitle: "Pro",
      premiumPrice: "€9.99",
      premiumDetail: "/month",
      premiumDescription: "Proactive reminders, weekly follow-up and progress medals so you keep the habit.",
      note: "You start with 15 days of Pro free, no card needed.",
      ctaText: "Start free",
    },
    ambassadorCta: {
      title: "What if you led the club?",
      description: "If you want more people in Pamplona to fall in love with running, become a founding ambassador.",
      linkText: "See the ambassador program →",
    },
    faq: {
      title: "Quick questions",
      items: [
        { question: "Do I need to be fit?", answer: "No. Andes exists for the opposite: to start from zero, at your pace. Meetups are conversation-pace and your plan can start with walking." },
        { question: "Is it really free?", answer: "Yes. You start with 15 days of full Pro, no card. After that you stay free in Lite mode, no lockout. Pro (€9.99/month) is optional." },
        { question: "Where are the meetups?", answer: "In Pamplona, with partner cafés and spaces. We'll message you the next one on WhatsApp as soon as you join." },
      ],
    },
    finalCta: {
      title: "Pamplona runs. Join in.",
      subtitle: "Your first run starts with a message.",
      ctaText: "Start free on WhatsApp",
      ctaNote: "Free · No card",
    },
  },
};

// Club Section (home) — la comunidad como motor: "los primeros de Pamplona"
// Imagen: sustituir quedada.webp (stock) por la foto real del grupo en cuanto haya consentimiento.
export const clubContent = {
  es: {
    preheading: "Los primeros de Pamplona",
    title: "Un club que se está formando. Todavía puedes ser de los primeros.",
    description:
      "Somos un grupo pequeño que empezó a correr junto: quedadas los jueves a ritmo de conversación y café al final. La coach te acompaña entre semana; el club te espera el jueves.",
    features: [
      { title: "Quedadas los jueves", description: "Rutas suaves de 3–4 km con café al final, en espacios aliados de la ciudad." },
      { title: "Cero juicio", description: "Ritmo de conversación. Nadie se queda atrás, nadie corre solo." },
      { title: "Tu coach entre evento y evento", description: "La misma coach de WhatsApp sabe a qué quedada fuiste y qué toca después." },
    ],
    image: {
      src: "/images/club/quedada.webp",
      alt: "Grupo corriendo y charlando durante una quedada",
    },
    ctaText: "Únete al club por WhatsApp",
    ambassadorLinkText: "¿Quieres liderarlo? Hazte embajador →",
    cityRequest: {
      text: "¿No estás en Pamplona?",
      linkText: "Pide Andes en tu ciudad →",
    },
  },
  en: {
    preheading: "The first ones in Pamplona",
    title: "A club in the making. You can still be one of the first.",
    description:
      "We're a small group that started running together: Thursday meetups at conversation pace, coffee at the end. Your coach walks with you during the week; the club waits for you on Thursday.",
    features: [
      { title: "Thursday meetups", description: "Easy 3–4 km routes ending in coffee, at partner spots around the city." },
      { title: "Zero judgment", description: "Conversation pace. Nobody gets left behind, nobody runs alone." },
      { title: "Your coach between events", description: "The same WhatsApp coach knows which meetup you joined and what comes next." },
    ],
    image: {
      src: "/images/club/quedada.webp",
      alt: "Group of runners chatting during a meetup",
    },
    ctaText: "Join the club on WhatsApp",
    ambassadorLinkText: "Want to lead it? Become an ambassador →",
    cityRequest: {
      text: "Not in Pamplona?",
      linkText: "Ask for Andes in your city →",
    },
  },
};
