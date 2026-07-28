# Spec — Experiencia del casual: storytelling, formato y voz

**Fecha**: 2026-07-27 · **Autor**: Diego + Claude (dirección de producto)
**Estado**: exploración → spec inicial. Alcance: onboarding + coach (v3, prompts/plan) + copy (andes).
**Origen**: realización de Diego — *"el producto está construido para mi modelo mental (maratonista con meta). El casual corre por hábito/salud/diversión, no por una carrera."* Unifica tres hilos que eran la misma cosa: redefinición de valor (WS2) + gamificación de hábito (PRD B2) + identidad de la coach (WS4).

---

## 1. Premisa: dos mentalidades, no dos niveles

| | **Rendimiento** (Diego, usuarios con reloj) | **Casual** (el mercado / ICP) |
|---|---|---|
| Meta | Carrera + tiempo | **Hábito**, salud, despejar la cabeza, energía |
| Quiere | Estructura, ritmos, VDOT, progresión | Cero presión, flexibilidad, ánimo, "solo aparecer" |
| El valor está en | El **plan** | La **relación y el hábito** (lo que Garmin no da) |
| Un plan con ritmos… | lo motiva | lo **espanta** |

**Decisión de producto**: **casual-first por defecto**; el **modo rendimiento se desbloquea al declarar una meta de carrera** (5k/10k/media/maratón). El de rendimiento ya tiene Garmin; el casual no tiene nada y nos necesita.

## 2. Eje primario: HÁBITO

Todo se mide y se cuenta contra *aparecer con constancia*, no contra rendimiento. La pregunta que ancla la experiencia no es "¿qué carrera?", sino **"¿por qué quieres correr?"** (salud · cabeza/estrés · energía/hábito · una meta → rendimiento).

## 3. Reglas de lenguaje (el corazón — "ojo con el lenguaje")

Concreto y accionable. **Ni vago ni técnico.**

| ❌ Vago | ❌ Técnico/rendimiento | ✅ Casual accionable |
|---|---|---|
| "Muévete 3 veces esta semana" | "Tempo 6 km @ 5:20/km, RPE 7" | "Hoy: **trote suave 15 min, hasta que te canses.** Si necesitas caminar un rato, perfecto." |
| "Haz algo de cardio" | "Intervalos 6×400m @ ritmo VO2max" | "Prueba esto: **trota 1 min, camina 2, ×5.** Sin prisa." |
| "Sigue tu plan" | "Semana 8/16, fase de construcción" | "**Esta semana, dos salidas suaves.** La que puedas, cuando puedas." |

Principios: verbos concretos · duración en **minutos** (no km/ritmo) · esfuerzo por **sensación** ("suave", "hasta que te canses", "que puedas hablar mientras corres") · walk-run siempre válido · **cero culpa** si falla un día.

## 4. Arco narrativo (storytelling por capítulos, no countdown)

1. **Onboarding — "¿por qué corres?"** Cálido, humano. Captura el *porqué* (será el ancla a la que la coach vuelve). Nada de "elige tu carrera".
2. **Primer movimiento (día 1)** — la victoria más pequeña posible: *"Tu primera salida: 15 min suaves, hasta que te canses. No importa el ritmo."* Celebrar en grande al volver.
3. **Primera semana** — 2–3 salidas flexibles, sin culpa: *"Apareciste 2 veces esta semana. Eso ya es ser constante."*
4. **Hábito naciente (sem. 2–4)** — racha: *"3 semanas seguidas. Esto ya es parte de tu semana."*
5. **Identidad** — el pago emocional: *"Te estás volviendo alguien que corre."* Sube de etapa.

## 5. Métricas que SÍ se muestran (y las que no)

- **Sí (casual)**: racha, días en movimiento, cómo te sentiste (RPE en palabras), etapa de evolución **Caminante → Primeros pasos → Constante → Corredora → (rendimiento)**.
- **No se muestran**: VDOT, ritmo/pace, ACWR. Se mantienen **internos** (el ACWR sigue protegiendo de lesión por debajo), pero no se le hablan al casual.
- Formato de "plan" casual: sesiones concretas (min + sensación), semana flexible, sin tabla de ritmos.

## 6. Identidad de la coach — 3 opciones (elige una)

Todas: cálidas, cero juicio, lenguaje del §3. Muestra de voz para "hoy toca moverte":

- **"Vale"** — hermana mayor que ya pasó por empezar. Cercana, humor ligero.
  *"Ey 👋 ¿saliste hoy? Aunque sea 15 min suaves cuentan, en serio. Y si hoy no, mañana. Aquí estoy."*
- **"Sol"** — calmada, presente, anti-ansiedad (ref. Fixa). Minimalista.
  *"Sin prisa. Hoy solo 15 min suaves, hasta que te canses. Respira, disfruta, y me cuentas cómo te fue."*
- **"Río"** — compañero neutro/unisex, cercano y directo.
  *"Hoy toca moverte: trote suave 15 min, para cuando te canses. Tú puedes 💪 luego me cuentas."*

**Recomendación**: dado que el eje es hábito y el tono debe ser anti-presión, **"Sol" o "Vale"** encajan mejor que un tono de entrenador. (La identidad elegida solo cambia los prompts `es.ts`/`en.ts` + `lite-mode.ts` + `onboarding-prompts.ts` y el nombre del chat demo del landing.)

## 7. Consideraciones futuras (no ahora)

- **Dialecto por país** vía código de país del número de WhatsApp (hoy sin usar): ES-España vs ES-LatAm ("vosotros"/"ustedes", "trotar"/"correr", modismos). Factible sin pedir nada al usuario. Solo considerar.
- **Modo rendimiento** detallado (VDOT/ritmos/estructura) para quien declara meta de carrera — el sistema actual ya lo hace; se conserva tras la bifurcación.

## 8. Qué toca en código (punteros, no implementación)

- **Onboarding**: `onboarding-completer.ts` / flujo — cambiar "meta de carrera obligatoria" por "¿por qué corres?" con rama casual/rendimiento.
- **Prompts**: `prompts/es.ts` / `en.ts` / `lite-mode.ts` / `onboarding-prompts.ts` — persona + reglas de lenguaje del §3 + arco del §4.
- **Formato de plan**: `plan-generator` / `training-plan-generator.ts` — salida casual (min + sensación, sin ritmos) vs rendimiento.
- **Gamificación**: `gamification-service.ts` — etapas de hábito del §5 (ya pendiente como B2).
- **Landing**: `content.tsx` — hero/pricing/copy alineados al casual-first (cuando se decida ejecutar).
