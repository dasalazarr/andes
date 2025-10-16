import React from 'react';
import { FaBullseye, FaChalkboardTeacher, FaUsers, FaBrain, FaShieldAlt, FaMedal, FaWhatsapp, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { articleImages } from '../config/images';

// Article and Plan Data

export const heroContent = {
  es: {
    preheading: "Coaching inteligente 24/7",
    headline: {
      variantA: {
        lead: "Conquista tu primera maratón",
        accent: "sin lesiones",
      },
      variantB: {
        lead: "Conquista tu primera maratón",
        accent: "sin lesiones",
      },
    },
    description: "Tu coach inteligente está siempre en WhatsApp para ajustar tu plan minuto a minuto y mantenerte motivado hasta la meta.",
    ctaPrimaryText: 'Empieza en WhatsApp',
    ctaSecondaryText: "Quiero mi plan gratis",
    keyBenefits: "Planes 100% personalizados • Feedback inmediato • Motivación diaria",
    videoSrc: '/videos/video3', // Extension will be handled in component
  },
  en: {
    preheading: "Always-on smart coaching",
    headline: {
      variantA: {
        lead: "Crush your first marathon",
        accent: "injury-free",
      },
      variantB: {
        lead: "Crush your first marathon",
        accent: "injury-free",
      },
    },
    description: "Your coach lives on WhatsApp, adapting every workout in minutes and keeping you locked in all the way to race day.",
    ctaPrimaryText: 'Start on WhatsApp',
    ctaSecondaryText: "I want my free plan",
    keyBenefits: "100% personalized plans • Instant feedback • Daily motivation",
    videoSrc: '/videos/video2', // Extension will be handled in component
  },
};

// How It Works Section
export const howItWorksContent = {
  es: {
    sectionTitle: "Cómo Funciona",
    steps: [
      "Responde 3 preguntas en WhatsApp.",
      "Recibe tu plan en 1 minuto.",
      "Ajustamos cada día según tu progreso."
    ]
  },
  en: {
    sectionTitle: "How It Works",
    steps: [
      "Answer 3 quick WhatsApp questions.",
      "Get your plan in 1 minute.",
      "We adapt it daily to your progress."
    ]
  }
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
    sectionTitle: "¿Por Qué Elegir Andes?",
    sectionSubtitle: "Tecnología, ciencia y coaching de élite para transformar tu entrenamiento. Descubre por qué somos diferentes.",
    benefits: [
      {
        icon: FaWhatsapp,
        headline: "Tu coach en WhatsApp",
        copy: "Sin apps nuevas: escribe \"Corrí 5k en 25 min…\" y registramos distancia, tiempo y molestias.",
        proof: "Registro en segundos con smart-parse que entiende tu lenguaje",
        testimonial: "Solo escribí mi carrera y recibí feedback inmediato. ¡Es como tener un coach en el bolsillo! — Ana, runner principiante",
      },
      {
        icon: FaCalendarAlt,
        headline: "Plan al instante",
        copy: "Di \"Dame mi plan\" y recibe tu semana según tu nivel y objetivo.",
        proof: "Se actualiza cuando registras tus carreras; respeta tus unidades y días preferidos",
        testimonial: "En minutos tenía mi plan completo. Se adapta perfectamente a mi horario y progreso. — Carlos, corredor experimentado",
      },
      {
        icon: FaChartLine,
        headline: "Progreso con datos reales",
        copy: "Antes de responder, consultamos tus últimas semanas (7 y 28 días).",
        proof: "Recomendaciones basadas en ACWR, volumen y ritmo medio",
        testimonial: "La combinación perfecta: respuestas rápidas de IA y consejos expertos cuando los necesito. — Sofía, maratonista",
      },
    ],
  },
  en: {
    sectionTitle: "Why Choose Andes?",
    sectionSubtitle: "Technology, science, and elite coaching to transform your training. Discover why we’re different.",
    benefits: [
      {
        icon: FaWhatsapp,
        headline: "Your coach on WhatsApp",
        copy: "No new apps: write \"I ran 5k in 25 min…\" and we log distance, time, and issues.",
        proof: "Registration in seconds with smart-parse that understands your language",
        testimonial: "I just texted my run and got instant feedback. It's like having a coach in your pocket! — Ana, beginner runner",
      },
      {
        icon: FaCalendarAlt,
        headline: "Instant plan",
        copy: "Say \"Give me my plan\" and receive your week based on your level and goal.",
        proof: "Updates when you log your runs; respects your preferred units and days",
        testimonial: "I had my complete plan in minutes. It adapts perfectly to my schedule and progress. — Carlos, experienced runner",
      },
      {
        icon: FaChartLine,
        headline: "Progress with real data",
        copy: "Before responding, we check your last weeks (7 and 28 days).",
        proof: "Recommendations based on ACWR, volume, and average pace",
        testimonial: "The perfect blend: quick AI responses and expert advice when I need it. — Sofia, marathoner",
      },
    ],
  },
};

export const indicatorsContent = {
  es: {
    preheading: "Nuestro impacto en números",
    title: "Desde tu primer 5K hasta tu récord en maratón, afinamos cada detalle para que avances sin lesiones.",
    highlight: "Entrenamiento inteligente y humano en cada kilómetro.",
    image: {
      src: "/coaching.avif",
      alt: "Entrenador conversando con una corredora durante una sesión al aire libre",
    },
    stats: [
      { value: "2,800 km", label: "Kilómetros acompañados" },
      { value: "100 +", label: "Corredores activos en Andes" },
      { value: "50 +", label: "Planes ajustados cada semana" },
      { value: "10 +", label: "Maratones completadas" },
    ],
  },
  en: {
    preheading: "Our impact in numbers",
    title: "From your first 5K to your next PR, we fine-tune every detail so you progress injury-free.",
    highlight: "Smart, human coaching in every kilometer.",
    image: {
      src: "/coaching.avif",
      alt: "Coach guiding a runner during an outdoor session",
    },
    stats: [
      { value: "1,740 mi", label: "Guided miles" },
      { value: "100 +", label: "Runners training with Andes" },
      { value: "50 +", label: "Plans adapted each week" },
      { value: "10 +", label: "Marathons completed" },
    ],
  },
};

export const testimonialsContent = {
  es: {
    sectionTitle: "Lo Que Dicen Nuestros Corredores",
    testimonials: [
      {
        quote: "Completé mi primera maratón en 4:15 sin lesiones. El plan se adaptó perfectamente a mi horario de trabajo y el coaching 24/7 me mantuvo motivado durante los momentos difíciles.",
        author: "Ana Pérez",
        detail: "Maratonista, Ciudad de México",
        result: "42.2km en 4:15",
        image: "/images/testimonials/ana-perez.jpg",
      },
      {
        quote: "Mejoré mi tiempo de 10K de 52 a 45 minutos en solo 3 meses. Los consejos de nutrición y el análisis de mi técnica fueron clave para este progreso.",
        author: "Carlos López",
        detail: "Corredor de 10K, Santiago de Chile",
        result: "-7 min en 3 meses",
        image: "/images/testimonials/carlos-lopez.jpg",
      },
      {
        quote: "Empecé desde cero y ahora corro 5K sin problemas. La comunidad de WhatsApp me dio el apoyo que necesitaba para mantener la constancia.",
        author: "Sofía Gómez",
        detail: "Principiante Feliz, Bogotá",
        result: "0 a 5K en 8 semanas",
        image: "/images/testimonials/sofia-gomez.jpg",
      },
    ],
  },
  en: {
    sectionTitle: "What Our Runners Say",
    testimonials: [
      {
        quote: "I completed my first marathon in 4:15 injury-free. The plan adapted perfectly to my work schedule and the 24/7 coaching kept me motivated during tough moments.",
        author: "Ana Perez",
        detail: "Marathon Runner, Mexico City",
        result: "42.2km in 4:15",
        image: "/images/testimonials/ana-perez.jpg",
      },
      {
        quote: "I improved my 10K time from 52 to 45 minutes in just 3 months. The nutrition tips and technique analysis were key to this progress.",
        author: "Carlos Lopez",
        detail: "10K Runner, Santiago, Chile",
        result: "-7 min in 3 months",
        image: "/images/testimonials/carlos-lopez.jpg",
      },
      {
        quote: "I started from scratch and now I run 5K without problems. The WhatsApp community gave me the support I needed to stay consistent.",
        author: "Sofia Gomez",
        detail: "Happy Beginner, Bogota",
        result: "0 to 5K in 8 weeks",
        image: "/images/testimonials/sofia-gomez.jpg",
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
  features: string[];
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
  plans: PricingPlan[];
}

export const pricingContent: {
  es: PricingContentStructure;
  en: PricingContentStructure;
} = {
  es: {
    sectionTitle: "Entrena Como un Profesional por Menos de lo que Gastas en Café",
    sectionSubtitle: "Más de 500 corredores ya completaron su primera 5K sin lesiones usando nuestro método probado",
    competitiveAnchor: "Un coach humano cuesta +USD 80/mes. Con Andes obtienes IA de élite por menos que un café al día",
    plans: [
      {
        name: "Starter",
        iconName: "Rocket",
        price: "Gratis",
        priceDetail: "",
        description: "Incluye 7 días gratis – cancela cuando quieras. Perfecto para descubrir cómo entrenar de forma inteligente.",
        features: [
          "🎯 Tu primer plan personalizado",
          "⏰ Respuestas el mismo día",
          "🏃‍♂️ Guía para completar tu primera 5K",
          "📱 Acceso básico por WhatsApp",
        ],
        ctaText: "Empieza en WhatsApp",
        ctaDisclaimer: "7 días gratis", 
        href: "/start?flow=free",
        isPopular: false,
        buttonVariant: "secondary",
        image: "/starter_es.png",
        imageAlt: "Corredora entrenando en un lago al amanecer",
      },
      {
        name: "Pro Runner",
        iconName: "Zap",
        price: "$9.99",
        priceDetail: "/mes",
        annualPrice: "$8.49",
        annualPriceDetail: "/mes (facturado anual)",
        savingsPercentage: "Ahorra 15%",
        popularBadge: "⭐ MÁS ELEGIDO",
        description: "Todo lo que necesitas para entrenar como un profesional. Coaching personalizado que se adapta a ti cada día.",
        features: [
          "🚀 Coach IA que aprende de ti cada día",
          "⚡ Respuestas instantáneas 24/7",
          "🏆 Planes adaptativos según tu progreso",
          "💪 Prevención de lesiones personalizada",
          "🧘‍♀️ Módulo wellness: nutrición + mindfulness",
          "🎯 Retos semanales y comunidad exclusiva",
          "📊 Análisis avanzado de rendimiento",
          "🏃‍♂️ Planes para 5K, 10K, 21K y maratón",
        ],
        ctaText: "Empieza en WhatsApp",
        guarantee: "🛡️ 30 días de garantía",
        href: "/start?flow=premium",
        isPopular: true,
        buttonVariant: "primary",
        image: "/pro_es.png",
        imageAlt: "Corredor atravesando un bosque en carrera",
      },
    ],
  },
  en: {
    sectionTitle: "Train Like a Pro for Less Than Your Coffee Budget",
    sectionSubtitle: "Over 500 runners have completed their first 5K injury-free using our proven method",
    competitiveAnchor: "A human coach costs +USD 80/month. With Andes you get elite AI for less than a coffee a day",
    plans: [
      {
        name: "Starter",
        iconName: "Rocket",
        price: "Free",
        priceDetail: "",
        description: "Includes 7 days free – cancel anytime. Perfect for discovering how to train intelligently.",
        features: [
          "🎯 Your first personalized plan",
          "⏰ Same-day responses",
          "🏃‍♂️ Guide to complete your first 5K",
          "📱 Basic WhatsApp access",
        ],
        ctaText: "Start on WhatsApp",
        ctaDisclaimer: "7 days free",
        href: "/start?flow=free",
        isPopular: false,
        buttonVariant: "secondary",
        image: "/starter_en.png",
        imageAlt: "Athlete swimming in open water at sunrise",
      },
      {
        name: "Pro Runner",
        iconName: "Zap",
        price: "$9.99",
        priceDetail: "/month",
        annualPrice: "$8.49",
        annualPriceDetail: "/month (billed annually)",
        savingsPercentage: "Save 15%",
        popularBadge: "⭐ MOST CHOSEN",
        description: "Everything you need to train like a professional. Personalized coaching that adapts to you every day.",
        features: [
          "🚀 AI Coach that learns from you daily",
          "⚡ Instant 24/7 responses",
          "🏆 Adaptive plans based on your progress",
          "💪 Personalized injury prevention",
          "🧘‍♀️ Wellness module: nutrition + mindfulness",
          "🎯 Weekly challenges and exclusive community",
          "📊 Advanced performance analytics",
          "🏃‍♂️ Plans for 5K, 10K, 21K and marathon",
        ],
        ctaText: "Start on WhatsApp",
        guarantee: "🛡️ 30-day guarantee",
        href: "/start?flow=premium",
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
    sectionTitle: "Preguntas Frecuentes",
    sectionSubtitle: "Todo lo que necesitas saber",
    faqs: [
      {
        question: "¿Y si no me gusta?",
        answer: "Cancela en 1 clic desde WhatsApp.",
      },
      {
        question: "¿Necesito instalar otra app?",
        answer: "No, solo WhatsApp.",
      },
      {
        question: "¿Puedo empezar si nunca he corrido antes?",
        answer: "¡Absolutamente! Nuestros planes están diseñados para todos los niveles. Si eres principiante, comenzamos con caminatas y trotes suaves, progresando gradualmente hacia tu primera carrera de 5K.",
      },
      {
        question: "¿Cómo funciona la comunidad de WhatsApp?",
        answer: "Al suscribirte, recibes acceso a nuestro grupo exclusivo donde compartes experiencias, recibes motivación diaria, participas en desafíos y tienes contacto directo con coaches certificados.",
      },
      {
        question: "¿Qué pasa si me lesiono durante el entrenamiento?",
        answer: "Nuestra IA detecta señales de sobreentrenamiento y ajusta automáticamente tu plan. Si te lesionas, nuestros coaches te ayudan a modificar el entrenamiento para recuperarte de forma segura.",
      },
      {
        question: "¿Puedo cancelar mi suscripción cuando quiera?",
        answer: "Sí, puedes cancelar en cualquier momento desde tu cuenta. Mantendrás acceso hasta el final del período facturado y no hay penalizaciones.",
      },
      {
        question: "¿Los coaches están certificados?",
        answer: "Sí, todos nuestros coaches tienen certificaciones internacionales en running, nutrición deportiva y prevención de lesiones. Combinamos experiencia humana con tecnología de IA.",
      },
    ],
  },
  en: {
    sectionTitle: "Frequently Asked Questions",
    sectionSubtitle: "Everything you need to know",
    faqs: [
      {
        question: "What if I don't like it?",
        answer: "Cancel in 1 click from WhatsApp.",
      },
      {
        question: "Do I need another app?",
        answer: "Nope, just WhatsApp.",
      },
      {
        question: "Can I start if I've never run before?",
        answer: "Absolutely! Our plans are designed for all levels. If you're a beginner, we start with walking and light jogging, gradually progressing toward your first 5K race.",
      },
      {
        question: "How does the WhatsApp community work?",
        answer: "When you subscribe, you get access to our exclusive group where you share experiences, receive daily motivation, participate in challenges, and have direct contact with certified coaches.",
      },
      {
        question: "What if I get injured during training?",
        answer: "Our AI detects overtraining signals and automatically adjusts your plan. If you get injured, our coaches help you modify training for safe recovery.",
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel anytime from your account. You'll maintain access until the end of the billed period with no penalties.",
      },
      {
        question: "Are the coaches certified?",
        answer: "Yes, all our coaches have international certifications in running, sports nutrition, and injury prevention. We combine human expertise with AI technology.",
      },
    ],
  },
};

export const ctaContent = {
  es: {
    title: "¿Listo para Empezar tu Aventura?",
    subtitle: "Únete a la comunidad de Andes Runners hoy y lleva tu carrera al siguiente nivel. Te esperamos para conquistar cimas juntos.",
    buttonText: "Comienza ahora",
  },
  en: {
    title: "Ready to Start Your Adventure?",
    subtitle: "Join the Andes Runners community today and take your running to the next level. We're waiting for you to conquer peaks together.",
    buttonText: "Start now",
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
