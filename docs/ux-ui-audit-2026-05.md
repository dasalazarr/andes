# Auditoría UX/UI — Landing Andes Coach

**Fecha**: 2026-05-11
**Alcance**: `andes/andes/` (landing público / funnel a WhatsApp)
**Objetivo**: maximizar conversión a "iniciar conversación por WhatsApp" y comunicar el diferenciador real (coach IA con memoria que adapta carga y previene lesiones).
**Stack relevante**: React 18 + Vite + Tailwind + Radix + Framer Motion + GSAP. Bilingüe ES/EN. Copy en `src/data/content.tsx`. CTAs vía `src/lib/onboarding.ts` → `POST /onboarding/start` → `wa.me/`.

> Nota previa: el `--design-system` del skill `ui-ux-pro-max` devolvió "Vibrant & Block-based / Orbitron + JetBrains Mono / orange primary". Esa estética es gaming/cyberpunk y no encaja con un coach empático para principiantes. **Se descartó**. La auditoría se construyó sobre el sistema actual (oscuro con verde acento), que es la elección correcta.

---

## 1. Diagnóstico ejecutivo

**Lo que funciona** — propuesta clara ("primera maratón sin lesiones"), CTA primario inequívoco a WhatsApp, política freemium honesta (Lite Mode, no bloqueo), FAQ que aborda objeciones reales, testimonios con resultados concretos.

**Lo que erosiona conversión**

1. El diferenciador "coach que aprende y previene lesiones" se nombra pero no se *demuestra* en el demo de chat.
2. "How It Works" y "How We Transform Your Journey" son redundantes.
3. La sección Pricing no comunica visualmente que Premium es la opción recomendada.
4. Falta prueba social *above the fold* (rating, número de corredores, logo de WhatsApp en el CTA).
5. La KPI bar mezcla outcomes con promesas y la nota "(beta)" en NPS resta credibilidad sin enmarcarla.
6. Los testimonios no tienen rostro.
7. Tabs de navegación aparecen dentro de la FAQ, rompiendo jerarquía.
8. **Bug crítico**: los CTAs de Pricing apuntan a `#pricing` en vez de disparar `startOnboarding()`.
9. Inconsistencia: la promesa temporal aparece como "1 minute" en Hero/How It Works y "3 minutos" en la KPI bar.

---

## 2. Sistema visual — ajustes al stack actual

| Eje | Ajuste recomendado |
|---|---|
| **Tipografía** | Conservar la actual si es Inter/Geist; descartar la sugerencia de Orbitron del skill. Para coach empático la pareja correcta es **Inter** o **Geist Sans** (cuerpo) + **Inter Display** o **Cabinet Grotesk** (titulares). Escala: 14 / 16 / 18 / 24 / 32 / 48 / 72. Body 16px mínimo en mobile (regla `readable-font-size`). |
| **Paleta** | Mantener fondo `slate-950` / verde acento. Definir tokens semánticos en Tailwind: `--bg`, `--bg-elevated`, `--fg`, `--fg-muted`, `--accent` (#22C55E), `--accent-press` (#16A34A), `--border` (#1F2937), `--whatsapp` (#25D366). El verde de Andes y el verde de WhatsApp deben ser **distintos** para que el botón "Start Free on WhatsApp" se lea como botón de WhatsApp, no como otro elemento de marca. |
| **Spacing rítmico** | Sistema 4/8: secciones `py-24 md:py-32`, gaps internos `gap-8 md:gap-12`, cards con `p-6 md:p-8`. Hoy varias secciones se sienten apretadas verticalmente. |
| **Estados** | Hover/focus obligatorios. Primario: `hover:brightness-110 active:scale-[0.98] focus-visible:ring-2 ring-offset-2 ring-[var(--accent)]` con transición 150–200ms. Secundario (outline): mismo tratamiento sin scale. |
| **Motion** | Framer Motion con `whileInView` + `viewport={{ once: true }}` para fade-up de secciones (y: 24, opacity: 0 → 1, duration: 0.5, ease: easeOut). GSAP solo donde se necesite scrub real (parallax sutil del Hero). **Respetar `prefers-reduced-motion`** envolviendo en `useReducedMotion()` y devolviendo variantes inertes. |
| **Iconos** | Migrar de `react-icons/fa` a **Lucide React** (más liviano, estilo coherente). Stroke 1.75. Eliminar emojis estructurales (✓ aceptables dentro del chat demo simulado, ✗ no en headlines ni badges como "⭐ MOST CHOSEN" → reemplazar por chip con ícono `Star`). |

---

## 3. Auditoría sección por sección

Cada problema: **severidad** · *por qué erosiona* · **acción**. Copy alternativo en bloques diff para copy-paste a `src/data/content.tsx`.

### 3.1 Hero (`HeroSection.tsx` + `heroContent`)

**P1. Ausencia de prueba social above the fold** — *Alta*
*Por qué:* el visitante no sabe si Andes es real. La promesa "primera maratón sin lesiones" es grande; sin anclaje (rating, # corredores, logos), el cerebro la descuenta.
**Acción:** trust strip sobre el headline o debajo de los CTAs: 3 avatares apilados + "Used by 6,782 runners this month" + ⭐ rating si existe fuente real.

**P2. El CTA primario no se lee como WhatsApp** — *Alta*
*Por qué:* dice "Start Free on WhatsApp" pero no tiene logo de WhatsApp. La lectura inmediata es "otro botón de marca".
**Acción:** ícono WhatsApp oficial (SVG inline o `react-icons/fa6` WhatsApp) a la izquierda del label. Mantener verde Andes con ícono WhatsApp blanco, o cambiar al verde WhatsApp `#25D366`.

**P3. El diferenciador "Lite Mode sin bloqueo" está enterrado** — *Media*
*Por qué:* es el argumento que neutraliza la objeción "¿gratis hasta cuándo?", pero está como microtexto gris pequeño.
**Acción:** convertir `limitNotice` en chip con ícono (lock-open/heart) sobre los CTAs: `[🔓 Free forever — no lockout]` con tooltip o link a FAQ.

**P4. La promesa "1 minute" se repite en 3 sitios pero no se cuantifica visualmente** — *Media*
**Acción:** badge encima del headline: `[ 60 SECONDS TO YOUR FIRST PLAN ]` uppercase, tracking ancho, accent green outline.

**P5. Foto de fondo compite con el texto** — *Baja*
**Acción:** overlay gradiente más oscuro (`bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent`) o reemplazar por composición más quieta.

**Copy alternativo Hero:**

```diff
// src/data/content.tsx → heroContent.es
- preheading: "Coach de running con IA",
+ preheading: "Coach de running por WhatsApp",
- description: "Un coach que se adapta a tu nivel, te acompaña cada kilómetro y te avisa antes de que te pases. Gratis, por WhatsApp.",
+ description: "Tu coach aprende cómo te sentiste hoy y ajusta el plan mañana. Te avisa antes de que te pases. Gratis, por WhatsApp.",
- limitNotice: "Gratis para siempre. Después de 30 mensajes inteligentes sigues en modo Lite, sin bloqueo.",
+ limitNotice: "Gratis para siempre · Sin tarjeta · Sin bloqueo",
- keyBenefits: "Sin descargas • Respuesta en 1 minuto • Prevención de lesiones",
+ keyBenefits: "Sin descargas · Plan en 60 segundos · Prevención de lesiones de fábrica",

// heroContent.en
- preheading: "AI running coach",
+ preheading: "Running coach on WhatsApp",
- description: "A coach that adapts to your level, supports you every kilometer, and warns you before you overdo it. Free, on WhatsApp.",
+ description: "Your coach learns how you felt today and adjusts tomorrow. Warns you before you push too hard. Free, on WhatsApp.",
- limitNotice: "Free forever. After 30 smart messages, you continue in Lite mode — no lockout.",
+ limitNotice: "Free forever · No card · No lockout",
- keyBenefits: "No downloads • Responds in 1 minute • Injury prevention built-in",
+ keyBenefits: "No downloads · First plan in 60 seconds · Injury prevention built-in",
```

*Razón:* "se adapta a tu nivel" es vago. "Aprende cómo te sentiste hoy y ajusta mañana" es específico, demuestra el diferenciador (memoria + adaptación) en una frase que un humano usa.

### 3.2 Conversación demo (`ChatDemo.tsx` / `InteractiveBotDemo.tsx` + `productDemoContent`)

**P1. El demo no demuestra el diferenciador** — *Alta*
*Por qué:* la conversación actual ("user dice objetivo → coach pide días → coach genera plan") es exactamente "How It Works" duplicado. No muestra **memoria**, **detección de fatiga** ni **prevención de lesiones**.
**Acción:** rediseñar en dos turnos que muestren *adaptación con memoria*:

```diff
// productDemoContent.es.messages
- { from: "coach", text: "¡Hola! 👋 Soy Andes, tu coach de running. ¿Cuál es tu objetivo?" },
- { from: "user", text: "Quiero correr mi primer 10K sin lesionarme" },
- { from: "coach", text: "¡Gran meta! 💪 Vamos a crear tu plan. ¿Cuántos días por semana puedes entrenar?" },
- { from: "user", text: "3 días" },
- { from: "coach", text: "Perfecto. Tu plan para esta semana:\n\n🏃 Lun — 3km trote suave\n🧘 Mié — 30min caminata rápida\n🏃 Vie — 4km con pausas\n\n¿Empezamos mañana?" },
+ { from: "user", text: "Hoy hice 5K pero la rodilla derecha me molesta un poco." },
+ { from: "coach", text: "Gracias por contarme. Hoy descansas. Mañana caminata 25 min en lugar de los 6K que tocaban — bajamos carga 30% mientras la molestia cede.\n\nSi sigue mañana, lo marcamos para revisar antes del fin de semana." },
+ { from: "user", text: "Listo. ¿Y la carrera del domingo?" },
+ { from: "coach", text: "Si la rodilla mejora antes del viernes, llegamos. Si no, movemos el rodaje largo a 8K en vez de 12K. Tu meta de 21K en marzo no se mueve — solo este micro." },

// productDemoContent.en.messages
+ { from: "user", text: "Did 5K today but my right knee feels a little off." },
+ { from: "coach", text: "Thanks for flagging. Rest today. Tomorrow's 6K becomes a 25-min walk — load down 30% until it settles.\n\nIf it's still there tomorrow, we'll review before the weekend." },
+ { from: "user", text: "Got it. What about Sunday's race?" },
+ { from: "coach", text: "If your knee clears by Friday, we're on. If not, the long run becomes 8K instead of 12K. Your March 21K goal stays — only this micro shifts." },
```

Esto demuestra: (a) memoria del plan original, (b) ajuste de carga con número (-30%), (c) prevención de lesión proactiva, (d) que la meta global no se rompe.

**P2. La conversación es estática** — *Media*
*Por qué:* un chat que no anima se siente muerto.
**Acción:** animar entrada de mensajes con stagger 600–800ms + typing indicator (dots) antes del mensaje del coach. Framer Motion `AnimatePresence` con `layout`. Respetar `prefers-reduced-motion` mostrando todo de golpe.

**P3. Falta CTA dentro o inmediatamente después del demo** — *Alta*
**Acción:** botón sticky bajo el demo: "Try it yourself in WhatsApp →" que dispare `startOnboarding('free')`.

### 3.3 How It Works (`howItWorksContent`)

**P1. Redundancia con "How We Transform Your Journey"** — *Alta*
**Acción:** mantener "How It Works" como **proceso** con tiempos visibles `0:00 → 0:30 → 1:00`. Reformular "How We Transform" a **outcomes** (§3.4).

**P2. Falta ancla temporal de los 60 segundos** — *Media*

```diff
// howItWorksContent.es.steps
  steps: [
    { iconName: "MessageCircle",
+     timeBadge: "0:00",
      title: "Escríbenos por WhatsApp", description: "Sin descargas. Solo envía un mensaje y empezamos." },
    { iconName: "ClipboardList",
+     timeBadge: "0:30",
      title: "Responde 3 preguntas", description: "Tu nivel, tu objetivo, tu disponibilidad. Eso es todo." },
    { iconName: "Zap",
+     timeBadge: "1:00",
      title: "Recibe tu plan personalizado",
-     description: "Listo para entrenar en menos de 1 minuto.",
+     description: "Listo para entrenar. Adaptado a tu nivel real, no a una plantilla genérica.",
    },
  ],
```

Replicar misma estructura en `.en`.

### 3.4 How We Transform Your Journey (`benefitsContent`)

**P1. Sección redundante con How It Works** — *Alta*
**Acción:** convertir en **resultados** (no pasos):

```diff
// benefitsContent.es
- sectionTitle: "Cómo te transformamos",
+ sectionTitle: "Lo que vas a ganar",
- sectionSubtitle: "No vendemos tecnología fría. Te acompañamos para que termines tu primera carrera sin entrenar solo.",
+ sectionSubtitle: "Tres cosas concretas que no encuentras en un PDF de Google.",
  benefits: [
-   { headline: "1. Empieza hoy",
-     copy: "Escribes por WhatsApp y te damos un plan claro según tu nivel real.",
-     proof: "Activación guiada en minutos", ... },
+   { headline: "Un coach que recuerda",
+     copy: "Recuerda cómo te fue el martes y ajusta el viernes. Sin volver a explicarle quién eres.",
+     proof: "Memoria persistente · Sin re-onboarding", ... },
-   { headline: "2. Acompañamiento diario",
-     copy: "Ajustamos cargas con tu feedback para sostener constancia y motivación.",
-     proof: "Seguimiento por chat 24/7", ... },
+   { headline: "Un plan que se mueve contigo",
+     copy: "¿Mala noche, dolor, viaje? El plan se reordena solo. Sin culpa, sin re-empezar.",
+     proof: "Re-cálculo de carga diario", ... },
-   { headline: "3. Llegas a tu meta",
-     copy: "Progresas con una ruta sostenible para terminar tu primera carrera con confianza.",
-     proof: "Progresión personalizada de inicio a meta", ... },
+   { headline: "Una alarma antes de la lesión",
+     copy: "Detecta sobrecarga (ACWR > 1.5) antes de que te lesiones y reduce el volumen automáticamente.",
+     proof: "Prevención de lesiones de fábrica", ... },
  ],

// benefitsContent.en
- sectionTitle: "How We Transform Your Journey",
+ sectionTitle: "What you actually get",
- sectionSubtitle: "We do not sell cold tech. We support you so you can finish your first race without training alone.",
+ sectionSubtitle: "Three things you won't find in a PDF plan from Google.",
+ benefits[0]: headline "A coach that remembers"  · copy "Remembers Tuesday's session and adjusts Friday's. No re-explaining who you are."  · proof "Persistent memory · No re-onboarding"
+ benefits[1]: headline "A plan that moves with you"  · copy "Bad night, sore knee, travel? The plan reshuffles itself. No guilt, no restart."  · proof "Daily load recalculation"
+ benefits[2]: headline "An alarm before injury"  · copy "Detects overload (ACWR > 1.5) before you get injured and dials back volume automatically."  · proof "Injury prevention built in"
```

### 3.5 Well-being and sustainable progress (`indicatorsContent`)

**P1. Pillars corporativos** — *Baja*

```diff
// indicatorsContent.es.pillars
- "Ajustes de carga según cómo te sentiste hoy.",
+ "Hoy te sentiste pesado → mañana entrenas 20% menos.",
- "Prevención de lesión antes que métricas de ego.",
+ "Si vamos camino a sobrecarga, frenamos antes — no después.",
- "Progresión sostenible para crear hábito real."
+ "Sumas semanas, no kilómetros heroicos sin pausa."

// indicatorsContent.en.pillars
- "Training load adjusts from how you felt today.",
+ "Felt heavy today → tomorrow's session drops 20%.",
- "Injury prevention comes before vanity metrics.",
+ "Heading toward overload? We pull back before it happens, not after.",
- "Sustainable progression that builds a real habit."
+ "Stack weeks, not heroic km that break you."
```

### 3.6 KPI bar (`ImpactIndicatorsSection.tsx`)

**P1. Mezcla outcomes con compromisos sin contraste visual** — *Media*
*Por qué:* "72 NPS" y "64% completion" son **resultados**; "3 minutos" y "24/7" son **promesas**.
**Acción:** dos bloques visuales separados — Bloque A "Outcomes" (con disclaimer beta), Bloque B "Promises".

**P2. "(beta)" sin enmarcado correcto resta** — *Media*
**Acción:** disclaimer a la izquierda como chip: `[ Datos beta · Primeros 350 usuarios ]` (con número específico si existe).

**P3. "3 minutos para tu primer plan" contradice el "1 minute" del Hero** — *Alta — bug de copy*
**Acción:** unificar a **60 segundos** en todos los lugares (Hero, How It Works, KPI bar).

### 3.7 Testimonios (`testimonialsContent` + componente carousel)

**P1. Sin foto de los autores** — *Alta*
**Acción:** añadir campo `avatar: "/testimonials/ana.jpg"` en cada testimonio. Si no hay fotos reales, avatares con iniciales sobre fondo de marca + disclaimer ("Beta tester · Foto reservada por privacidad").

**P2. Solo se ve un testimonio** — *Media*
**Acción:** grid `md:grid-cols-3` en desktop, carousel solo en mobile. Mostrar `result` ("42.2km in 4:15") como chip destacado al pie de cada card.

**P3. Tres tags ilegibles "S/E/I" debajo del testimonio** — *Alta*
*Por qué:* son botones circulares verdes con letras (parecen avatares de iniciales rotando entre testimonios). El usuario no sabe que son botones de navegación.
**Acción:** reemplazar por dots clásicos (●○○) con `aria-label="Testimonio 1 de 3"`.

### 3.8 Free vs Premium (`PricingSection.tsx` + `pricingContent`)

**P1. Premium no se distingue visualmente de Free** — *Alta*
**Acción:** Premium debe tener:
- Border `border-emerald-500/40` y `shadow-[0_0_60px_-15px_rgba(34,197,94,0.5)]` (glow suave).
- Badge superior derecho con ícono Lucide `Star`: `[★ MÁS ELEGIDO]` en chip verde sólido.
- `scale-[1.02]` solo en desktop.

**P2. Política Lite Mode aparece sólo como nota arriba, no como diferenciador en el plan Free** — *Alta*
**Acción:** primer feature del plan Free debe ser prominente: `🔓 Sin bloqueo · Funciona después del umbral`.

**P3. Falta la garantía de 30 días en la card Premium** — *Alta*

```diff
// pricingContent.es.plans[1] (Premium)
+ guarantee: "30 días de garantía · Devolvemos tu dinero si no ves resultados",

// pricingContent.en.plans[1]
+ guarantee: "30-day guarantee · Money back if you don't see results",
```

Mostrarla bajo el CTA con ícono escudo (Lucide `ShieldCheck`).

**P4. Annual price ($8.49/mes facturado anual) está en data pero no visible** — *Media*
**Acción:** toggle Mensual/Anual sobre las cards. Activar Anual por defecto si la conversión es mejor (A/B test).

**P5. ⚠️ BUG CRÍTICO: las CTAs de pricing apuntan a `#pricing`** — *Alta*
*Por qué:* `href: "#pricing"` no inicia la conversación de WhatsApp; lleva al ancla actual (loop).
**Acción:** ambas deben llamar a `startOnboarding('free')` y `startOnboarding('premium')` desde `src/lib/onboarding.ts`. Eliminar `href` y usar `onClick`. **Este es probablemente el cambio con mayor impacto en conversión.**

**P6. La fila de comparación tiene "Yes/No" pero no enseña el matiz Lite Mode** — *Baja*

```diff
// pricingContent.es.comparisonRows
- { feature: "Modo Lite sin bloqueo", free: "Sí", premium: "Sí" },
+ { feature: "Acceso continuo al coach", free: "Lite Mode", premium: "Completo" },
```

Tooltip sobre "Lite Mode". Mismo cambio en `.en`.

### 3.9 FAQ (`FAQSection.tsx`)

**P1. Tabs "Home / How it works / Reviews / Plans / Learn" dentro de la FAQ** — *Alta — confusión grave*
**Acción:** o eliminar las tabs, o convertirlas en filtros de FAQ con etiquetas claras: `Todas (7) · Cómo funciona (3) · Pago (2) · Lesiones (2)`. Si no son filtros, **borrar**.

**P2. Orden de las preguntas** — *Media*
*Por qué:* hoy abre con "¿Y si me lesiono siguiendo el plan?". El orden ideal por probabilidad de duda: gratis → for-me → diferencia con Google → lesión → workout perdido → equipo → cancelar.
**Acción:** reordenar el array `faqs` en `faqContent.es` y `.en`.

### 3.10 CTA final (`CTASection.tsx` + `ctaContent`)

**P1. Copy genérico** — *Media*

```diff
// ctaContent.es
- title: "¿Listo para Empezar tu Aventura?",
+ title: "Tu primer plan está a 60 segundos.",
- subtitle: "Únete a la comunidad de Andes Runners hoy y lleva tu carrera al siguiente nivel. Te esperamos para conquistar cimas juntos.",
+ subtitle: "Sin descargas. Sin tarjeta. Sin bloqueo. Solo abre WhatsApp.",
- buttonText: "Comienza ahora",
+ buttonText: "Empezar Gratis por WhatsApp",

// ctaContent.en
- title: "Ready to Start Your Adventure?",
+ title: "Your first plan is 60 seconds away.",
- subtitle: "Join the Andes Runners community today and take your running to the next level. We're waiting for you to conquer peaks together.",
+ subtitle: "No download. No card. No lockout. Just open WhatsApp.",
- buttonText: "Start now",
+ buttonText: "Start Free on WhatsApp",
```

**P2. Dos CTAs después de la FAQ diluyen** — *Media*
**Acción:** un solo CTA primario + link secundario debajo en texto plano: "Or [see Premium plans →]".

### 3.11 Footer

**P1. Las columnas "Guides / Race Calendar" sugieren funcionalidad que puede no existir** — *Media*
**Acción:** verificar que esos links no estén muertos. Si "Race Calendar" no existe, no prometerlo (rompe confianza).

---

## 4. Lista priorizada de cambios

### ⚡ Quick wins — 1–2 horas

| # | Cambio | Archivo | Impacto |
|---|---|---|---|
| 1 | **Bug crítico**: pricing CTAs apuntan a `#pricing`. Cambiar a `startOnboarding('free' \| 'premium')` | `src/components/PricingSection.tsx` + `src/lib/onboarding.ts` | Alto — conversión directa |
| 2 | Unificar promesa temporal a **60 segundos** en Hero, KPI bar y How It Works | `src/data/content.tsx` | Medio — coherencia |
| 3 | Añadir ícono WhatsApp al CTA primario del Hero | `HeroSection.tsx` | Alto — CTR |
| 4 | Reescribir `productDemoContent` para mostrar memoria + prevención de lesiones (§3.2) | `src/data/content.tsx` | Alto — diferenciador |
| 5 | Añadir `guarantee` a `pricingContent.*.plans[1]` y mostrarla bajo el CTA Premium | `src/data/content.tsx` + `PricingSection.tsx` | Medio — reduce fricción |
| 6 | Reescribir copy del CTA final (`ctaContent`) | `src/data/content.tsx` | Medio |
| 7 | Reordenar `faqContent` por probabilidad de objeción | `src/data/content.tsx` | Bajo — UX |
| 8 | Eliminar/clarificar las tabs dentro de la FAQ | `FAQSection.tsx` | Medio |
| 9 | Convertir `limitNotice` del Hero en chip prominente | `HeroSection.tsx` | Medio |
| 10 | Eliminar emoji "⭐" del `popularBadge` y usar ícono Lucide `Star` | `pricingContent` + `PricingSection.tsx` | Bajo — polish |

### 🛠️ Estructurales — 1–2 días

| # | Cambio | Archivos | Impacto |
|---|---|---|---|
| A | Rediseñar Pricing card Premium con border glow, badge visible, scale + toggle Mensual/Anual | `PricingSection.tsx` | Alto |
| B | Decidir si "How We Transform" se elimina o se reformula a outcomes (§3.4) y aplicar | `BenefitsSection.tsx` + `benefitsContent` | Alto — claridad |
| C | Animar el chat demo con typing indicator y mensajes apareciendo con stagger; respetar reduced-motion | `ChatDemo.tsx` / `InteractiveBotDemo.tsx` | Alto — engagement |
| D | Trust strip above the fold (avatares + rating + counter) | `HeroSection.tsx` (sección nueva) | Alto |
| E | Testimonios con foto + grid 3-up en desktop + chip de result; reemplazar dots S/E/I | componentes testimonials + `testimonialsContent` | Medio |
| F | KPI bar dividida en Outcomes vs Promises con disclaimer beta enmarcado | `ImpactIndicatorsSection.tsx` | Medio |
| G | Migrar íconos de `react-icons/fa` a Lucide React unificando estilo (stroke 1.75) | `src/data/content.tsx` (icon refs) + componentes | Medio — polish |
| H | Tokens semánticos de color en `tailwind.config.js` (`accent`, `accent-press`, `whatsapp`, `bg-elevated`, `border`) y refactorizar | `tailwind.config.js` + componentes | Medio — sistema |

---

## 5. Accesibilidad (validar antes de release)

**Contraste sobre fondo oscuro (#1F2937):**

- Texto blanco `#F8FAFC` → ratio 14.6:1 ✓ AAA.
- Muted típico `gray-400` (#9CA3AF) → 5.4:1 ✓ AA. **Nunca** usar `gray-500` para body (3.7:1, falla AA).
- Verde acento `#22C55E` → 4.6:1. Justo en el límite. Para body ≤18px regular o ≤14px bold, oscurecer a `#16A34A` (5.7:1) o `#34D399` (7.8:1).
- Botón primario: texto `#0F172A` sobre `#22C55E` → 8.5:1 ✓ AAA. **No** usar texto blanco sobre verde acento (2.5:1, falla).

**Foco visible:**

- CTAs: `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:ring-emerald-400`. Verificar que no exista `outline: none` sin reemplazo.
- Acordeones FAQ (Radix Accordion) deben mantener el ring nativo.

**Jerarquía semántica:**

- Un solo `<h1>` por página (el del Hero). Revisar que ninguna sección use `<h1>`.
- Section titles `<h2>`, sub-bloques `<h3>`. Nunca saltar de `<h2>` a `<h4>`.

**Alt text:**

- `indicatorsContent.image.alt` correcto. Verificar que **todas** las imágenes (testimonials photos, pricing card images, city community images) tengan `imageAlt` no vacío y descriptivo.
- Logos en footer: `alt="Andes Coach"`, no `alt="logo"`.

**Motion:**

- `useReducedMotion()` en Hero, ChatDemo, scroll-triggered sections. Si `true`, variantes sin transform/opacity.
- Carousel testimonios: pausar autoplay en hover y cuando reduced-motion activo.

**Forms (`PlanRequestForm`, `MultiStepPlanForm`, `LeadMagnetModal`):**

- Labels visibles (no solo placeholder).
- `inputMode="email"` / `"tel"` para teclado correcto en mobile.
- Errores con `aria-live="polite"` cerca del campo afectado.

**WhatsApp link contract:**

- El `href` final debe ser `https://wa.me/...` directo. Sin link tracker entre medio (rompe deep link móvil y a11y).

---

## 6. Métricas a medir post-cambio

Instrumentar en `src/lib/analytics.ts` y comparar antes/después:

1. **CTR del CTA primario del Hero** (clic / vista). Hipótesis: +20% con ícono WhatsApp.
2. **Clic-through del demo de chat al CTA siguiente**. Hipótesis: +30% con la conversación rediseñada (§3.2).
3. **Conversión Pricing → onboarding**. Hipótesis: +40% solo por arreglar el bug `href: "#pricing"` (P5 §3.8).
4. **Bounce rate en FAQ**. Hipótesis: -10% al limpiar las tabs.
5. **Scroll depth hasta el CTA final**. Si se fusiona How It Works + How We Transform, debería aumentar (menos fatiga).

---

## 7. Orden de ejecución recomendado

1. **Día 1 (quick wins)**: #1 (bug pricing) → #4 (chat demo copy) → #3 (icono WhatsApp en Hero) → #2 (unificar 60s).
2. **Día 2 (quick wins)**: #5 (garantía Premium) → #6 (CTA final) → #9 (chip Lite Mode) → #8 (FAQ tabs).
3. **Sprint 1 (estructurales)**: A (Pricing Premium glow + toggle) + C (animar chat demo).
4. **Sprint 2 (estructurales)**: B (decidir destino de "How We Transform") + D (trust strip Hero).
5. **Sprint 3 (sistema)**: G (Lucide) + H (tokens Tailwind) + E (testimonios) + F (KPI bar).

Lanzar A/B donde sea posible — los cambios de copy/visual del Hero y Pricing son los mejores candidatos.

---

## Anexos

### A. Archivos tocados (referencia rápida)

- **Copy** (todo en `src/data/content.tsx`): `heroContent`, `productDemoContent`, `howItWorksContent`, `benefitsContent`, `indicatorsContent`, `testimonialsContent`, `pricingContent`, `faqContent`, `ctaContent`.
- **Componentes**: `HeroSection.tsx`, `ChatDemo.tsx`, `InteractiveBotDemo.tsx`, `HowItWorksSection.tsx`, `BenefitsSection.tsx`, `ImpactIndicatorsSection.tsx`, `PricingSection.tsx`, `FAQSection.tsx`, `CTASection.tsx`, testimonials components.
- **Lógica**: `src/lib/onboarding.ts` (verificar/exponer `startOnboarding(intent)`), `src/lib/analytics.ts` (eventos nuevos).
- **Tema**: `tailwind.config.js` (tokens semánticos).

### B. Contratos que NO se pueden romper

- `POST /onboarding/start` body `{ intent: "free" | "premium", language: "es" | "en" }` → responde `{ success: true, whatsappLink: "https://wa.me/..." }`. No cambiar de lado del frontend sin coordinar con `v3/v3/apps/api-gateway/src/flows/simplified-onboarding-flow.ts`.
- Política freemium: **Free nunca se bloquea**. Templates proactivos son **Premium-only** (excepto Guided Kickoff 7 días). Cualquier copy de pricing/Hero/FAQ debe respetar esto.
- `SMART_MESSAGE_CAP=30` es el umbral actual. Si cambia en `v3/`, actualizar en este landing en el mismo PR.
