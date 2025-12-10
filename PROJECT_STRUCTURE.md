# 📂 Estructura del Proyecto

## 🌳 Árbol de archivos

```
ElMundoDelCelular/
├── 📄 README.md                    # Documentación principal
├── 📄 QUICKSTART.md                # Guía rápida de inicio
├── 📄 DEPLOYMENT.md                # Guía de deployment
├── 📄 SUPABASE_SETUP.md           # Guía de configuración de Supabase
├── 📄 PROJECT_STRUCTURE.md         # Este archivo
│
├── ⚙️ Configuración
│   ├── package.json                # Dependencias y scripts
│   ├── package-lock.json           # Lock de dependencias
│   ├── astro.config.mjs           # Configuración de Astro
│   ├── tsconfig.json              # Configuración de TypeScript
│   ├── .gitignore                 # Archivos ignorados por Git
│   ├── .env.example               # Ejemplo de variables de entorno
│   └── database-schema.sql        # Schema de base de datos para Supabase
│
├── 📁 public/                      # Archivos estáticos públicos
│   └── favicon.svg                # Ícono del sitio
│
└── 📁 src/                         # Código fuente
    ├── 📁 layouts/
    │   └── Layout.astro           # Layout principal (nav, footer, estilos globales)
    │
    ├── 📁 lib/
    │   └── supabase.ts            # Cliente y tipos de Supabase
    │
    └── 📁 pages/                   # Rutas de la aplicación
        ├── index.astro            # "/" - Landing page con animaciones
        ├── productos.astro        # "/productos" - Catálogo de productos
        └── admin-oculto.astro     # "/admin-oculto" - Panel de administración
```

## 📝 Descripción de archivos clave

### Configuración

#### `astro.config.mjs`
- Configura Astro con modo SSR (Server-Side Rendering)
- Integra el adaptador de Node.js
- Permite renderizado dinámico de datos desde Supabase

#### `tsconfig.json`
- Configuración de TypeScript con modo estricto
- Garantiza tipado fuerte y seguridad

#### `.env.example`
- Plantilla para las variables de entorno
- Copiar a `.env` y llenar con credenciales reales

#### `database-schema.sql`
- Schema completo de la base de datos
- Incluye tabla `telefonos` con todas las columnas
- Políticas RLS (Row Level Security)
- Configuración del bucket de Storage

### Source Code

#### `src/layouts/Layout.astro`
**Propósito:** Layout base reutilizable

**Incluye:**
- Meta tags y SEO
- Navegación fija con blur effect
- Estilos globales CSS
- Variables CSS (colores, fuentes, sombras)
- Animaciones base (fadeIn, scaleIn, etc.)
- Footer
- Fuente system (-apple-system)

**Estilos destacados:**
- Paleta de colores minimalista
- Sistema de sombras (sm, md, lg)
- Animaciones suaves

#### `src/lib/supabase.ts`
**Propósito:** Cliente de Supabase configurado

**Exporta:**
- `supabase`: Cliente configurado
- `Telefono`: Tipo TypeScript para productos

**Variables usadas:**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

### Páginas

#### `src/pages/index.astro`
**Ruta:** `/`

**Secciones:**
1. **Hero**
   - Título principal animado
   - Subtítulo
   - CTAs (Call To Action)
   - Fondo degradado animado
   - Mockup de teléfono flotante

2. **Features**
   - Grid de 3 características
   - Íconos grandes
   - Cards con hover effect

3. **Showcase**
   - Sección de texto elegante
   - Link hacia productos

**Animaciones:**
- Rotación de gradiente
- Fade in escalonado
- Float del mockup
- Hover effects en cards

#### `src/pages/productos.astro`
**Ruta:** `/productos`

**Funcionalidad:**
- Fetch de productos desde Supabase
- Manejo de estados (loading, error, empty, success)
- Grid responsive de productos

**Componentes visuales:**
- Hero con gradiente
- Cards de productos con:
  - Imagen
  - Nombre
  - Descripción (truncada a 2 líneas)
  - Precio formateado
  - Botón "Comprar"

**Estados:**
- Error: Muestra mensaje de advertencia
- Vacío: Estado vacío con ícono
- Success: Grid de productos

**Interacciones:**
- Hover effect en cards
- Zoom en imágenes al hover
- Animaciones de entrada

#### `src/pages/admin-oculto.astro`
**Ruta:** `/admin-oculto`

**Funcionalidad del formulario:**
1. Captura datos del producto
2. Preview de imagen en tiempo real
3. Sube imagen a Supabase Storage
4. Inserta producto en la tabla `telefonos`
5. Muestra mensaje de éxito/error

**Script cliente (TypeScript):**
- Maneja preview de imagen con FileReader
- Función `uploadImage()`:
  - Genera nombre único
  - Sube a bucket `productos`
  - Retorna URL pública
- Función de submit:
  - Valida datos
  - Sube imagen
  - Inserta en DB
  - Resetea formulario

**UX:**
- Estados de loading
- Validación en tiempo real
- Mensajes de feedback
- Botón deshabilitado durante carga

## 🎨 Sistema de diseño

### Colores

```css
--color-text: #1d1d1f        /* Negro casi puro */
--color-bg: #fbfbfd          /* Blanco suave */
--color-accent: #0071e3      /* Azul Apple */
--color-surface: #ffffff     /* Blanco puro */
--color-border: #d2d2d7      /* Gris claro */
```

### Tipografía

```css
--font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...
```
- Usa la fuente nativa del sistema
- Optimizada para cada plataforma

### Sombras

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08)
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12)
```

### Animaciones

- **fadeIn**: Aparece con fade y desplazamiento Y
- **scaleIn**: Aparece con efecto de escala
- **slideDown**: Navbar que baja desde arriba
- **rotate**: Rotación continua (gradiente)
- **float**: Flotación suave (mockup)

### Espaciado

- Border radius: 12px - 20px (cards)
- Border radius: 980px (botones - pill style)
- Padding: 1rem - 2rem (elementos)
- Gap: 1rem - 2rem (grids)

## 🗄️ Base de datos

### Tabla: `telefonos`

```sql
CREATE TABLE telefonos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  imagen_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Storage: Bucket `productos`

- **Público:** ✅ Sí
- **Tipos permitidos:** image/*
- **Estructura:** Flat (todas las imágenes en raíz)
- **Naming:** `{random}-{timestamp}.{ext}`

## 🔄 Flujo de datos

### Agregar producto (Admin)

```
Usuario → Formulario → Script
                        ↓
                    Valida datos
                        ↓
                Preview imagen (local)
                        ↓
            Upload imagen → Supabase Storage
                        ↓
                    Obtiene URL
                        ↓
            Insert datos + URL → Supabase DB
                        ↓
                Muestra success/error
                        ↓
                Resetea formulario
```

### Mostrar productos

```
Página /productos → Fetch desde Supabase
                            ↓
                    Ordena por fecha DESC
                            ↓
                    Renderiza en grid
                            ↓
                Muestra imágenes desde Storage
```

## 📦 Dependencias principales

```json
{
  "astro": "^5.16.4",              // Framework
  "@astrojs/node": "^9.5.1",       // Adaptador SSR
  "@supabase/supabase-js": "^2.87.1", // Cliente Supabase
  "typescript": "^5.7.2"           // Tipado
}
```

## 🚀 Scripts disponibles

```bash
npm run dev      # Desarrollo (puerto 4321)
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 🔐 Seguridad

### Variables de entorno
- Nunca en el repo (.gitignore)
- Solo en .env local o en plataforma de hosting

### Supabase
- RLS habilitado
- Políticas públicas para lectura/escritura
- Para producción: agregar autenticación al admin

### Storage
- Bucket público (necesario para mostrar imágenes)
- URLs públicas pero difíciles de adivinar
- Sin datos sensibles en las imágenes

## 📱 Responsive Design

Todos los componentes son responsive:

- **Mobile first:** Diseño base para móvil
- **Breakpoints:**
  - Móvil: < 768px
  - Tablet/Desktop: ≥ 768px
- **Grid adaptativo:** `repeat(auto-fit, minmax(280px, 1fr))`
- **Tipografía fluida:** `clamp()` para tamaños

## 🎯 Próximas mejoras sugeridas

1. **Autenticación:** Proteger `/admin-oculto` con Supabase Auth
2. **Edición:** Permitir editar/eliminar productos
3. **Búsqueda:** Filtrar productos por nombre/precio
4. **Paginación:** Para catálogos grandes
5. **Categorías:** Organizar productos por tipo
6. **Carrito:** Sistema de compras (opcional)
7. **SEO:** Meta tags dinámicos por producto
8. **Analytics:** Google Analytics o Plausible

## 📚 Recursos de aprendizaje

- [Astro Docs](https://docs.astro.build/)
- [Supabase Docs](https://supabase.com/docs)
- [CSS Tricks](https://css-tricks.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Documento actualizado:** Última revisión el día de creación del proyecto