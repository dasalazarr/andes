# Delta: onboarding-funnel — rebrand-experience-club

## ADDED Requirements

### Requirement: Sección Club en la home

La home SHALL incluir una sección `#club` (componente `ClubSection`, copy en `clubContent`) que presenta la experiencia física (quedadas en Pamplona) con un CTA de conversión a WhatsApp y un link a `/embajadores`. El CTA secundario del hero SHALL llevar a esta sección.

#### Scenario: Visitante interesada en el club
- **WHEN** la visitante pulsa "Conoce el club" en el hero
- **THEN** la página hace scroll a la sección Club, donde puede unirse por WhatsApp (`startOnboarding('free')`) o navegar a `/embajadores`

### Requirement: Verde de marca distinto del verde de conversión

Los acentos de marca (texto, íconos, bordes, chips) SHALL usar el token `brand` (#34D399); el token `whatsapp` (#25d366) SHALL usarse exclusivamente en botones cuya acción abre WhatsApp. Prohibido introducir nuevos hex verdes hardcodeados en componentes del funnel.

#### Scenario: Nuevo botón de conversión
- **WHEN** se agrega un botón que dispara `startOnboarding`
- **THEN** usa `bg-whatsapp` con ícono de WhatsApp; cualquier acento decorativo alrededor usa `brand`

### Requirement: Navegación del header funciona fuera de la home

Los items de navegación del header SHALL funcionar desde cualquier ruta: en la home hacen scroll a la sección; fuera de la home navegan a `{homePath}#{seccion}` y la home resuelve el hash al montar. El header SHALL tener fondo sólido (`bg-surface/90`) cuando está elevado, nunca flotar transparente sobre contenido.

#### Scenario: Usuario en /embajadores pulsa "Planes"
- **WHEN** el usuario pulsa "Planes" en el header estando en `/embajadores`
- **THEN** navega a la home y la página hace scroll a `#pricing`
