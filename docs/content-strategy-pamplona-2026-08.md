# Estrategia de contenido — Club de Running Andes Pamplona (ago-2026)

> Grounding: `.claude/STATUS.md`, `docs/prd-experience-club-pamplona-2026-07.md`, `docs/casual-experience-spec-2026-07.md` y `src/data/content.tsx` (copy en vivo). Esta estrategia asume la posición actual y vigente: **club de running de Pamplona**, no la narrativa "AI-first" descartada/congelada en `.claude/strategy-north-star-A-vs-B-2026-07-29.md`. No sustituye esa decisión de negocio — la complementa, alimentando el motor de contenido que ya está aprobado (embajadores + eventos + WhatsApp).

---

## 0. Auditoría de canales actuales (@andesrc)

| Canal | Estado (screenshots ago-2026) | Mensaje actual | Formato |
|---|---|---|---|
| YouTube `@andesrc` | 4.04K subs, 3 Shorts, 213 / 43 / 1.3K vistas | "Unlock your running potential with Andes—your AI-powered coach on WhatsApp." | Shorts verticales, texto overlay bold |
| Instagram `@andescoach` | 3 posts, 3 seguidores | "AI running coach on WhatsApp 🏃 Personalized plans \| Real results." | Mismos 3 clips |
| TikTok `@andesrc` | 1 seguidor, 91 / 476 / 514 vistas | "AI running coach on WhatsApp 🏃 Run smarter." | Mismos 3 clips |

**Qué mantener:**
- El estilo de hook (2-3 palabras en mayúscula sobre metraje de running real: "EVITA LESIONES", "ENTRENAMIENTO INTELIGENTE", "START RUNNING TODAY") es un patrón visual que ya funciona en corto y coincide con lo que el mercado premia ahora mismo (ver §2). No hay que reinventarlo, solo redirigirlo.
- La consistencia de marca visual (fondo oscuro, montaña verde) entre plataformas.

**Qué corregir — el hallazgo principal de esta auditoría:**
- **Las bios y los 3 videos existentes venden el producto pre-pivote** ("AI running coach on WhatsApp", genérico, sin ciudad, sin club). El sitio ya no vende eso: vende *"Enamórate de correr en dos semanas"* y el club de Pamplona. Ahora mismo alguien que llega desde TikTok a `andesrc.com` no ve la misma promesa que acaba de ver en el video.
- Ninguno de los 3 videos ni las bios mencionan Pamplona, el club, las quedadas de los jueves ni `/embajadores` — el CTA que sí está vivo en el producto.
- Cero contenido de comunidad/eventos (que es precisamente el canal de adquisición que el equipo ya decidió priorizar sobre adquisición digital fría).
- Engagement bajo pero es autoevidente por qué: no hay volumen ni casos de éxito reales que mostrar todavía (el pilotaje del 23-jul es el primer material real disponible).

**Acción inmediata recomendada (bajo costo, alto impacto):** reescribir las 3 bios ya existentes para mencionar Pamplona + el club + link a `/pamplona`, antes de invertir en producción nueva. Es gratis y arregla el mayor gap de esta auditoría en minutos.

**Nota de priorización:** con un piloto de una sola ciudad liderado por embajadores, el contenido corto (Reels/TikTok/Shorts) tiene mejor relación esfuerzo-resultado que el contenido largo de YouTube (5-10 min) — el corto es lo que se comparte en el grupo de WhatsApp del club y lo que produce un embajador con el teléfono. Por eso el calendario abajo pondera 6 cortos vs. 3 largos, y los largos están marcados como prioridad 2.

---

## 1. Propuesta de valor, ICP y pain points (Paso 1)

**Propuesta de valor exacta (de la copy en vivo, `heroContent`):**
> ES: "El club de running de Pamplona · Coach por WhatsApp" — "Enamórate de correr en dos semanas." — "Quedadas que se sienten como un plan con amigos y una coach en WhatsApp que se adapta a ti. Tu primera carrera, sin miedo y sin lesiones."
> EN: "The Pamplona running club · Coach on WhatsApp" — "Fall in love with running in two weeks."

Esta promesa está literalmente calcada del mecanismo de producto real: 15 días de Premium gratis (`TRIAL_DAYS = 15`). No es una promesa de marketing separada del producto — son la misma cosa, lo cual es inusualmente honesto y aprovechable en video.

**ICP (STATUS.md, 20-jul):** hombres y mujeres 25-40, Pamplona, principiantes/casuales, motivados por lo social y aspiracional — explícitamente **no** performance. Nadie debe sentirse excluido por lenguaje de rendimiento (nada de "PRs", "paces", "VDOT" de cara al usuario — ver `casual-experience-spec-2026-07.md`).

**3 pain points → temas de video:**

1. **"Un plan de Google es estático — no sabe que hoy dormiste mal o que te duele la rodilla."** (cita literal de la FAQ en vivo) — el pain point de los planes genéricos de PDF/Google que no se adaptan. Tema: comparación directa "plan estático vs. coach que te escucha".
2. **Miedo a lesionarse / miedo a empezar sin estar "en forma".** La FAQ responde directamente "¿Tengo que estar en forma para empezar?" — esto es la objeción #1 del ICP real (principiante, ansioso, ha sido "quemado" antes por rutinas genéricas). Tema: contenido de "primera vez", desmontar el mito de que hay que estar en forma antes de empezar a entrenar.
3. **Correr sola/solo da miedo o da pereza — la consistencia se rompe por la vida real, no por falta de voluntad.** ("La consistencia importa más que la perfección"). Tema: la solución social (quedadas de los jueves) + la solución digital (el plan se reordena solo si hay mala noche/viaje/agujetas) contadas como una sola historia.

**Diferenciadores reales para minar contenido educativo (del backend, sin exponer jerga al usuario):**
- Onboarding 100% conversacional por WhatsApp con Smart Parsing (no repite preguntas ya respondidas).
- Ciencia real de entrenamiento (VDOT / metodología Jack Daniels) corriendo por debajo de una superficie sin jerga.
- Memoria de 3 capas (Redis/Postgres/Qdrant): el coach recuerda lesiones y objetivos meses después, no solo dentro del mismo chat.
- Lite Mode: usuarios Free nunca quedan bloqueados — coherente con el tono "cero juicio, cero presión" de la marca.
- Touchpoints proactivos (recordatorios, resumen semanal, cuenta regresiva de carrera) — el coach escribe primero, no solo responde.

---

## 2. Patrones de referencia (Paso 2 — sustituto por falta de enlaces)

No se incluyeron enlaces de canales de referencia en el brief original (quedaron como placeholder sin rellenar). Esta sección usa investigación general de patrones virales de contenido de run clubs / fitness para principiantes (agosto 2026), y debe tratarse como punto de partida, no como análisis de un competidor específico — si envías enlaces reales los uso para afinar esto.

- **El formato que mejor funciona para contenido de run clubs ahora mismo es crudo y social, no producido**: video con cámara en mano, momentos candid de grupo, "shaky, social, built around a candid moment" — encaja perfectamente con lo que un embajador puede grabar con el móvil en una quedada de los jueves, sin necesidad de producción.
- **Ventana de duración de mayor retención: 15-30s** para el hook/story principal; 60-90s funciona en Reels solo si el ritmo narrativo se mantiene tenso todo el clip.
- **Hooks de "identity call"** ("Si eres alguien que...") tienen mejor retención que hooks genéricos — recomendable adaptarlo a: *"Si nunca has corrido más de 2km seguidos..."* / *"Si te apuntaste a un gym en enero y ya no fuiste..."*
- **Tendencia agosto 2026**: contenido de baja producción, de una sola toma, supera a lo pulido — esto valida no sobre-invertir en producción cara antes de validar qué formatos convierten.
- TikTok suele originar el formato días/semanas antes de que migre a Reels — vale la pena monitorear TikTok primero para este nicho.

Sources: [Running Club Viral | TikTok](https://www.tiktok.com/discover/running-club-viral) · [What Is Trending on Instagram — August 2026 | Lightreel](https://lightreel.ai/blogs/whats-trending-on-instagram) · [64+ Viral TikTok Hooks 2026 | Socialync](https://www.socialync.io/viral-hooks-library) · [Instagram Trends: August 2026 | Newengen](https://newengen.com/insights/instagram-trends/)

---

## 3. Calendario editorial (Paso 3)

### Formato largo (5-10 min, YouTube) — prioridad 2

| # | Título de trabajo | Ángulo | CTA |
|---|---|---|---|
| L1 | "Cómo un chatbot de WhatsApp calcula tus ritmos como un entrenador olímpico" | Detrás de escena: VDOT/ciencia real explicada simple, sin sonar a infomercial | `/pamplona` |
| L2 | "Una semana en el club de running de Pamplona" (mini-documental) | Sigue a un embajador liderando la quedada del jueves + su coach de WhatsApp en paralelo | `/embajadores` |
| L3 | "De 0 a 5K sin miedo: por qué la mayoría de lesiones de principiante son evitables" | Educativo, casual, con testimonio real de un miembro | `/pamplona` |

### Formato corto (Shorts/Reels/TikTok, 15-30s) — prioridad 1

| # | Título de trabajo | Hook (primeros 3s) | Ángulo |
|---|---|---|---|
| S1 | "Le escribí a mi coach a las 11pm" | *"POV: son las 11pm y no sabes si corres mañana"* | Pain point + respuesta sin juicio, humaniza el WhatsApp |
| S2 | Día en la vida de un embajador (jueves) | *"Si nunca has ido a un run club y te da vergüenza..."* | POV embajador, cámara en mano, formato crudo (ver §2) |
| S3 | "3 señales de que tu plan no te entiende" | *"Tu plan de running no sabe que hoy dormiste mal"* | Comparación plan estático vs. coach adaptativo (cita FAQ real) |
| S4 | "¿Se puede empezar a correr gratis?" | *"No necesitas gym ni app de pago para esto"* | Accesibilidad, Free/Lite Mode nunca bloquea |
| S5 | Antes/después — 2 semanas | *"Hace 2 semanas no corría ni 1km"* | Testimonio real, ligado a la promesa literal del hero | 
| S6 | Cuenta regresiva a la próxima quedada | *"Faltan 3 días para la próxima quedada"* | FOMO comunitario + recap de la última, formato evento | 

Cada pieza cierra con CTA a `/pamplona` (corredor casual) o `/embajadores` (líder potencial), nunca genérico a la home.

---

## 4. Higgsfield: qué encaja y qué no (Paso 4)

**Estado:** Higgsfield MCP autenticado el 07-ago-2026 ("claude.ai Higgsfield"). Esto cambió el enfoque de esta sección: Higgsfield **no es un generador genérico de video** — es un catálogo de *workflows* nombrados (`get_workflow_instructions`), cada uno con su propio intake. No existe un motor "Cense 2.0" (esa era una especificación sin verificar del brief original); cada workflow decide su propio modelo internamente.

**El hallazgo clave — y confirma lo que ya decía §2:** el catálogo real de Higgsfield cubre bien contenido narrado/explicativo sin actor en cámara (`faceless-channel-video`: Explainer, History/documental, Kids, Fairy Tale) y anuncios estilo UGC con producto/URL real (`ugc-flow` y variantes, pensados para reseñas tipo talking-head de un producto de e-commerce). **Ningún workflow del catálogo produce metraje crudo, cámara en mano, candid de una quedada real** — que es exactamente el formato que §2 identificó como el que mejor rinde ahora mismo para contenido de run clubs. Esto no es una limitación que rodear: es la confirmación de que ese contenido debe salir de un embajador con el móvil, no de un generador de IA.

**Reparto de piezas del calendario:**

| Pieza | Modo de producción | Por qué |
|---|---|---|
| S1, S2, S3, S4, S5, S6 | **Filmado por embajador** | Son momentos candid de personas y lugares reales — el formato que gana ahora mismo (§2), y ningún workflow de Higgsfield lo replica de forma creíble. |
| L2 ("Una semana en el club") | **Filmado por embajador** | Es literalmente un documental sobre gente y un sitio reales — filmarlo tiene más credibilidad que generarlo. |
| L1, L3 (explicativos, sin protagonista en cámara) | **Generado con Higgsfield** — workflow `faceless-channel-video` | Encajan directo en el tipo "Explainer" del workflow: narrador + visuales, sin necesidad de actor real. |

De cara al brief original: no hay una "ficha de personaje" única de marca porque el propio tono de Andes ya lo descarta — la coach es la voz de WhatsApp, no un avatar fijo; los protagonistas son corredores/embajadores reales.

### Cómo correr una pieza `ai-generated`

1. `npm run prompt -- L1` (o `L3`) en `tools/content-factory/` para ver el brief completo.
2. En esta misma sesión de Claude Code, con Higgsfield autenticado: pedir que cargue `get_workflow_instructions({ workflow: "faceless-channel-video" })` y lo ejecute con ese brief.
3. Revisar `balance` antes — la generación consume créditos (210 disponibles en el plan Starter al momento de escribir esto). No correr las 9 piezas de una sentada sin revisar costo.

### Ejemplos concretos por pieza

**S1 — "Le escribí a mi coach a las 11pm"** · `[FILMAR — embajador]`
```
GUION: Persona en pijama, luz de teléfono en la cara, 11pm. Escribe "no sé si
  corro mañana, estoy agotada". Corte a burbuja de WhatsApp respondiendo con
  calidez, sin culpa. Corte a la misma persona corriendo suave a la mañana
  siguiente, sonriendo.
VOZ EN OFF (sobre la respuesta de WhatsApp, leída en tono cercano): "Tu coach no
  te exige. Te acompaña donde estés."
MÚSICA: lo-fi suave, sube ligeramente en el corte final.
CTA: "Empieza gratis por WhatsApp → link en bio" / on-screen: "andesrc.com/pamplona"
```

**S2 — Día en la vida de un embajador** · `[FILMAR — embajador]`
```
GUION: Cámara en mano (POV embajador) llegando al café aliado un jueves temprano,
  saludando gente que llega, grupo estirando, arrancan a ritmo de conversación.
  Sin guion rígido — priorizar momentos candid reales sobre el ambassador kit.
VOZ EN OFF: "Si nunca has ido a un run club y te da vergüenza empezar solo — aquí
  nadie corre solo."
MÚSICA: percusión ligera, energía de mañana, sin ser "hype" agresivo.
CTA: "¿Y si lideras el club de tu ciudad? → /embajadores"
```

**S3 — "3 señales de que tu plan no te entiende"** · `[FILMAR — embajador]`
```
GUION: Split-screen: PDF/hoja de plan genérico vs. chat de WhatsApp. Texto
  overlay: "1. No sabe que dormiste mal" / "2. No sabe que te duele la rodilla"
  / "3. No se adapta si viajas". Corte final: notificación de WhatsApp
  reordenando el plan solo.
VOZ EN OFF: cita casi literal de la FAQ: "Un plan de Google es estático. No sabe
  que hoy dormiste mal."
MÚSICA: mínima, casi ausente — dejar que el contraste visual hable.
CTA: "El tuyo sí se adapta → empieza gratis"
```

**L2 — "Una semana en el club de running de Pamplona" (largo)** · `[FILMAR — embajador]`
```
GUION: Estructura documental 5-7min. Acto 1: por qué nace el club (voz del
  embajador). Acto 2: la quedada del jueves de principio a fin. Acto 3: qué pasa
  entre quedada y quedada (WhatsApp coach, capturas reales de conversación).
  Cierre: testimonio de alguien que llegó sin haber corrido nunca.
VOZ EN OFF: narrativa en primera persona del embajador, no locutor externo.
MÚSICA: sube y baja por acto, instrumental cálido.
YOUTUBE PACKAGE: título A "Así es un run club para gente que odia correr sola" /
  título B "Probé el club de running de Pamplona durante una semana" / título C
  "El WhatsApp que me hizo correr mi primer 5K".
CTA: "/embajadores" (cierre) + "/pamplona" (descripción).
```

**L1 — "Cómo un chatbot de WhatsApp calcula tus ritmos como un entrenador olímpico"** · `[GENERAR — Higgsfield: faceless-channel-video, tipo Explainer]`
```
GUION: Explicación en tono casual de cómo el coach calcula ritmos a partir de
  carreras/entrenamientos recientes (metodología real, sin nombrarla como
  "VDOT" al usuario), ilustrado con un caso real de Pamplona. Cierre con
  testimonio breve.
NARRACIÓN: educativa, sin jerga, comparando con "cómo lo haría un entrenador
  humano" para anclar la credibilidad.
YOUTUBE PACKAGE: título A "Cómo un chatbot de WhatsApp calcula tus ritmos como
  un entrenador olímpico" / título B "La ciencia real detrás de tu plan de
  running por WhatsApp" / título C "Así calcula Andes tu plan de entrenamiento
  (sin apps, sin gym)".
CTA: "/pamplona" en descripción y card final.
```

*(L3 sigue la misma estructura que L1 — ver `tools/content-factory/src/content-calendar.ts` para el brief completo de las 9 piezas, fuente única compartida entre este doc y el CLI.)*

---

## 5. Automatización (Paso 5)

Ver `tools/content-factory/README.md` para el estado completo. Resumen: `npm run prompt -- <id>` y `npm run generate -- <id>` funcionan hoy — el segundo distingue automáticamente entre piezas para filmar (imprime el brief de filmación) y piezas para generar con Higgsfield (imprime qué workflow cargar y cómo). No hay llamada directa a una API de Higgsfield desde el script: las herramientas MCP solo corren dentro de una sesión de Claude Code autenticada, así que la generación real se pide en vivo, no por batch automático. Antes de generar cualquier pieza: revisar `balance` (210 créditos disponibles en el plan Starter al confirmar esto) — no correr las 9 piezas de una sentada.

---

## Próximos pasos

1. Reescribir las 3 bios existentes (YT/IG/TikTok) para mencionar Pamplona + `/pamplona` — 15 minutos, sin costo, mayor impacto inmediato de esta auditoría.
2. Priorizar 1-2 piezas cortas (S1-S6) para la primera producción real, filmadas por un embajador en la próxima quedada del jueves — coincide con el patrón de "baja producción gana" de §2 y es gratis (no consume créditos de Higgsfield).
3. Si quieres una primera pieza generada por IA como prueba, L1 es la candidata más barata/rápida de validar (Explainer corto, sin necesidad de metraje real) — confirma cuál antes de gastar créditos.
4. Enviarme enlaces reales de canales de referencia si quieres que reemplace el §2 genérico por un análisis específico.
