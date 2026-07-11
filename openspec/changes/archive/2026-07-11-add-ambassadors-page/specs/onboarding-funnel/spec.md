# Delta: onboarding-funnel — add-ambassadors-page

## ADDED Requirements

### Requirement: Página de embajadoras

La landing SHALL exponer la ruta `/embajadores` (ES) con: hero aspiracional dirigido a mujeres de Pamplona, descripción del rol, beneficios (Premium gratis, acceso a eventos, referidos "próximamente", kit), proceso en 3 pasos, social proof de fundadoras y FAQ. Copy en `ambassadorsContent` dentro de `src/data/content.tsx`.

#### Scenario: Visitante abre /embajadores
- **WHEN** una visitante navega a `/embajadores`
- **THEN** ve la página completa en español, indexable (SEO en `SeoManager`, incluida en el sitemap) y se emite `ambassador_page_view`

#### Scenario: Solicitud de embajadora
- **WHEN** la visitante pulsa el CTA principal de la página
- **THEN** se dispara `startOnboarding('ambassador')`, se emite `ambassador_cta_click` y se abre WhatsApp con el mensaje prellenado de aplicación

### Requirement: Atribución de origen en CTAs

`startOnboarding` SHALL aceptar un `source` opcional (`event:{slug}` | `amb:{code}` | `landing`) que viaja en el body de `POST /onboarding/start` y queda codificado en el deep link, para que el backend atribuya la usuaria a su embajadora o evento de origen.

#### Scenario: QR de evento
- **WHEN** una asistente llega desde un QR con `?source=event:pamplona-jul23` y pulsa un CTA
- **THEN** el request a `/onboarding/start` incluye ese `source` y el link de WhatsApp resultante lo preserva

## MODIFIED Requirements

### Requirement: Todo CTA pasa por el flujo unificado

Todo CTA de conversión SHALL usar `startOnboarding(intent, source?)` de `src/lib/onboarding.ts` (que llama `POST /onboarding/start`). Los intents válidos son `free`, `premium` y `ambassador`. Prohibidos los links `wa.me/` ad-hoc — pierden routing y analytics.

#### Scenario: Nuevo CTA añadido
- **WHEN** se agrega un botón/CTA de conversión en cualquier sección
- **THEN** dispara `startOnboarding` con un intent válido vía onClick (no `href` a anclas) y emite su evento en `src/lib/analytics.ts`
