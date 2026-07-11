# onboarding-funnel Specification

## Purpose

El objetivo único de la landing es convertir visitantes en conversaciones de WhatsApp iniciadas. Esta spec fija cómo los CTAs llegan al backend y qué invariantes de copy no pueden romperse. Contraparte backend: spec `onboarding-contract` en `v3/v3/openspec/`.

## Requirements

### Requirement: Todo CTA pasa por el flujo unificado

Todo CTA de conversión SHALL usar `startOnboarding({ intent, language, placement, source? })` de `src/lib/onboarding.ts` (que llama `POST /onboarding/start`). Los intents válidos son `free`, `premium` y `ambassador`. Prohibidos los links `wa.me/` ad-hoc — pierden routing y analytics.

#### Scenario: Nuevo CTA añadido
- **WHEN** se agrega un botón/CTA de conversión en cualquier sección
- **THEN** dispara `startOnboarding` con un intent válido vía onClick (no `href` a anclas) y emite su evento de analytics

### Requirement: Página de embajadoras

La landing SHALL exponer las rutas `/embajadores` y `/es/embajadores` (ambas en español) con: hero aspiracional, rol de embajadora, beneficios, proceso en 3 pasos, bloque de fundadoras y FAQ. Copy en `ambassadorsContent` dentro de `src/data/content.tsx`; página en `src/components/AmbassadorsPage.tsx`; rutas incluidas en el sitemap.

#### Scenario: Visitante abre /embajadores
- **WHEN** una visitante navega a `/embajadores`
- **THEN** ve la página en español con SEO propio (title/canonical vía Helmet) y CTAs que disparan `startOnboarding('ambassador')`

### Requirement: Atribución de origen en CTAs

`startOnboarding` SHALL capturar un `source` opcional (`?source=` en la URL, patrón `[a-zA-Z0-9:_-]{1,64}`, persistido en sessionStorage) y enviarlo en el body de `POST /onboarding/start` para que el backend lo codifique en el deep link.

#### Scenario: QR de evento
- **WHEN** una asistente llega desde un QR con `?source=event:pamplona-jul23` y pulsa cualquier CTA
- **THEN** el request a `/onboarding/start` incluye ese `source` aunque haya navegado entre páginas antes de pulsar

### Requirement: Copy alineado con la política freemium del backend

El copy de Hero, Pricing y FAQ SHALL reflejar la política real: free nunca se bloquea (Lite Mode tras 30 mensajes inteligentes), trial Premium de 15 días, templates proactivos solo Premium. Si `SMART_MESSAGE_CAP`, el trial o los estados de suscripción cambian en `v3/`, los strings de `src/data/content.tsx` cambian en el mismo PR.

#### Scenario: Cambio de política en backend
- **WHEN** cambia una regla freemium en `v3/v3/`
- **THEN** el mismo change set actualiza `src/data/content.tsx` (ES y EN) y `docs/12-freemium-premium-model.md`

### Requirement: Copy bilingüe centralizado

Todo copy visible SHALL vivir en `src/data/content.tsx` (ES/EN); los componentes solo consumen. El dominio público en SEO/JSON-LD SHALL ser `https://andesrc.com`.

#### Scenario: Cambio de wording
- **WHEN** se modifica un texto de una sección
- **THEN** el cambio se hace en `content.tsx` en ambos idiomas, no en el JSX del componente
