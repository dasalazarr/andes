/**
 * Editorial calendar for the Pamplona-club content strategy.
 * Mirrors docs/content-strategy-pamplona-2026-08.md §3-4 — keep both in sync.
 * This is the single source of truth the CLI reads from; add new pieces here,
 * not inline in index.ts.
 *
 * productionMode reflects what Higgsfield's real workflow catalog can and
 * can't do (confirmed 2026-08-07, see higgsfield-client.ts):
 *   - "ambassador-filmed": no Higgsfield workflow fits raw candid phone
 *     footage — these scripts are filming briefs for a human, not AI prompts.
 *   - "ai-generated": fits an existing Higgsfield workflow; the script below
 *     is the brief to feed that workflow's own intake.
 */

export type Format = "short" | "long";
export type ProductionMode = "ambassador-filmed" | "ai-generated";

export interface CalendarPiece {
  id: string;
  format: Format;
  workingTitle: string;
  hook: string;
  angle: string;
  cta: "/pamplona" | "/embajadores";
  productionMode: ProductionMode;
  /** Only set when productionMode is "ai-generated" — the Higgsfield workflow name to load via get_workflow_instructions. */
  higgsfieldWorkflow?: string;
  /** Shot list / VO / music / edit direction — a filming brief (ambassador-filmed) or a generation brief (ai-generated). */
  script: string;
  /** For YouTube Video Package generation (long-form primarily, but shorts get simple captions too). */
  youtubePackage?: {
    titleOptions: string[];
    description: string;
    tags: string[];
  };
}

const BRAND = `MARCA: Andes — club de running de Pamplona. Logo: montaña verde sobre fondo oscuro.
VOZ EN OFF: cálida, cercana, "una amiga que sabe de running" — nunca jerga técnica
  (nada de "paces", "VDOT", "PRs" de cara al usuario).`;

/** Header for pieces a human (ideally an ambassador) films on their phone. */
const FILMED_STYLE = `${BRAND}
FORMATO: filmado por un embajador con el móvil, vertical 9:16, 15-30s.
ESTÉTICA: luz natural, Pamplona urbano-verde, cámara en mano, ligera
  inestabilidad — priorizar candid real sobre producción pulida (así rinde
  mejor este formato ahora mismo — ver docs/content-strategy-pamplona-2026-08.md §2).
PERSONAJE: personas reales del club (ambassador, miembros) — no avatar de marca.`;

/** Header for pieces routed through Higgsfield's faceless-channel-video workflow. */
const AI_STYLE = `${BRAND}
FORMATO: horizontal 16:9, 5-10min.
HIGGSFIELD: workflow "faceless-channel-video" (narrador + visuales, sin actor
  en cámara) — cargar con get_workflow_instructions antes de generar; ese
  workflow decide el modelo/motor internamente, no lo fijamos aquí.
ESTÉTICA: consistencia de marca (montaña verde, fondo oscuro) en cualquier
  asset gráfico que el workflow produzca.`;

export const CALENDAR: CalendarPiece[] = [
  {
    id: "S1",
    format: "short",
    workingTitle: "Le escribí a mi coach a las 11pm",
    hook: "POV: son las 11pm y no sabes si corres mañana",
    angle: "Pain point + respuesta sin juicio, humaniza el WhatsApp",
    cta: "/pamplona",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Persona en pijama, luz de teléfono en la cara, 11pm. Escribe "no sé si
  corro mañana, estoy agotada". Corte a burbuja de WhatsApp respondiendo con
  calidez, sin culpa. Corte a la misma persona corriendo suave a la mañana
  siguiente, sonriendo.
VOZ EN OFF (sobre la respuesta de WhatsApp): "Tu coach no te exige. Te acompaña
  donde estés."
MÚSICA: lo-fi suave, sube ligeramente en el corte final.
CTA: "Empieza gratis por WhatsApp" / on-screen: "andesrc.com/pamplona"`,
  },
  {
    id: "S2",
    format: "short",
    workingTitle: "Día en la vida de un embajador",
    hook: "Si nunca has ido a un run club y te da vergüenza...",
    angle: "POV embajador, cámara en mano, formato crudo",
    cta: "/embajadores",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Cámara en mano (POV embajador) llegando al café aliado un jueves
  temprano, saludando gente que llega, grupo estirando, arrancan a ritmo de
  conversación. Priorizar momentos candid reales sobre guion rígido.
VOZ EN OFF: "Si nunca has ido a un run club y te da vergüenza empezar solo —
  aquí nadie corre solo."
MÚSICA: percusión ligera, energía de mañana, sin ser "hype" agresivo.
CTA: "¿Y si lideras el club de tu ciudad? → /embajadores"`,
  },
  {
    id: "S3",
    format: "short",
    workingTitle: "3 señales de que tu plan no te entiende",
    hook: "Tu plan de running no sabe que hoy dormiste mal",
    angle: "Comparación plan estático vs. coach adaptativo (cita FAQ real)",
    cta: "/pamplona",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Split-screen: PDF/hoja de plan genérico vs. chat de WhatsApp real.
  Texto overlay: "1. No sabe que dormiste mal" / "2. No sabe que te duele la
  rodilla" / "3. No se adapta si viajas". Corte final: notificación de
  WhatsApp reordenando el plan solo.
VOZ EN OFF: "Un plan de Google es estático. No sabe que hoy dormiste mal."
MÚSICA: mínima, casi ausente — dejar que el contraste visual hable.
CTA: "El tuyo sí se adapta → empieza gratis"`,
  },
  {
    id: "S4",
    format: "short",
    workingTitle: "¿Se puede empezar a correr gratis?",
    hook: "No necesitas gym ni app de pago para esto",
    angle: "Accesibilidad, Free/Lite Mode nunca bloquea",
    cta: "/pamplona",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Persona mostrando que no tiene ropa de gym cara ni suscripción a app de
  running, solo el móvil. Escribe a Andes por WhatsApp, arranca a caminar/correr
  suave desde la puerta de casa.
VOZ EN OFF: "Empiezas gratis. Y sigue siendo gratis después, sin bloqueo."
MÚSICA: ligera, optimista, sin urgencia de venta.
CTA: "Empieza gratis por WhatsApp"`,
  },
  {
    id: "S5",
    format: "short",
    workingTitle: "Antes/después — 2 semanas",
    hook: "Hace 2 semanas no corría ni 1km",
    angle: "Testimonio real, ligado a la promesa literal del hero",
    cta: "/pamplona",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Split temporal: día 1 caminando/trotando incómodo vs. día 14 corriendo
  con soltura junto al grupo. Overlay de fecha en cada mitad. (Filmar ambos
  momentos reales con la misma persona — no generar sintéticamente: el peso
  del formato es que sea verificablemente real.)
VOZ EN OFF: "Hace 2 semanas no corría ni 1km. Enamórate de correr en dos
  semanas."
MÚSICA: sube de energía del lado "después".
CTA: "Tu primera carrera empieza con un mensaje → /pamplona"`,
  },
  {
    id: "S6",
    format: "short",
    workingTitle: "Cuenta regresiva a la próxima quedada",
    hook: "Faltan 3 días para la próxima quedada",
    angle: "FOMO comunitario + recap de la última, formato evento",
    cta: "/embajadores",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
GUION: Recap rápido de la última quedada del jueves (risas, café, grupo
  corriendo) con overlay de cuenta regresiva "3... 2... 1 día" para la próxima.
VOZ EN OFF: "El club está naciendo en Pamplona. ¿Vienes el jueves?"
MÚSICA: percusión ligera, ritmo ascendente hacia el final.
CTA: "Apúntate a la próxima quedada → /pamplona"`,
  },
  {
    id: "L1",
    format: "long",
    workingTitle: "Cómo un chatbot de WhatsApp calcula tus ritmos como un entrenador olímpico",
    hook: "Detrás de escena: la ciencia real detrás de un plan que llega por WhatsApp",
    angle: "VDOT/ciencia real explicada simple, sin sonar a infomercial",
    cta: "/pamplona",
    productionMode: "ai-generated",
    higgsfieldWorkflow: "faceless-channel-video",
    script: `${AI_STYLE}
TIPO DE FLUJO: Explainer (dentro de faceless-channel-video)
GUION: Explicación en tono casual de cómo el coach calcula ritmos a partir de
  carreras/entrenamientos recientes (metodología real, sin nombrarla como
  "VDOT" al usuario), ilustrado con un caso real de Pamplona. Cierre con
  testimonio breve.
NARRACIÓN: educativa, sin jerga, comparando con "cómo lo haría un entrenador
  humano" para anclar la credibilidad.
CTA: "/pamplona" en descripción y card final.`,
    youtubePackage: {
      titleOptions: [
        "Cómo un chatbot de WhatsApp calcula tus ritmos como un entrenador olímpico",
        "La ciencia real detrás de tu plan de running por WhatsApp",
        "Así calcula Andes tu plan de entrenamiento (sin apps, sin gym)",
      ],
      description:
        "Andes es el coach de running del club de Pamplona: un plan de entrenamiento real, calculado con ciencia deportiva seria, entregado por WhatsApp — sin apps, sin jerga, sin presión. En este video mostramos cómo funciona por dentro, con un caso real de alguien del club. andesrc.com/pamplona",
      tags: [
        "running principiantes",
        "club de running Pamplona",
        "coach running IA",
        "running sin lesiones",
        "empezar a correr",
        "plan de entrenamiento running",
        "correr en Pamplona",
      ],
    },
  },
  {
    id: "L2",
    format: "long",
    workingTitle: "Una semana en el club de running de Pamplona",
    hook: "Así es un run club para gente que odia correr sola",
    angle: "Mini-documental: embajador + coach en paralelo",
    cta: "/embajadores",
    productionMode: "ambassador-filmed",
    script: `${FILMED_STYLE}
FORMATO: horizontal 16:9, 5-7min — mejor filmado real que generado: es
  literalmente un documental sobre gente y un lugar reales.
GUION: Acto 1 — por qué nace el club (voz del embajador). Acto 2 — la quedada
  del jueves de principio a fin. Acto 3 — qué pasa entre quedada y quedada
  (WhatsApp coach, capturas reales de conversación). Cierre — testimonio de
  alguien que llegó sin haber corrido nunca.
VOZ EN OFF: narrativa en primera persona del embajador, no locutor externo.
MÚSICA: sube y baja por acto, instrumental cálido.
CTA: "/embajadores" (cierre) + "/pamplona" (descripción).`,
    youtubePackage: {
      titleOptions: [
        "Así es un run club para gente que odia correr sola",
        "Probé el club de running de Pamplona durante una semana",
        "El WhatsApp que me hizo correr mi primer 5K",
      ],
      description:
        "Seguimos a un embajador del club de running de Andes en Pamplona durante una semana: la quedada de los jueves, el coach de WhatsApp que se adapta día a día, y el testimonio de alguien que nunca había corrido antes de unirse. andesrc.com/embajadores",
      tags: [
        "run club Pamplona",
        "club de running",
        "correr en grupo",
        "embajadores Andes",
        "empezar a correr",
        "running principiantes España",
      ],
    },
  },
  {
    id: "L3",
    format: "long",
    workingTitle: "De 0 a 5K sin miedo",
    hook: "Por qué la mayoría de lesiones de principiante son evitables",
    angle: "Educativo, casual, con testimonio real de un miembro",
    cta: "/pamplona",
    productionMode: "ai-generated",
    higgsfieldWorkflow: "faceless-channel-video",
    script: `${AI_STYLE}
TIPO DE FLUJO: Explainer (dentro de faceless-channel-video)
GUION: Explicación casual de por qué los principiantes se lesionan (progresión
  demasiado rápida, cero seguimiento de carga) y cómo el coach lo previene
  antes de que pase, no después. Referenciar (sin filmarlo dentro del mismo
  asset generado) un testimonio real de alguien que evitó una lesión gracias
  al ajuste automático del plan — puede insertarse como clip filmado aparte.
NARRACIÓN: educativa, tranquilizadora, cero tono alarmista.
CTA: "/pamplona" en descripción y card final.`,
    youtubePackage: {
      titleOptions: [
        "De 0 a 5K sin miedo: por qué te lesionas al empezar a correr",
        "Cómo evitar lesiones si nunca has corrido antes",
        "El error que hace que la mayoría abandone el running (y cómo evitarlo)",
      ],
      description:
        "La mayoría de lesiones de quien empieza a correr son evitables. Te contamos por qué pasan y cómo el coach de Andes ajusta tu plan antes de que te lesiones, no después — con un testimonio real del club de Pamplona. andesrc.com/pamplona",
      tags: [
        "evitar lesiones running",
        "empezar a correr",
        "running principiantes",
        "prevención lesiones running",
        "club de running Pamplona",
        "primer 5k",
      ],
    },
  },
];

export function getPiece(id: string): CalendarPiece {
  const piece = CALENDAR.find((p) => p.id.toLowerCase() === id.toLowerCase());
  if (!piece) {
    const known = CALENDAR.map((p) => p.id).join(", ");
    throw new Error(`Unknown piece id "${id}". Known ids: ${known}`);
  }
  return piece;
}
