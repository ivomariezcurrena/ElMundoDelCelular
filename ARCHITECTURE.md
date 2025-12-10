# 🏗️ Arquitectura del Proyecto

Este documento describe la arquitectura técnica de "El Mundo del Celular".

## 📐 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│  │   / (Home)  │  │ /productos  │  │  /admin-oculto   │    │
│  │             │  │             │  │                  │    │
│  │ • Hero      │  │ • Grid      │  │ • Formulario     │    │
│  │ • Features  │  │ • Cards     │  │ • Upload         │    │
│  │ • Showcase  │  │ • Fetch DB  │  │ • Preview        │    │
│  └─────────────┘  └─────────────┘  └──────────────────┘    │
│         │                 │                    │             │
│         └─────────────────┼────────────────────┘             │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Layout.astro  │
                    │                │
                    │ • Navbar       │
                    │ • Estilos      │
                    │ • Footer       │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼─────┐      ┌──────▼──────┐     ┌─────▼─────┐
   │  Astro   │      │  Supabase   │     │   CSS     │
   │  SSR     │◄─────┤   Client    │     │Animations │
   │          │      │             │     │           │
   └──────────┘      └──────┬──────┘     └───────────┘
                            │
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
   ┌────▼─────┐      ┌──────▼──────┐     ┌─────▼─────┐
   │PostgreSQL│      │   Storage   │     │    RLS    │
   │  Table   │      │   Bucket    │     │ Policies  │
   │telefonos │      │ productos   │     │           │
   └──────────┘      └─────────────┘     └───────────┘
```

## 🔄 Flujos de Datos

### Flujo 1: Ver Productos (/productos)

```
Usuario → GET /productos
    ↓
Astro SSR renderiza página
    ↓
Ejecuta consulta a Supabase
    SELECT * FROM telefonos ORDER BY created_at DESC
    ↓
Supabase retorna datos
    ↓
Astro genera HTML con productos
    ↓
Browser renderiza grid de productos
    ↓
Imágenes se cargan desde Storage
```

### Flujo 2: Agregar Producto (/admin-oculto)

```
Usuario llena formulario
    ↓
Selecciona imagen → Preview con FileReader
    ↓
Usuario hace submit
    ↓
Script cliente (JS) valida datos
    ↓
Valida extensión de archivo
    ↓
Sube imagen a Storage
    POST /storage/v1/object/productos/{filename}
    ↓
Obtiene URL pública
    ↓
Inserta en base de datos
    INSERT INTO telefonos (nombre, descripcion, precio, imagen_url)
    ↓
Muestra mensaje de éxito
    ↓
Resetea formulario
```

### Flujo 3: Navegación

```
Usuario en cualquier página
    ↓
Click en link del navbar
    ↓
Navegación del lado del cliente (SPA-like)
    ↓
Astro renderiza nueva página
    ↓
Layout se mantiene (nav + footer)
```

## 🧩 Componentes Clave

### Layout.astro
**Propósito:** Componente base reutilizable

**Responsabilidades:**
- Meta tags y SEO
- Navegación global
- Estilos CSS globales
- Variables de diseño
- Animaciones base
- Footer

**Usado por:** Todas las páginas

### supabase.ts
**Propósito:** Cliente de Supabase singleton

**Exporta:**
- Cliente Supabase configurado
- Tipos TypeScript

**Usado por:**
- productos.astro (servidor)
- admin-oculto.astro (cliente)

## 🗂️ Estructura de Datos

### Base de Datos: telefonos

```sql
telefonos
├── id (PK, auto-increment)
├── nombre (VARCHAR, NOT NULL)
├── descripcion (TEXT)
├── precio (DECIMAL, NOT NULL)
├── imagen_url (TEXT, NOT NULL)
└── created_at (TIMESTAMP, auto)
```

### Storage: productos/

```
productos/
├── {random}-{timestamp}.jpg
├── {random}-{timestamp}.png
└── {random}-{timestamp}.webp
```

## 🔐 Modelo de Seguridad

### Row Level Security (RLS)

```
TABLA: telefonos
├── Política READ
│   └── Permite: Todos (anónimos y autenticados)
└── Política INSERT
    └── Permite: Todos (⚠️ solo para desarrollo)
```

### Storage Policies

```
BUCKET: productos
├── Política SELECT
│   └── Permite: Todos (bucket público)
└── Política INSERT
    └── Permite: Todos (⚠️ solo para desarrollo)
```

### Variables de Entorno

```
.env (local/servidor)
├── SUPABASE_URL
│   └── Pública (puede exponerse al cliente)
└── SUPABASE_ANON_KEY
    └── Pública (diseñada para frontend)
```

**Nota:** Las claves `anon` de Supabase están diseñadas para ser públicas y usarse en el cliente. Las políticas RLS protegen los datos.

## 🚀 Build & Deployment

### Proceso de Build

```
npm run build
    ↓
astro check (TypeScript)
    ↓
astro build
    ├── Build server (SSR)
    │   └── dist/server/
    └── Build client (assets)
        └── dist/client/
```

### Estructura después de Build

```
dist/
├── client/
│   ├── _astro/        # JS y CSS bundles
│   └── ...
└── server/
    ├── entry.mjs      # Entry point del servidor
    └── ...
```

### Deployment Options

```
Código en GitHub
    │
    ├─► Vercel
    │   ├── Auto-detect Astro
    │   ├── Set env vars
    │   └── Deploy
    │
    ├─► Netlify
    │   ├── Import repo
    │   ├── Set build command
    │   └── Deploy
    │
    ├─► Docker
    │   ├── Build image
    │   └── Run container
    │
    └─► VPS
        ├── Clone repo
        ├── npm install
        ├── npm run build
        └── pm2 start
```

## 📊 Flujo de Renderizado

### Server-Side Rendering (SSR)

```
Request → Astro Server
    ↓
Ejecuta código en frontmatter (---)
    ↓
Fetch de datos si es necesario
    ↓
Genera HTML completo
    ↓
Inyecta scripts cliente <script>
    ↓
Envía HTML al browser
    ↓
Browser hidrata interactividad
```

## 🎨 Sistema de Estilos

### CSS Architecture

```
Layout.astro
    ↓
<style is:global>
    ├── Variables CSS (:root)
    ├── Reset (*, body)
    ├── Componentes globales (.navbar, .footer)
    └── Animaciones (@keyframes)

Páginas (.astro)
    ↓
<style> (scoped)
    ├── Estilos específicos de página
    └── Usan variables globales
```

### CSS Variables

```css
:root
├── --color-text
├── --color-bg
├── --color-accent
├── --color-surface
├── --color-border
├── --font-system
├── --shadow-sm
├── --shadow-md
└── --shadow-lg
```

## 🔌 Integraciones

### Astro + Supabase

```
Astro (Frontend)
    │
    └─► @supabase/supabase-js
            │
            └─► Supabase API
                    ├── Database (PostgreSQL)
                    └── Storage (S3-compatible)
```

### Adaptador Node.js

```
Astro SSR
    │
    └─► @astrojs/node
            │
            └─► Node.js Server
                    ├── Standalone mode
                    └── Escucha en puerto 4321
```

## 📦 Dependencias

### Runtime Dependencies

```
astro
├── Renderizado
├── Routing
├── SSR
└── Build optimization

@astrojs/node
└── Adaptador SSR

@supabase/supabase-js
├── Database client
└── Storage client
```

### Dev Dependencies

```
typescript
└── Type checking

@astrojs/check
└── Astro file checking
```

## 🔄 Estados de la Aplicación

### Páginas

```
Landing (/)
├── Estado: Static (siempre renderiza igual)
└── Interacción: Navegación

Productos (/productos)
├── Estados:
│   ├── Loading (implícito durante SSR)
│   ├── Error (si falla fetch)
│   ├── Empty (sin productos)
│   └── Success (con productos)
└── Data: Fetch en cada request

Admin (/admin-oculto)
├── Estados:
│   ├── Idle (esperando input)
│   ├── Preview (imagen seleccionada)
│   ├── Uploading (subiendo)
│   ├── Success (completado)
│   └── Error (fallo)
└── Interacción: 100% cliente
```

## 🎯 Performance Considerations

### Optimizaciones Implementadas

1. **Lazy Loading de Imágenes**
   ```html
   <img loading="lazy" ... />
   ```

2. **SSR para SEO**
   - HTML completo en primera carga
   - Bots pueden indexar contenido

3. **CSS Scoped**
   - Solo estilos necesarios por página
   - Sin conflictos de nombres

4. **Animaciones CSS**
   - Hardware-accelerated
   - Mejor que JS animations

5. **Índice en DB**
   ```sql
   CREATE INDEX idx_telefonos_created_at ON telefonos(created_at DESC);
   ```

## 🛠️ Debugging

### Server-Side

```bash
# Logs de Astro
npm run dev

# Build logs
npm run build
```

### Client-Side

```javascript
// Browser DevTools
console.log()

// Network tab
- Ver requests a Supabase
- Ver carga de imágenes
```

### Database

```
Supabase Dashboard
└── Logs
    ├── API requests
    └── Storage access
```

## 📈 Escalabilidad

### Consideraciones Futuras

**Base de Datos:**
- Índices adicionales si crece
- Paginación para muchos productos
- Caché de queries frecuentes

**Storage:**
- CDN para imágenes (Cloudflare)
- Compresión automática
- Formatos modernos (WebP, AVIF)

**Frontend:**
- Code splitting
- Service Workers
- Static generation de páginas populares

**Backend:**
- Rate limiting
- Connection pooling (Supabase lo hace)
- Monitoreo de performance

## 🔍 Monitoring

### Métricas Clave

```
Frontend
├── Core Web Vitals
│   ├── LCP (Largest Contentful Paint)
│   ├── FID (First Input Delay)
│   └── CLS (Cumulative Layout Shift)
└── Custom metrics
    ├── Tiempo de carga de productos
    └── Tasa de éxito de uploads

Backend (Supabase)
├── Query performance
├── Storage usage
└── API response times
```

## 📚 Referencias

- [Astro Docs](https://docs.astro.build/)
- [Supabase Docs](https://supabase.com/docs)
- [Node.js Adapter](https://docs.astro.build/en/guides/integrations-guide/node/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

---

**Última actualización:** 2024
**Versión:** 1.0.0