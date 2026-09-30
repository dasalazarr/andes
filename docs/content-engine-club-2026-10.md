# Motor de contenido del club — octubre 2026

> Estado: propuesta aprobada el 30-sep-2026 (plan "Tu primera semana con Andes").
> Punto de partida: el grupo de WhatsApp del club en Pamplona tiene **5 miembros**.

## 1. Tesis

La comunidad es el **motor de crecimiento** de Andes: la adquisición (quedadas), el contenido (lo que pasa en el grupo) y la prueba social (voces reales) salen del mismo sitio. La misión no cambia: que la gente empiece a correr. El coach de WhatsApp retiene; el club atrae y enseña cómo se vive.

**Cómo contarlo con 5 personas.** "5 miembros" no se publica como número: suena a vacío. Se cuenta como **"los primeros de Pamplona" / miembros fundadores**, y se muestran caras y momentos, no contadores. Las cifras reales (asistentes, quedadas al mes) vuelven a la web cuando sean grandes.

## 2. El ritual de los jueves (15 min después de cada quedada)

Una persona del grupo (Diego o la embajadora de turno) captura:

| Qué | Formato | Destino |
|---|---|---|
| 1 foto de grupo + 1–2 fotos de ambiente | Vertical y horizontal, con luz natural, caras visibles solo de quien consintió | Landing (club, jueves de "Tu primera semana"), IG |
| 1 frase de alguien | Literal, con nombre de pila; que diga cómo se sintió, no lo que opina del producto | Landing ("Voces del club"), IG |
| 1 "momento de la semana" | Captura del grupo o del coach, anonimizada (sin números ni apellidos) | IG stories, reel mensual |

Al acabar el mes, las piezas se juntan en la **"Crónica del club"**: un reel de 30 s hecho en Remotion (`andes/andes-launch-video`) con las fotos reales y las frases del mes.

## 3. Consentimiento (RGPD / derecho a la propia imagen): sin él no se publica nada

- Mensaje fijado en el grupo, y respuesta explícita de cada persona:
  > "Hola 👋 Queremos contar en andesrc.com y en Instagram cómo es el club. ¿Nos das permiso para usar tus fotos de las quedadas y alguna frase tuya con tu nombre de pila? Puedes decir que sí a todo, solo a fotos, solo a frases o a nada, y cambiarlo cuando quieras."
- Registro simple (hoja privada): nombre · qué autoriza (foto / frase / captura) · fecha · canal donde lo dijo. Si alguien retira el permiso, se quita de la web en la siguiente publicación.
- Los menores de edad no salen en ningún caso.

## 4. De dónde a dónde (wiring en código)

| Material | Dónde va en el repo | Efecto |
|---|---|---|
| Fotos reales del grupo | `andes/andes-launch-video/public/club-real/` y se listan en `src/landing/copy.ts → CLUB_PHOTOS` | Nuevo render del clip del jueves (`npm run render:landing thu`) |
| Foto principal del club | `andes/andes/public/images/club/` y se cambia `clubContent.image.src` en `src/data/content.tsx` | Sustituye `quedada.webp` (stock) |
| Frases | `clubVoicesContent.{es,en}.voices` en `src/data/content.tsx` (+ foto opcional en `public/images/club/voces/`) | Aparece la sección "Voces del club" en la home (se oculta sola si está vacía) |

Los testimonios "representativos" (Sofía G., Bogotá…) se retiraron el 30-sep: una frase real vale más que tres inventadas.

## 5. Bucle de crecimiento

```
miembro va el jueves → trae a 1 amigo → sale en la crónica → la comparte
      ↑                                                             ↓
  coach le recuerda la quedada ← empieza en WhatsApp (source=club:pamplona) ← el amigo ve la web / IG
```

- Los QR y links del grupo llevan `?source=club:pamplona` (la atribución ya funciona de punta a punta).
- Embajadores: se mantiene la regla del 11-jul (nada de referidos con % hasta que ≥3 embajadores traigan ≥10 activaciones cada uno).

## 6. Ciudades: se abren por demanda

- `/pamplona` es el primer capítulo. Una nueva ciudad **se abre cuando hay demanda**, no por intuición.
- Señal: el CTA "Pide Andes en tu ciudad" de la home abre WhatsApp con `placement=city_request` y `source=city-request`. La ciudad sale de la conversación.
- Umbral propuesto para abrir la 2ª ciudad: **≥15 peticiones de la misma ciudad + 1 persona dispuesta a ser embajadora allí**. Cuando se cumpla: ruta `/madrid` (o la que sea), grupo de WhatsApp propio y su propia quedada semanal. Nada de software de eventos (decisión del 11-jul).

## 7. Métricas de octubre

| Métrica | Hoy | Objetivo 31-oct |
|---|---|---|
| Miembros del grupo del club | 5 | 15 |
| Asistentes por quedada (media) | — (empezar a medir) | 6 |
| Frases reales publicadas en la web | 0 | 3 |
| Leads `city-request` | 0 | medir (sin objetivo aún) |
| Conversaciones iniciadas desde `week_story` + `mid` (CTA del club) | — | medir la línea base |
