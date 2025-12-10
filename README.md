# 📱 El Mundo del Celular

Landing page estilo Apple construida con **Astro** y **Supabase**. Incluye un catálogo de productos dinámico y un panel de administración para subir nuevos productos con imágenes.

## ✨ Características

- 🎨 **Diseño minimalista** inspirado en Apple
- ⚡ **Animaciones suaves** en toda la aplicación
- 📦 **Catálogo dinámico** de productos desde Supabase
- 🔐 **Panel de administración** para agregar productos
- 🖼️ **Subida de imágenes** a Supabase Storage
- 📱 **Responsive** y optimizado para todos los dispositivos

## 🛠️ Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [Supabase](https://supabase.com/) - Backend as a Service (Base de datos + Storage)
- TypeScript - Tipado estático
- CSS moderno con animaciones

## 📋 Requisitos previos

- Node.js 18+ instalado
- Cuenta de Supabase (gratuita)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ivomariezcurrena/ElMundoDelCelular.git
cd ElMundoDelCelular
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Supabase

#### 3.1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com/) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que se inicialice (1-2 minutos)

#### 3.2. Ejecutar el schema de base de datos

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia el contenido del archivo `database-schema.sql`
3. Pégalo en el editor y haz clic en **RUN**

Esto creará:
- La tabla `telefonos` con las columnas necesarias
- Las políticas de seguridad (RLS)
- El bucket de storage `productos` para imágenes

#### 3.3. Configurar variables de entorno

1. En Supabase, ve a **Settings** > **API**
2. Copia la **Project URL** y la **anon/public key**
3. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

4. Edita `.env` y agrega tus credenciales:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`

## 📁 Estructura del proyecto

```
/
├── public/              # Archivos estáticos
├── src/
│   ├── layouts/
│   │   └── Layout.astro       # Layout principal con nav y footer
│   ├── pages/
│   │   ├── index.astro        # Landing page con animaciones
│   │   ├── productos.astro    # Catálogo de productos
│   │   └── admin-oculto.astro # Panel admin (subir productos)
│   └── lib/
│       └── supabase.ts        # Cliente de Supabase
├── database-schema.sql        # Schema para Supabase
├── astro.config.mjs          # Configuración de Astro
└── package.json
```

## 🎯 Páginas

### `/` - Landing Page
- Hero section con animaciones suaves
- Sección de características
- Diseño degradado y efectos modernos

### `/productos` - Catálogo
- Muestra todos los productos desde Supabase
- Grid responsive
- Animaciones al hover
- Manejo de estados vacíos y errores

### `/admin-oculto` - Panel de Administración
- Formulario para agregar productos
- Subida de imágenes a Supabase Storage
- Preview de imágenes
- Validación en tiempo real

## 🗄️ Modelo de datos

### Tabla: `telefonos`

| Campo        | Tipo      | Descripción                    |
|--------------|-----------|--------------------------------|
| id           | BIGSERIAL | ID único (auto-incremental)    |
| nombre       | VARCHAR   | Nombre del producto            |
| descripcion  | TEXT      | Descripción del producto       |
| precio       | DECIMAL   | Precio del producto            |
| imagen_url   | TEXT      | URL de la imagen en Storage    |
| created_at   | TIMESTAMP | Fecha de creación              |

## 📤 Deployment

### Deploy en Vercel (Recomendado)

1. Haz push de tu código a GitHub
2. Ve a [vercel.com](https://vercel.com/)
3. Importa tu repositorio
4. Agrega las variables de entorno:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
5. Deploy!

### Deploy en Netlify

1. Instala el CLI de Netlify:
```bash
npm install -g netlify-cli
```

2. Construye el proyecto:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

4. Configura las variables de entorno en Netlify Dashboard

### Deploy en un VPS

1. Construye el proyecto:
```bash
npm run build
```

2. La carpeta `dist/` contiene el sitio generado
3. Usa PM2 o similar para mantener el servidor corriendo:

```bash
npm install -g pm2
pm2 start dist/server/entry.mjs --name elmundodelcelular
```

## 🎨 Personalización

### Colores

Los colores principales están definidos en `src/layouts/Layout.astro`:

```css
:root {
  --color-text: #1d1d1f;
  --color-bg: #fbfbfd;
  --color-accent: #0071e3;
  --color-surface: #ffffff;
  --color-border: #d2d2d7;
}
```

### Gradientes

Las páginas usan gradientes inspirados en Apple:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Puedes cambiarlos por otros colores usando generadores como [cssgradient.io](https://cssgradient.io/)

## 🔒 Seguridad

- Las políticas RLS están habilitadas en Supabase
- La clave `anon` es segura para uso público
- Las imágenes se suben a un bucket público
- Para producción, considera agregar autenticación al panel admin

### Proteger el panel admin (opcional)

Puedes agregar autenticación simple con Supabase Auth:

```typescript
// En admin-oculto.astro
const session = await supabase.auth.getSession();
if (!session) {
  return Astro.redirect('/login');
}
```

## 📝 Uso

### Agregar un producto

1. Ve a `/admin-oculto`
2. Completa el formulario:
   - Nombre del producto
   - Descripción
   - Precio (solo números)
   - Imagen (JPG, PNG, etc.)
3. Haz clic en "Agregar Producto"
4. El producto aparecerá en `/productos`

### Verificar en Supabase

1. Ve a tu proyecto en Supabase
2. **Table Editor** > `telefonos` - Ver productos agregados
3. **Storage** > `productos` - Ver imágenes subidas

## 🐛 Troubleshooting

### Error: "Unable to fetch products"

- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de haber ejecutado el `database-schema.sql`
- Revisa que las políticas RLS estén habilitadas

### Error al subir imágenes

- Verifica que el bucket `productos` exista en Supabase Storage
- Asegúrate de que el bucket sea público
- Revisa las políticas del bucket en el SQL schema

### El sitio no carga en producción

- Verifica que las variables de entorno estén configuradas en tu plataforma
- Asegúrate de haber ejecutado `npm run build` sin errores
- Revisa los logs de tu plataforma de hosting

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si encuentras un bug o tienes una sugerencia:

1. Abre un issue
2. Haz un fork del proyecto
3. Crea una rama (`git checkout -b feature/AmazingFeature`)
4. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
5. Push a la rama (`git push origin feature/AmazingFeature`)
6. Abre un Pull Request

## 📄 Licencia

ISC License - ver archivo LICENSE para más detalles

## 👤 Autor

Creado con ❤️ usando Astro y Supabase

---

**¿Preguntas?** Abre un issue en el repositorio