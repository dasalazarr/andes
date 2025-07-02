interface ChatTranslation {
  title: string;
  subtitle: string;
  script: {
    [key: string]: {
      bot: string;
      options: { text: string; payload: string }[];
    };
  };
}

export const chatTranslations: { [lang: string]: ChatTranslation } = {
  es: {
    title: "Prueba nuestro Coach con IA en Acción",
    subtitle: "Mira cómo Andes adapta tu plan en tiempo real.",
    script: {
      start: {
        bot: "¡Hola! Soy tu coach de IA de Andes. Para empezar, dime cuál es tu principal objetivo.",
        options: [
          { text: "Correr mi primer maratón", payload: "first_marathon" },
          { text: "Mejorar mi tiempo", payload: "improve_time" },
          { text: "Correr de forma consistente", payload: "be_consistent" },
        ],
      },
      first_marathon: {
        bot: "¡Excelente meta! Analicé tu perfil. Sugiero empezar con 3 sesiones de carrera y 2 de fuerza a la semana. ¿Te parece bien?",
        options: [
          { text: "Suena bien", payload: "sounds_good" },
          { text: "Es demasiado para mí", payload: "too_much" },
        ],
      },
      improve_time: {
        bot: "¡Vamos a por esa marca! Para mejorar tu velocidad, es clave el trabajo de series. ¿Te gustaría añadir un día de series en pista a tu plan?",
        options: [
          { text: "Sí, ¡vamos!", payload: "add_track" },
          { text: "Prefiero entrenar en calle", payload: "prefer_street" },
        ],
      },
      be_consistent: {
        bot: "La constancia es la clave del éxito. Para ayudarte, puedo enviarte recordatorios y ajustar tu plan si tienes una semana ocupada. ¿Qué día prefieres para tu descanso activo?",
        options: [
          { text: "Lunes", payload: "rest_day" },
          { text: "Viernes", payload: "rest_day" },
        ],
      },
      sounds_good: {
        bot: "¡Perfecto! Tu plan para la primera semana está listo. Recuerda que se adaptará según tu progreso. ¡Mucho éxito!",
        options: [],
      },
      too_much: {
        bot: "Entendido. No hay problema. Podemos empezar con 2 sesiones de carrera y 1 de fuerza. Lo más importante es escuchar a tu cuerpo. El plan se ajustará automáticamente.",
        options: [],
      },
      add_track: {
        bot: "¡Genial! He añadido una sesión de series a tu martes. Verás cómo mejora tu ritmo. ¡A darlo todo!",
        options: [],
      },
      prefer_street: {
        bot: "¡Sin problema! He adaptado la sesión de velocidad para que la puedas hacer en un terreno plano cerca de ti. ¡El plan se ajusta a tus preferencias!",
        options: [],
      },
      rest_day: {
        bot: "Anotado. Tu plan ha sido ajustado. ¡Recuerda que la recuperación es parte del entrenamiento!",
        options: [],
      },
    },
  },
  en: {
    title: "Try our AI Coach in Action",
    subtitle: "See how Andes adapts your plan in real-time.",
    script: {
      start: {
        bot: "Hello! I'm your Andes AI coach. To get started, tell me what your main goal is.",
        options: [
          { text: "Run my first marathon", payload: "first_marathon" },
          { text: "Improve my time", payload: "improve_time" },
          { text: "Run more consistently", payload: "be_consistent" },
        ],
      },
      first_marathon: {
        bot: "Great goal! I've analyzed your profile. I suggest starting with 3 running sessions and 2 strength sessions per week. Does that sound good to you?",
        options: [
          { text: "Sounds good", payload: "sounds_good" },
          { text: "That's too much for me", payload: "too_much" },
        ],
      },
      improve_time: {
        bot: "Let's go for that personal best! To improve your speed, interval training is key. Would you like to add a track workout to your plan?",
        options: [
          { text: "Yes, let's do it!", payload: "add_track" },
          { text: "I prefer street training", payload: "prefer_street" },
        ],
      },
      be_consistent: {
        bot: "Consistency is the key to success. To help you, I can send you reminders and adjust your plan if you have a busy week. Which day would you prefer for your active rest?",
        options: [
          { text: "Monday", payload: "rest_day" },
          { text: "Friday", payload: "rest_day" },
        ],
      },
      sounds_good: {
        bot: "Perfect! Your plan for the first week is ready. Remember it will adapt based on your progress. Best of luck!",
        options: [],
      },
      too_much: {
        bot: "Understood. No problem. We can start with 2 running sessions and 1 strength session. The most important thing is to listen to your body. The plan will adjust automatically.",
        options: [],
      },
      add_track: {
        bot: "Great! I've added an interval session on Tuesday. You'll see your pace improve in no time. Give it your all!",
        options: [],
      },
      prefer_street: {
        bot: "No problem! I've adapted the speed session for flat terrain near you. The plan adjusts to your preferences!",
        options: [],
      },
      rest_day: {
        bot: "Noted. Your plan has been adjusted. Remember that recovery is part of the training!",
        options: [],
      },
    },
  },
};

export type DemoStage = keyof typeof chatTranslations.en.script;
