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
    title: "Un coach que te recuerda, no un bot que repite",
    subtitle: "Esto es el día 2 con Andes: ayer reportaste una molestia. Mira lo que pasa hoy.",
    script: {
      start: {
        bot: "¡Buenos días! Ayer registraste 6K y me contaste que la rodilla derecha te molestaba un poco al final. ¿Cómo amaneció hoy?",
        options: [
          { text: "Mejor, casi no la siento", payload: "knee_better" },
          { text: "Sigue igual", payload: "knee_same" },
          { text: "Bien, pero dormí muy mal", payload: "slept_bad" },
        ],
      },
      knee_better: {
        bot: "Me alegra. Aun así vamos con cuidado: tu carga de esta semana subió 32% sobre tu promedio del último mes, y ahí es donde aparecen las lesiones. Hoy cambio las series por 5K suave. ¿De acuerdo?",
        options: [
          { text: "De acuerdo", payload: "adjusted_ok" },
          { text: "¿Y mi carrera del domingo?", payload: "race_question" },
        ],
      },
      knee_same: {
        bot: "Entonces hoy no corremos. Una molestia que no mejora en 48h es señal de frenar antes de que se vuelva lesión. Hoy descanso y mañana 25 min de caminata. ¿Te escribo mañana para revisar cómo sigue?",
        options: [
          { text: "Sí, revisemos mañana", payload: "checkin_set" },
          { text: "¿Y mi carrera del domingo?", payload: "race_question" },
        ],
      },
      slept_bad: {
        bot: "Gracias por contarme — dormir mal baja tu recuperación, y con la rodilla de ayer no conviene exigir. Muevo las series al jueves y hoy hacemos 30 min suaves. Tu meta de marzo no cambia; solo reordeno la semana.",
        options: [
          { text: "Perfecto, así lo hago", payload: "adjusted_ok" },
          { text: "¿Y mi carrera del domingo?", payload: "race_question" },
        ],
      },
      race_question: {
        bot: "Si la rodilla está bien el viernes, corres el domingo. Si no, hacemos 8K suaves en vez de la carrera. Tu meta del 21K de marzo sigue intacta — solo protegemos este micro-ciclo. Decidimos juntos el viernes.",
        options: [],
      },
      checkin_set: {
        bot: "Listo, mañana te escribo para preguntarte por la rodilla. Así trabajo: recuerdo lo que me cuentas y ajusto tu plan antes de que una molestia se convierta en lesión.",
        options: [],
      },
      adjusted_ok: {
        bot: "Plan actualizado ✅. Esto es lo que hago todos los días: cruzo lo que me cuentas (dolor, sueño, ánimo) con tu carga de entrenamiento, y ajusto antes de que algo se rompa.",
        options: [],
      },
    },
  },
  en: {
    title: "A coach that remembers you, not a bot that repeats",
    subtitle: "This is day 2 with Andes: yesterday you reported a niggle. See what happens today.",
    script: {
      start: {
        bot: "Good morning! Yesterday you logged 6K and told me your right knee felt a little off near the end. How is it today?",
        options: [
          { text: "Better, barely feel it", payload: "knee_better" },
          { text: "Still the same", payload: "knee_same" },
          { text: "Fine, but I slept badly", payload: "slept_bad" },
        ],
      },
      knee_better: {
        bot: "Glad to hear it. Still, let's be careful: your training load this week is up 32% over your monthly average, and that's exactly where injuries show up. Today I'm swapping intervals for an easy 5K. Sound good?",
        options: [
          { text: "Sounds good", payload: "adjusted_ok" },
          { text: "What about Sunday's race?", payload: "race_question" },
        ],
      },
      knee_same: {
        bot: "Then we don't run today. A niggle that hasn't improved in 48h is a sign to back off before it becomes an injury. Rest today, 25-min walk tomorrow. Want me to check in tomorrow to see how it's going?",
        options: [
          { text: "Yes, check in tomorrow", payload: "checkin_set" },
          { text: "What about Sunday's race?", payload: "race_question" },
        ],
      },
      slept_bad: {
        bot: "Thanks for telling me — bad sleep cuts your recovery, and with yesterday's knee it's not the day to push. I'm moving intervals to Thursday; today is 30 easy minutes. Your March goal doesn't change — I'm just reordering the week.",
        options: [
          { text: "Perfect, will do", payload: "adjusted_ok" },
          { text: "What about Sunday's race?", payload: "race_question" },
        ],
      },
      race_question: {
        bot: "If your knee is clear by Friday, you race Sunday. If not, we do an easy 8K instead. Your March 21K goal stays intact — we're only protecting this micro-cycle. We decide together on Friday.",
        options: [],
      },
      checkin_set: {
        bot: "Done — I'll message you tomorrow to ask about the knee. That's how I work: I remember what you tell me and adjust your plan before a niggle becomes an injury.",
        options: [],
      },
      adjusted_ok: {
        bot: "Plan updated ✅. This is what I do every day: I cross what you tell me (pain, sleep, mood) with your training load, and adjust before something breaks.",
        options: [],
      },
    },
  },
};

export type DemoStage = keyof typeof chatTranslations.en.script;
