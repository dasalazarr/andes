# Andes Landing Base Solution (360)

## 1) Concepto aplicado

La landing está diseñada para una sola misión de negocio:

**convertir visita web en inicio de conversación por WhatsApp.**

La experiencia prioriza claridad, confianza y acción rápida.

No intenta educar todo el producto en la primera pantalla.

Primero resuelve la pregunta del usuario novato:

“¿Esto me sirve a mí y puedo empezar fácil sin pagar?”

### Principios UX aplicados

1. **Claridad inmediata:** “coach en WhatsApp”, “empieza gratis”, “sin bloqueo”.
2. **Confianza antes de complejidad:** pruebas sociales y seguridad primero.
3. **Freemium sin ambigüedad:** Free funcional siempre, Premium como optimización.
4. **Mobile first real:** CTA visible, densidad de contenido útil y hand-off corto.
5. **Humanización:** lenguaje cercano y enfoque en acompañamiento, no jerga técnica.

## 2) Objetivos, propósito y métricas

### Objetivo principal

Maximizar `Visitante -> Click CTA -> Inicio conversación WhatsApp`.

### Objetivos secundarios

1. Reducir rebote temprano por confusión de propuesta o pricing.
2. Aumentar confianza para novatos que temen lesión o complejidad.
3. Preparar transición natural a Premium sin devaluar Free.

### KPIs front instrumentados

1. `cta_free_click_rate`
2. `cta_premium_click_rate`
3. `pricing_view_to_whatsapp_start`
4. `faq_open_30_messages`
5. `conversation_started`

## 3) Estructura de página (orden y propósito)

La home se implementa en:

`src/components/home.tsx`

### Sección 1: Hero (minimal + glass premium)

- Componente: `src/components/HeroSection.tsx`
- Objetivo: explicar valor en 5 segundos y activar CTA.
- Mensajes clave:
  - Coach 24/7 en WhatsApp.
  - Empezar Gratis.
  - “Después de 30 mensajes inteligentes sigues en modo Lite (sin bloqueo).”
- CTAs:
  - Primario: `free`
  - Secundario: `premium`
- Resultado esperado: click temprano para usuarios de alta intención.

### Sección 2: Pricing temprano (Free vs Premium)

- Componente: `src/components/PricingSection.tsx`
- Objetivo: eliminar fricción de pricing cuanto antes.
- Contenido:
  - Cards Free y Premium.
  - Tabla comparativa de capacidades.
  - Mensaje explícito de no bloqueo en Free/Lite.
- Resultado esperado: menos abandono por dudas de “si no pago no sirve”.

### Sección 3: Cómo te transformamos

- Componente: `src/components/BenefitsSection.tsx`
- Objetivo: vender resultado y proceso simple en 3 pasos.
- Narrativa:
  1. Empiezas.
  2. Te acompañamos.
  3. Llegas a tu meta.
- Resultado esperado: mejor comprensión para novatos.

### Sección 4: Seguridad primero

- Componente: `src/components/ImpactIndicatorsSection.tsx`
- Objetivo: bajar ansiedad por lesión y reforzar progreso sostenible.
- Contenido:
  - Pilares de seguridad.
  - KPIs de transformación (NPS, finalización, lesiones, first race finish).
- Resultado esperado: aumentar confianza y permanencia en scroll.

### Sección 5: CTA intermedio

- Componente: bloque en `src/components/home.tsx`
- Objetivo: reactivar intención después de explicar transformación y seguridad.
- CTAs duplicados:
  - Empezar Gratis
  - Desbloquear Premium

### Sección 6: Testimonios y GRIT

- Componentes:
  - bloque de testimonios en `src/components/home.tsx`
  - `src/components/grit/GritSection.tsx`
- Objetivo: prueba social y validación emocional.
- Resultado esperado: credibilidad para “personas como yo”.

### Sección 7: Blog highlights

- Componente: `src/features/blog/components/BlogHighlights.tsx`
- Objetivo: contenido de apoyo para educación y SEO.
- Nota: es soporte de confianza, no CTA principal del funnel.

### Sección 8: FAQ obligatoria

- Componente: `src/components/FAQSection.tsx`
- Preguntas críticas:
  - Qué pasa tras 30 mensajes.
  - Qué incluye Premium.
  - Si Andes deja de funcionar si no pagas.
- Resultado esperado: resolver objeciones finales antes de clic.

### Sección 9: CTA final + Sticky CTA mobile

- Componente: bloques en `src/components/home.tsx`
- Objetivo:
  - Cierre de conversión al final del recorrido.
  - CTA persistente en móvil para hand-off rápido.

## 4) Arquitectura de implementación

### Capa de contenido (copy y estructura)

Toda la base de mensajes por idioma vive en:

`src/data/content.tsx`

Esto permite escalar copy y orden de secciones sin tocar lógica de negocio.

### Capa de presentación

Componentes UI por sección:

`src/components/*`

La home orquesta composición, orden y callbacks.

### Capa de conversión (onboarding)

Flujo centralizado en:

`src/lib/onboarding.ts`

Responsabilidades:

1. Emitir eventos de analytics por placement e intent.
2. Llamar `POST /onboarding/start`.
3. Redirigir al `whatsappLink`.

Fallback en home:

`/start?flow={intent}&language={language}`

### Capa visual y design system

Estilos globales y utilidades glass en:

`src/index.css`

Clase base premium:

`.glass-card-premium`

### Capa de analítica

Eventos utilitarios:

`src/utils/analytics.ts`

Eventos legacy/complementarios:

`src/lib/analytics.ts`

## 5) Infraestructura actual

### Frontend

- React 18 + TypeScript + Vite.
- Routing por idioma (`/` y `/es`).
- Build multilenguaje (`build:en`, `build:es`).

### Backend de onboarding

- Endpoint activo:
  `https://v3-production-2670.up.railway.app/onboarding/start`
- Método: `POST`
- Payload: `{ intent: "free" | "premium", language: "es" | "en" }`

### Integraciones

- Google Analytics vía `gtag`.
- Redirección a WhatsApp mediante link generado por backend.

## 6) Escalabilidad: reglas para próximos cambios

1. **No romper el funnel principal.**
   Cualquier sección nueva debe justificar impacto en `conversation_started`.

2. **Copy primero en `content.tsx`.**
   Evita hardcodear textos en componentes.

3. **CTA unificado siempre.**
   Todos los CTAs que convierten deben usar `startOnboarding()`.

4. **Mantener mensajes críticos en 3 lugares:**
   Hero, Pricing y FAQ para consistencia legal/comercial.

5. **No introducir complejidad visual gratuita.**
   El objetivo es conversión, no exploración estética.

6. **Mobile es baseline.**
   Si algo se ve bien en desktop y mal en móvil, se considera no terminado.

## 7) Mapa rápido de archivos críticos

1. `src/components/home.tsx`  
   Orquestación completa del funnel.

2. `src/components/HeroSection.tsx`  
   Primer impacto y CTAs principales.

3. `src/components/PricingSection.tsx`  
   Freemium clarity y hand-off por planes.

4. `src/components/FAQSection.tsx`  
   Objeciones críticas y evento FAQ.

5. `src/lib/onboarding.ts`  
   Contrato de conversión único.

6. `src/data/content.tsx`  
   Modelo de contenido por idioma.

7. `src/index.css`  
   Tokens visuales y glass premium.

## 8) Checklist operativo para otro desarrollador

Antes de tocar la landing:

1. Leer este documento completo.
2. Validar impacto esperado en KPIs de conversión.
3. Definir si el cambio es de copy, layout o flujo.
4. Confirmar que CTAs usan `startOnboarding`.
5. Revisar consistencia ES/EN.

Antes de merge:

1. `npm run type-check`
2. `npm test`
3. Revisión visual en móvil y desktop.
4. Verificación manual de CTAs a WhatsApp.
5. Confirmar que Hero/Pricing/FAQ siguen alineados en mensaje de límite.

## 9) Asunciones actuales

1. La prioridad de negocio sigue siendo adquisición por WhatsApp.
2. El backend de onboarding se mantiene en Railway.
3. El tráfico principal sigue siendo móvil.
4. El público principal sigue siendo corredor principiante en LatAm y España.

Si alguna de estas cambia, se debe ajustar el orden y la narrativa de secciones.

