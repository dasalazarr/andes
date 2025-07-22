# Guía de Testing Manual - Página /start

## 🎯 Objetivo
Validar que la página `/start` cumple con todos los requisitos de integración del backend y ofrece una experiencia de usuario óptima.

## 📋 Checklist de Validación

### I. Estructura de URL y Parámetros

#### ✅ Rutas de la Página `start`
- [ ] Acceder a `https://andesrc.com/start` (inglés)
- [ ] Acceder a `https://andesrc.com/es/start` (español)
- [ ] Verificar detección automática del idioma

#### ✅ Parámetro `flow`
- [ ] Probar `?flow=premium` → debe mostrar flujo premium
- [ ] Probar `?flow=free` → debe mostrar flujo gratuito
- [ ] Probar sin parámetro → debe mostrar error
- [ ] Probar parámetro inválido → debe mostrar error

**URLs de Prueba:**
```
http://localhost:5174/start?flow=premium
http://localhost:5174/start?flow=free
http://localhost:5174/es/start?flow=premium
http://localhost:5174/es/start?flow=free
```

### II. Formulario de Captura de WhatsApp

#### ✅ Campo de Entrada
- [ ] Verificar `type="tel"` en el input
- [ ] Verificar `id="phone"` para accesibilidad
- [ ] Probar en móvil → debe abrir teclado numérico

#### ✅ Dropdown de Países
- [ ] Hacer clic en dropdown → debe abrir lista
- [ ] Buscar "México" → debe filtrar resultados
- [ ] Seleccionar país → debe actualizar código
- [ ] Verificar países incluidos:
  - 🇺🇸 Estados Unidos (+1)
  - 🇲🇽 México (+52)
  - 🇪🇸 España (+34)
  - 🇦🇷 Argentina (+54)
  - Y otros países LATAM

#### ✅ Validación de Formato E.164
- [ ] Ingresar número sin código país → debe funcionar
- [ ] Verificar formato final: `+[código][número]`
- [ ] Probar números válidos:
  - México: `5512345678` → `+525512345678`
  - USA: `2025550100` → `+12025550100`
- [ ] Probar números inválidos:
  - Muy corto: `123` → debe mostrar error
  - Con letras: `abc123` → debe mostrar error

### III. Lógica JavaScript

#### ✅ Detección de Idioma
- [ ] URL con `/es/` → interfaz en español
- [ ] URL sin `/es/` → interfaz en inglés
- [ ] Verificar textos de botones y mensajes

#### ✅ Construcción del Número
- [ ] Verificar en console.log el número final
- [ ] Debe incluir `+` al inicio
- [ ] Formato: `+[código país][número limpio]`

#### ✅ Comunicación con Backend
- [ ] Abrir DevTools → Network tab
- [ ] Enviar formulario → verificar request POST
- [ ] URL: `https://v3-production-2670.up.railway.app/onboarding/[flow]`
- [ ] Headers: `Content-Type: application/json`
- [ ] Body: `{"phoneNumber": "+525512345678", "language": "es"}`

### IV. Manejo de Respuestas

#### ✅ Flujo Premium (`?flow=premium`)
- [ ] Respuesta exitosa → debe mostrar "Redirigiendo al pago..."
- [ ] Debe recibir `gumroadUrl` en respuesta
- [ ] Debe redirigir a Gumroad después de 1 segundo

#### ✅ Flujo Free (`?flow=free`)
- [ ] Respuesta exitosa → debe mostrar "Redirigiendo a WhatsApp..."
- [ ] Debe recibir `whatsappLink` en respuesta
- [ ] Debe redirigir a WhatsApp después de 1 segundo

#### ✅ Manejo de Errores
- [ ] Error 400 → "Datos inválidos. Verifica tu número"
- [ ] Error 429 → "Demasiadas solicitudes. Espera un momento"
- [ ] Error 500+ → "Error del servidor. Inténtalo más tarde"
- [ ] Error de red → "Error de conexión. Verifica tu internet"

### V. Experiencia de Usuario (UX)

#### ✅ Indicadores de Carga
- [ ] Hacer clic en "Comenzar ahora" → debe mostrar spinner
- [ ] Botón debe cambiar a "Procesando..."
- [ ] Botón debe deshabilitarse durante carga

#### ✅ Mensajes Claros
- [ ] Placeholder del input debe ser claro
- [ ] Texto de ayuda debe mostrar formato esperado
- [ ] Mensajes de error deben ser específicos

#### ✅ Accesibilidad
- [ ] Navegar con Tab → debe seguir orden lógico
- [ ] Usar lector de pantalla → debe leer etiquetas
- [ ] Verificar contraste de colores
- [ ] Probar con zoom 200% → debe ser usable

### VI. Integración con CTAs

#### ✅ Landing Page Principal
- [ ] Ir a `/` → hacer clic en "Go Premium"
- [ ] Debe redirigir a `/start?flow=premium`
- [ ] Hacer clic en "Get Started Free"
- [ ] Debe redirigir a `/start?flow=free`

#### ✅ Landing Page Español
- [ ] Ir a `/es/` → hacer clic en "Obtén Premium"
- [ ] Debe redirigir a `/es/start?flow=premium`
- [ ] Hacer clic en "Comienza Gratis"
- [ ] Debe redirigir a `/es/start?flow=free`

## 🧪 Casos de Prueba Específicos

### Caso 1: Usuario Premium México
1. Ir a `/start?flow=premium`
2. Seleccionar México (+52)
3. Ingresar `5512345678`
4. Hacer clic en "Get Started Now"
5. **Esperado**: Redirección a Gumroad

### Caso 2: Usuario Free USA
1. Ir a `/es/start?flow=free`
2. Seleccionar Estados Unidos (+1)
3. Ingresar `2025550100`
4. Hacer clic en "Comenzar ahora"
5. **Esperado**: Redirección a WhatsApp

### Caso 3: Número Inválido
1. Ir a `/start?flow=free`
2. Seleccionar cualquier país
3. Ingresar `123`
4. Hacer clic en "Get Started Now"
5. **Esperado**: Error "Phone number must be between 8 and 15 digits"

### Caso 4: Sin Parámetro Flow
1. Ir a `/start` (sin ?flow=)
2. Intentar enviar formulario
3. **Esperado**: Error "Invalid flow parameter"

## 🔍 Debugging

### Console Logs a Verificar
```javascript
// Al enviar formulario
Submitting phone number: {
  rawInput: "5512345678",
  cleanedPhone: "5512345678", 
  dialCode: "+52",
  fullPhoneNumber: "+525512345678",
  country: "México"
}

// Request al backend
Sending request to backend: {
  url: "https://v3-production-2670.up.railway.app/onboarding/free",
  payload: {phoneNumber: "+525512345678", language: "es"},
  flow: "free",
  language: "es"
}

// Respuesta del backend
Backend response: {
  status: 200,
  data: {whatsappLink: "https://wa.me/..."}
}
```

### Network Tab
- **Method**: POST
- **URL**: `https://v3-production-2670.up.railway.app/onboarding/[flow]`
- **Status**: 200 (éxito) o 4xx/5xx (error)
- **Response**: JSON con `gumroadUrl` o `whatsappLink`

## ✅ Criterios de Aceptación

La página `/start` está lista para producción cuando:

1. ✅ Todos los casos de prueba pasan
2. ✅ No hay errores en console
3. ✅ Accesibilidad validada
4. ✅ Responsive design funciona
5. ✅ Integración con backend exitosa
6. ✅ CTAs de landing page funcionan
7. ✅ Manejo de errores robusto
8. ✅ UX fluida y clara
