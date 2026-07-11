# PRD — Andes Experience Club: pivote a club de experiencia wellness (Pamplona)

**Fecha**: 2026-07-11
**Autor**: Diego + Claude (análisis cofounder)
**Alcance**: frontend (`andes/andes/`) + backend (`v3/v3/`) + operación de eventos en Pamplona
**Documentos relacionados**: `ux-ui-audit-2026-05.md` (auditoría de conversión), `v3/v3/docs/12-freemium-premium-model.md` (modelo comercial)

---

## 0. Contexto y misión

Notas de la reunión con emprendedor (jul-2026), destiladas:

- **Misión**: que el atleta promedio empiece a correr. La experiencia es el vehículo; la misión es el centro.
- **Tesis**: las tiendas físicas no cerraron porque venden experiencia. Andes debe vender experiencias físicas que conecten con tracción digital (quedadas, coffee run parties, carreras + aguas).
- **ICP nuevo**: público femenino, principiante, aspiracional. No rendimiento — accesibilidad. "Consigue enamorarte de correr en dos semanas."
- **Canal**: micro-influencers locales (ej. Pitu Follow) + partnerships con cafés/brunch/bares de Pamplona (bebidas y espacio a cambio de tráfico).
- **Piloto**: evento en ~2 semanas, jueves, con micro-influencer de tracción.
- **Producto digital**: agente que *de verdad funcione* para quien quiere empezar a correr. Entrenador virtual con identidad humana, enfocado a "tu primera carrera".
- **Activos a crear**: página `/embajadores` con beneficios y social proof; speech de presentación de producto; video de lanzamiento; contenido delegado a micro-influencers.
- **Futuro**: porcentaje de referidos para embajadores.
- **Pendientes operativos**: permisos de la comunidad para eventos.
- **Deseo del fundador**: mantener el lado técnico — indicadores que se adecúen a la experiencia del usuario, que el novato evolucione y lo vea.

### Alineación afortunada (no la desperdiciemos)

El producto **ya tiene** la mecánica de "enamórate de correr en dos semanas": el **trial Premium de 15 días** (`v3/v3/apps/api-gateway/src/utils/trial.ts`, `TRIAL_DAYS=15`). La promesa de marketing y la mecánica de producto son la misma cosa. Esto debe ser el eje del nuevo posicionamiento: *"Ven al evento → escanea el QR → 15 días de coach completo gratis → si en dos semanas no te has enamorado de correr, no pagas nada y nunca te bloqueamos."*

---

## 1. Análisis crítico de cofounder (léelo antes que el FODA)

Siendo directo, como pediste:

1. ~~La landing está caída~~ **[RESUELTO 11-jul]**: la landing volvió a estar en línea bajo el dominio nuevo **`andesrc.com`** (Netlify). `andesrunners.com` era una referencia residual en el código, nunca fue dominio propio — referencias limpiadas el 11-jul. **[RESUELTO 11-jul]** el segundo P0 del día: Neon Postgres agotó su cuota y suspendió la DB de producción; se migró a Railway Postgres el mismo día (runbook: `v3/v3/docs/13-neon-to-railway-migration.md`) y se endureció el arranque contra caídas de Qdrant. Infra estable para el piloto.

2. **La landing actual contradice el nuevo posicionamiento en un 180°.** Headline "Finish your first marathon injury-free", foto de hombre corriendo, estética dark/técnica, KPIs (NPS 72, ACWR), inglés por defecto. Todo grita "rendimiento, hombre, maratón". El nuevo ICP es mujer, principiante, social, aspiracional. **Pero**: no hagas un rebrand completo antes del piloto. Cambia solo lo que el tráfico del piloto va a ver (copy ES, hero, `/embajadores`) y valida con datos reales antes de rehacer el sitio entero. El rebrand total es una decisión post-piloto.

3. **Riesgo de latigazo estratégico.** La auditoría UX de mayo optimiza la conversión del posicionamiento *viejo*. Si ejecutamos sus 18 cambios y luego pivotamos el copy, quemamos 2–3 semanas. **Rescatar solo lo transversal**: el bug crítico de los CTAs de pricing (`#pricing` en vez de `startOnboarding()` — §3.8 P5 de la auditoría), la unificación de la promesa temporal, el ícono de WhatsApp en el CTA. Congelar el resto de la auditoría hasta decidir el rebrand.

4. **Los eventos no son el negocio; son el canal.** El negocio sigue siendo la suscripción al agente ($9.99/mes hoy). Cada evento debe medirse como canal de adquisición: coste por usuaria activada (asistente que registra su primer run en el agente). Si un evento cuesta 150€ (aguas, detalles, tiempo) y activa 10 usuarias, CAC = 15€ — necesitamos LTV > 15€ para que escale. Disciplina desde el evento #1.

5. **No construir software de eventos.** MVP operativo: grupo de WhatsApp + formulario (Luma/Tally) + QR en el evento. Lo único que se construye en código es **atribución** (saber qué usuaria vino de qué embajadora/evento). Todo lo demás es tentación de sobre-ingeniería.

6. **Timing local — San Fermín.** Hoy es 11-jul; Sanfermines termina el 14-jul. "Piloto en dos semanas" cae ~23–25 jul: timing *excelente* — la ciudad sale de fiestas y hay apetito real de "reset" de hábitos. Ángulo de comunicación regalado: *"Después de San Fermín, tu cuerpo te pide una tregua. Empecemos a correr."* Jueves 23-jul como fecha objetivo.

7. **Precio en USD es fricción absurda para España.** $9.99 en Gumroad para una usuaria de Pamplona genera desconfianza y comisión de cambio. Migrar a EUR (9,99 €) antes de empujar tráfico español de pago. La gamificación y los badges actuales también están mal calibrados para el ICP (ver §4.2).

8. **"Enfoque a mujeres" ≠ excluir hombres.** El posicionamiento es "tu primera carrera" (inclusivo); el *marketing* y la estética apuntan a mujeres. Eventos con rutas visibles, en grupo, de día — la seguridad percibida es un driver de decisión real para este público y una ventaja competitiva frente a "sal a correr sola con una app".

9. **Prueba social geográficamente incoherente.** Los testimonios actuales son de beta testers de CDMX ("Ana P., Mexico City"). Para Pamplona no valen nada. Las primeras embajadoras *son* la nueva prueba social — la página `/embajadores` y los testimonios locales se retroalimentan.

10. **Capacidad de un solo fundador.** Eventos + producto + contenido + partnerships no caben en una persona. La estructura de embajadoras/micro-influencers no es "nice to have": es el mecanismo de delegación (contenido delegado a micro-influencers, como dijo el emprendedor). Diseñar los beneficios de embajadora para que hagan el trabajo de crecimiento que tú no puedes hacer.

---

## 2. FODA

### Fortalezas
- **Producto real y funcional**: agente WhatsApp con memoria persistente (Qdrant), ajuste de carga (ACWR), prevención de lesiones, smart parser. No es un chatbot genérico — y la mayoría de run clubs no tienen *nada* digital.
- **Trial de 15 días = la promesa "dos semanas"** ya implementada, sin cambio de esquema.
- **Freemium honesto (Lite Mode, sin bloqueo)**: coherente con una marca de comunidad — nadie queda fuera.
- **Sin fricción de adquisición**: WhatsApp, sin descarga, plan en 60s. Perfecto para convertir en un evento físico (QR → conversación en 10 segundos).
- **Coste marginal bajo** (routing DeepSeek/GPT-4o mini) — el free tier masivo de un club no quema caja.
- **Infra madura**: router prod/staging/shadow, cron de notificaciones, gamificación base, bilingüe ES/EN.

### Debilidades
- **Fragilidad de infraestructura en tiers gratuitos** — en julio cayeron el dominio (DNS, resuelto con `andesrc.com`) y la DB (cuota de Neon agotada, migración a Railway en curso). El funnel depende de servicios sin margen.
- **Posicionamiento actual (maratón/lesiones/dark/masculino) opuesto al nuevo ICP.**
- **Cero presencia y cero prueba social en Pamplona/España**; testimonios LATAM; precio en USD; copy ES con sabor LATAM.
- **Sin sistema de atribución/referidos**: hoy no podemos saber qué usuaria vino de qué embajadora.
- **Gamificación calibrada a élite** (badges por 50–500 km, "Corredor Elite") — desmotivante para quien corre 2 km.
- **Un solo fundador**; los eventos consumen el recurso más escaso (su tiempo).
- **Bug de conversión conocido sin arreglar** (CTAs de pricing muertos).

### Oportunidades
- **Boom de run clubs sociales en España** (coffee runs, comunidades femeninas); el formato está validado culturalmente — nadie en Pamplona lo combina con un coach IA que sostenga el hábito *entre* eventos.
- **Público femenino principiante desatendido**: la oferta existente es o rendimiento (Runna, Strava) o gimnasio. "Tu primera carrera, acompañada" es un hueco real.
- **Partnerships baratos**: cafés/brunch quieren tráfico de jueves por la mañana/tarde; el trueque espacio-por-audiencia es estándar.
- **Post-San Fermín**: ventana natural de "reset de hábitos" a finales de julio.
- **Micro-influencers locales accesibles** (Pitu Follow) con CPMs irrisorios frente a paid ads.
- **Diferenciador único**: el club te da el evento; el agente te garantiza que sigas corriendo el lunes. Ningún run club resuelve "¿y entre quedada y quedada?".

### Amenazas
- **Run clubs gratuitos existentes** compiten por atención (no monetizan, pero saturan el jueves).
- **Churn post-evento**: si el agente no engancha en las 48h posteriores, el evento fue marketing caro. La activación D1 es la métrica de vida o muerte.
- **Dependencia de Meta/WhatsApp** (política de templates, ventana 24h, costes de plantillas).
- **Permisos y responsabilidad civil**: quedadas con marca comercial en espacio público de Pamplona pueden requerir comunicación al Ayuntamiento y seguro RC. Un incidente sin cobertura mata la marca.
- **Estacionalidad**: Pamplona en invierno reduce eventos outdoor; el agente debe sostener la comunidad de noviembre a marzo.
- **Dispersión del fundador**: el club puede canibalizar el desarrollo del producto que lo diferencia.

---

## 3. Estrategia y secuencia

**Posicionamiento nuevo**: *Andes es el club que te enamora de correr — eventos que quieres en tu semana + una coach en WhatsApp que te acompaña hasta tu primera carrera.*

- **Promesa**: "Enamórate de correr en dos semanas" (mecánica: trial 15 días).
- **ICP primario**: mujer 25–40, Pamplona, sedentaria o corredora esporádica, motivada por lo social/aspiracional, intimidada por la cultura de rendimiento.
- **La experiencia es el gancho; el agente es la retención; la suscripción es el negocio.**

**Secuencia (no negociable)**:

1. **Fase 0 (48h)** — resucitar el dominio + quick wins transversales.
2. **Fase 1 (semana 1–2)** — `/embajadores` + reposicionamiento ligero del copy ES + operación del piloto.
3. **Fase 2 (semana 2)** — evento piloto (jueves 23-jul) con atribución medible.
4. **Fase 3 (semanas 3–6)** — retro con datos, decisión de rebrand completo, sistema de referidos, calibración de gamificación.

---

## 4. PRD — Producto

### 4.1 Frontend (`andes/andes/`)

#### F1. Página `/embajadores` — **prioridad #1 de desarrollo**

- **Ruta**: `/embajadores` (ES). `/ambassadors` (EN) puede esperar — el tráfico objetivo es local. Añadir a `App.tsx`, `SeoManager.tsx` y verificar que `scripts/generate-sitemap.js` la recoja.
- **Copy**: nuevo objeto `ambassadorsContent` en `src/data/content.tsx` (fuente única, convención existente).
- **Estructura** (componentes nuevos en `src/components/`, reutilizando primitivas de `ui/`):
  1. **Hero**: imagen de mujeres corriendo en grupo (luz de día, sonrisa, no competición). Headline: *"Corre con nosotras. Lidera tu ciudad."* Sub: *"Buscamos embajadoras en Pamplona que quieran que más mujeres se enamoren de correr."*
  2. **Qué es ser embajadora**: co-organizar quedadas y coffee runs, ser el rostro local del club, crear contenido con apoyo de Andes.
  3. **Beneficios** (cards): Premium gratis mientras seas embajadora · acceso prioritario y +1 a eventos · visibilidad en redes de Andes y co-creación de contenido · % de referidos (etiquetar como "próximamente" — no prometer cifra hasta definirla) · kit de bienvenida/merch.
  4. **Cómo funciona** (3 pasos): aplicas por WhatsApp → charla de 15 min → co-organizas tu primera quedada.
  5. **Social proof**: primeras embajadoras y partners (Pitu Follow, café partner) con foto real. Mientras no existan: *"Sé de las primeras 5 embajadoras fundadoras de Pamplona"* — la escasez es mejor que el placeholder falso.
  6. **FAQ corto**: ¿necesito ser rápida? (no — necesitas haber pasado por empezar), ¿cuánto tiempo requiere? (~2 h/semana), ¿me pagan? (beneficios hoy, referidos próximamente).
  7. **CTA**: botón WhatsApp con mensaje prellenado vía el flujo unificado de `src/lib/onboarding.ts` (ver B1) — **no** un `wa.me/` ad-hoc (convención del repo).
- **Analytics**: eventos `ambassador_page_view`, `ambassador_cta_click` en `src/lib/analytics.ts`.
- **Tests**: `tests/__tests__/` con RTL; `lint` + `type-check` + `test` antes del PR.

#### F2. Reposicionamiento ligero del copy ES (pre-piloto, sin rebrand)

Solo en `content.tsx` (ES), reversible:

- **Hero ES**: de "Termina tu primera maratón sin lesiones" a *"Enamórate de correr en dos semanas"* + sub: *"Una coach en WhatsApp que se adapta a ti, y un club que te espera en Pamplona. Empieza gratis hoy."*
- **Chip del trial**: "15 días de coach completo gratis · Sin tarjeta · Sin bloqueo".
- La prevención de lesiones **baja** a punto de confianza secundario ("te frena antes de que te hagas daño"), no desaparece — es diferenciador técnico y argumento de seguridad para principiantes.
- **Idioma por defecto**: verificar que tráfico de España aterrice en ES (hoy el default visible es EN).
- **Sección comunidad**: `CityCommunitySection.tsx` pasa a "Pamplona" con fecha de la próxima quedada y CTA al grupo.
- EN se queda como está hasta la decisión de rebrand.

#### F3. Quick wins rescatados de la auditoría (transversales al pivote)

1. **Bug CTAs de pricing** (`#pricing` → `startOnboarding('free'|'premium')`) — el fix de mayor impacto en conversión identificado en mayo y sigue vigente.
2. Ícono de WhatsApp en el CTA primario.
3. Unificar promesa temporal a 60 segundos.
4. Retirar/renombrar el hero image masculino en la build ES.

El resto de la auditoría queda **congelado** hasta la decisión de rebrand (§6, semana 4).

#### F4. Página/sección de eventos (MVP, semana 2)

No construir gestor de eventos. Una sección en la home ES (o `/eventos` estática) con: próxima quedada (fecha, lugar, partner), formulario externo (Luma/Tally) o link al grupo de WhatsApp, y galería post-evento. Iterar solo si los eventos se vuelven semanales.

### 4.2 Backend (`v3/v3/`)

#### B1. Atribución de origen — extensión del contrato de onboarding

Hoy `POST /onboarding/start` acepta `{ intent: 'free'|'premium', language }`. Extender a:

```
{ intent: 'free' | 'premium' | 'ambassador', language: 'es' | 'en', source?: string }
```

- `source` con formato `event:{slug}` | `amb:{code}` | `landing`. Se codifica en el mensaje prellenado del deep link (`wa.me/?text=...`) para que el webhook lo capture al primer mensaje y lo persista (campo `acquisition_source` en `users` — **migración propuesta, la ejecuta Diego**).
- `intent: 'ambassador'` genera mensaje prellenado tipo *"¡Hola! Quiero ser embajadora de Andes en Pamplona 🏃‍♀️"* y marca la conversación para gestión manual (no entra al onboarding de plan).
- **Regla del repo**: cambiar `andes/andes/src/lib/onboarding.ts` y `v3/v3/apps/api-gateway/src/flows/simplified-onboarding-flow.ts` en el mismo change set.
- Los QR del evento apuntan a URLs con `?source=event:pamplona-jul23` — así medimos activación por evento sin construir nada más.

#### B2. Gamificación recalibrada al ICP principiante ("que el novato evolucione")

`gamification-service.ts` hoy: badges por km acumulados (50/100/250/500 km, "Corredor Elite"). Para una principiante, el primer badge está a *meses*. Rediseño:

- **Badges de hábito (nuevos, prioridad)**: `first_run` (1er run registrado), `three_alive` (3 runs en una semana), `two_weeks_in_love` (runs en 2 semanas consecutivas — ancla directa a la promesa), `first_5k`, `first_race`.
- **Etapas de evolución visibles** (el "lado técnico" que quieres): estado derivable de `user_metrics` sin migración compleja — `Caminante → Primeros Pasos → Constante → Corredora → Finisher`. El agente lo comunica en el weekly summary y al desbloquear etapa: *"Has pasado de Caminante a Constante: 3 semanas seguidas moviéndote"*.
- **Indicadores adaptados a nivel**: a la novata no se le habla de ACWR ni pace — se le habla de racha, minutos en movimiento y "cómo te sentiste" (RPE simplificado). Los indicadores técnicos (ritmo, carga, VDOT) se *desbloquean* al subir de etapa. Misma infra (`user_metrics`, ACWR interno sigue protegiendo de lesión), distinta capa de presentación en los prompts del orquestador.
- Nombres en femenino/neutro en ES ("Corredora Constante", no "Corredor Elite").

#### B3. Identidad humana del agente

- Nombre/persona femenina cercana para el mercado ES (decisión de marca — propongo definirlo antes del piloto; el system prompt del orquestador es el único cambio técnico).
- Primer mensaje con mayor descripción del producto (nota de la reunión): qué es Andes, qué va a pasar en los próximos 15 días, y que existe el club en Pamplona.

#### B4. Precio en EUR

Producto Gumroad en EUR (9,99 €/mes) para tráfico ES + strings de `pricingContent`. Si cambia el modelo, actualizar `docs/12-freemium-premium-model.md` y el copy de Hero/Pricing/FAQ en el mismo change set (invariante del repo).

#### B5. Comunicaciones de eventos vs. invariante freemium — ⚠️ decisión requerida

Los templates proactivos son **Premium-only** (invariante). Las invitaciones a eventos a usuarias free ¿son template proactivo (violaría la política) o categoría nueva "comunidad" opt-in? **Recomendación**: categoría `community_event` opt-in explícito (la usuaria pide "avísame de las quedadas"), documentada en `12-freemium-premium-model.md`. Mientras tanto: grupo de WhatsApp del club como canal de eventos — cero riesgo de política Meta y cero coste de plantillas. Fase 3, no bloquea el piloto.

#### B6. Referidos con porcentaje (fase futura, NO ahora)

Requiere: códigos por embajadora (cubierto por B1), atribución de conversión a premium, y liquidación. Diseñar solo cuando ≥3 embajadoras traigan ≥10 usuarias activadas cada una. Antes es infraestructura para un comportamiento que no existe.

---

## 5. OKRs — ciclo 11-jul → 30-sep-2026

**O1 — Resucitar y realinear el funnel digital**
- KR1.1: `andesrunners.com` operativo en 48h (14-jul) con uptime >99% el resto del ciclo.
- KR1.2: Bug de CTAs de pricing corregido y copy ES reposicionado antes del 20-jul.
- KR1.3: Conversión visita→conversación WhatsApp del tráfico ES ≥ 8%.

**O2 — Validar la experiencia física como canal de adquisición**
- KR2.1: Evento piloto ejecutado el 23-jul con ≥ 25 asistentes.
- KR2.2: ≥ 40% de asistentes escanean el QR e inician conversación (atribución `event:pamplona-jul23`).
- KR2.3: ≥ 50% de esas conversaciones registran su primer run en 48h (activación D1).
- KR2.4: CAC por usuaria activada vía evento ≤ 12€.
- KR2.5: 2 eventos más antes del 30-sep con partner distinto cada vez.

**O3 — Construir la red de embajadoras**
- KR3.1: `/embajadores` en producción antes del 20-jul.
- KR3.2: ≥ 10 solicitudes de embajadora; 5 embajadoras fundadoras activas al 31-ago.
- KR3.3: 1 micro-influencer (Pitu Follow u otra) con acuerdo cerrado y ≥ 2 piezas de contenido publicadas antes del piloto.
- KR3.4: ≥ 30% de nuevas usuarias de sep con `source` de embajadora o evento.

**O4 — Que la novata evolucione (retención del agente)**
- KR4.1: Badges de hábito + etapas de evolución en producción antes del 15-ago.
- KR4.2: Retención semana 2 de la cohorte de eventos ≥ 40%.
- KR4.3: ≥ 15 entrevistas/feedback cualitativo de usuarias del ICP documentadas.
- KR4.4: Conversión trial→premium de la cohorte Pamplona ≥ 8% (precio en EUR activo).

---

## 6. Plan de trabajo semana a semana

**Semana 0 (11–13 jul) — P0, nada más importa**
- [x] Landing en línea en `andesrc.com` (validado 11-jul: apex 200, www→301, hooks arriba).
- [x] DB migrada de Neon (suspendida por cuota) a Railway Postgres — 17/17 tablas verificadas, desplegado y healthy el 11-jul; proyecto Neon borrado.
- [x] Boot del backend endurecido contra Qdrant caído (desplegado 11-jul).
- [ ] Fix bug CTAs pricing + ícono WhatsApp (2h, F3).
- [ ] Contactar micro-influencer y 2 cafés candidatos (el 23-jul está a 12 días; los partners se cierran esta semana o no hay piloto).
- [ ] Consultar permisos: Ayuntamiento de Pamplona (ocupación de vía pública para quedada de ~30 personas) + presupuesto de seguro RC de un día.

**Semana 1 (14–20 jul) — construir el escaparate**
- [ ] `/embajadores` completa (F1) + extensión de onboarding con `source` e `intent: ambassador` (B1, front y back en el mismo change set).
- [ ] Copy ES reposicionado (F2) + default de idioma para España.
- [ ] Cerrar partner (café) y fecha/ruta del evento; crear grupo de WhatsApp del club; formulario de registro (Luma/Tally).
- [ ] Speech de presentación de producto (3 min) + guion del video de lanzamiento; brief de contenido a la influencer.
- [ ] Definir identidad humana del agente (nombre, tono) y actualizar primer mensaje (B3).

**Semana 2 (21–27 jul) — piloto**
- [ ] Mar–Mié: contenido de convocatoria (influencer + orgánico), recordatorio a registradas.
- [ ] **Jue 23-jul: evento piloto.** Ruta corta (3–4 km caminar/correr, ritmo conversación) + coffee/aguas en el partner. QR con `event:pamplona-jul23` impreso en mesa y dorsales/stickers. Speech de 3 min. Fotos/video para `/embajadores` y redes.
- [ ] Vie–Dom: follow-up — el agente engancha a las escaneadas (aquí se gana o pierde KR2.3); mensaje de gracias + invitación a embajadoras destacadas.

**Semanas 3–4 (28 jul–10 ago) — retro y decisión**
- [ ] Retro con números: asistencia, escaneos, activación D1, CAC, feedback cualitativo.
- [ ] **Decisión de rebrand completo** (descongelar auditoría UX con el copy nuevo, o iterar). Criterio: si activación D1 ≥ 50% y feedback confirma el ICP, se ejecuta rebrand total ES+EN.
- [ ] Onboarding de las primeras embajadoras fundadoras (charlas 1:1, beneficios activados manualmente: Premium gratis vía `subscriptionStatus`).
- [ ] Evento #2 con embajadora co-organizando.

**Semanas 5–8 (ago) — producto y ritmo**
- [ ] Gamificación de hábito + etapas de evolución (B2).
- [ ] Precio EUR (B4). Decisión sobre `community_event` opt-in (B5).
- [ ] Cadencia quincenal de eventos delegando progresivamente en embajadoras; contenido delegado a micro-influencers.

**Septiembre — escalar lo que funcionó**
- [ ] 2 eventos con ≥ 50% de la operación en manos de embajadoras.
- [ ] Evaluar diseño del sistema de referidos (B6) solo si KR3.4 se cumple.
- [ ] Revisión de OKRs y plan Q4 (incluye plan de invierno: el agente sostiene la comunidad indoor).

---

## 7. Riesgos y preguntas abiertas

| Riesgo | Mitigación |
|---|---|
| Neon no revive para el dump / migración se atasca | Upgrade temporal a Neon Launch (pay-per-use) desbloquea el compute; peor caso: soporte de Neon o esperar reset del 1-ago con piloto pospuesto |
| Influencer no cierra a tiempo | El evento se hace igual con red personal + embajadoras candidatas; la influencer entra al evento #2 |
| Lluvia el 23-jul | Plan B indoor con el partner (charla + café + registro al agente) |
| Asistentes escanean pero no activan | Primer mensaje post-QR ultra-guiado (B3); la coach propone el primer "run" como caminata de 20 min al día siguiente |
| Permisos/seguro se complican | Quedada informal sin cierre de vía (grupo pequeño, parque), branding en el local del partner (espacio privado) |
| Nombre "Andes Runners" no resuena en Navarra | No cambiar ahora; testear percepción en las entrevistas (KR4.3) y decidir en Q4 |

**Preguntas abiertas para Diego**: ¿% de referidos objetivo (para no prometer de más en `/embajadores`)? ¿Presupuesto por evento? ¿Nombre e identidad de la coach? ¿La influencer cobra fee, trueque o equity de visibilidad?
