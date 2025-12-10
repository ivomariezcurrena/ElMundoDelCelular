# 🚀 Guía de Deployment

Esta guía proporciona instrucciones detalladas para desplegar "El Mundo del Celular" en diferentes plataformas.

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de tener:

1. ✅ Proyecto de Supabase configurado
2. ✅ Schema de base de datos ejecutado (`database-schema.sql`)
3. ✅ Variables de entorno disponibles:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## 🌐 Vercel (Recomendado)

Vercel es la plataforma más sencilla para desplegar aplicaciones Astro.

### Pasos:

1. **Conecta tu repositorio**
   - Ve a [vercel.com](https://vercel.com/)
   - Haz clic en "New Project"
   - Importa tu repositorio de GitHub

2. **Configurar el proyecto**
   - Framework Preset: **Astro**
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Agregar variables de entorno**
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu-anon-key
   ```

4. **Deploy**
   - Haz clic en "Deploy"
   - Espera 1-2 minutos
   - ¡Tu sitio estará en vivo!

### Actualizaciones automáticas

Vercel automáticamente re-deployará tu sitio cada vez que hagas push a tu rama principal.

## 🎯 Netlify

### Opción 1: Desde el Dashboard

1. **Conecta tu repositorio**
   - Ve a [netlify.com](https://netlify.com/)
   - Click en "Add new site" > "Import an existing project"
   - Conecta con GitHub y selecciona tu repositorio

2. **Configuración de build**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Variables de entorno**
   - Ve a Site settings > Environment variables
   - Agrega:
     ```
     SUPABASE_URL
     SUPABASE_ANON_KEY
     ```

4. **Deploy**
   - Click en "Deploy site"

### Opción 2: Desde CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod
```

## 🐳 Docker

Si prefieres usar Docker:

### 1. Crear Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
```

### 2. Crear docker-compose.yml

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "4321:4321"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    restart: unless-stopped
```

### 3. Deploy

```bash
# Build
docker-compose build

# Run
docker-compose up -d
```

## 🖥️ VPS (Ubuntu/Debian)

Para desplegar en tu propio servidor:

### 1. Preparar el servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2
sudo npm install -g pm2
```

### 2. Subir el código

```bash
# Clonar repositorio
git clone https://github.com/ivomariezcurrena/ElMundoDelCelular.git
cd ElMundoDelCelular

# Instalar dependencias
npm install

# Configurar variables de entorno
nano .env
# Pega tus variables de Supabase

# Build
npm run build
```

### 3. Ejecutar con PM2

```bash
# Iniciar aplicación
pm2 start dist/server/entry.mjs --name elmundodelcelular

# Configurar para inicio automático
pm2 startup
pm2 save
```

### 4. Configurar Nginx (opcional)

```nginx
server {
    listen 80;
    server_name tudominio.com;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL con Certbot

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com
```

## ☁️ Render

1. **Crear cuenta en Render**
   - Ve a [render.com](https://render.com/)

2. **Nuevo Web Service**
   - Click en "New +" > "Web Service"
   - Conecta tu repositorio

3. **Configuración**
   - Build Command: `npm install && npm run build`
   - Start Command: `node ./dist/server/entry.mjs`

4. **Variables de entorno**
   - Agrega `SUPABASE_URL` y `SUPABASE_ANON_KEY`

5. **Deploy**
   - Click en "Create Web Service"

## 📱 Railway

1. **Nuevo proyecto**
   - Ve a [railway.app](https://railway.app/)
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"

2. **Configuración automática**
   - Railway detectará Astro automáticamente

3. **Variables de entorno**
   - Ve a Variables
   - Agrega `SUPABASE_URL` y `SUPABASE_ANON_KEY`

4. **Deploy**
   - Railway desplegará automáticamente

## 🧪 Testing antes de Deploy

Antes de desplegar a producción, prueba el build localmente:

```bash
# Build
npm run build

# Preview
npm run preview
```

Visita `http://localhost:4321` y verifica:

- ✅ La landing page carga correctamente
- ✅ Los productos se muestran (si hay datos)
- ✅ El formulario admin funciona
- ✅ Las imágenes se suben correctamente

## 🔍 Verificación Post-Deploy

Después del deployment, verifica:

1. **URLs funcionando**
   - `/` - Landing page
   - `/productos` - Catálogo
   - `/admin-oculto` - Panel admin

2. **Funcionalidad**
   - Agregar un producto de prueba
   - Verificar que aparece en `/productos`
   - Verificar que la imagen se ve correctamente

3. **Performance**
   - Usa [PageSpeed Insights](https://pagespeed.web.dev/)
   - Verifica tiempos de carga
   - Revisa Core Web Vitals

## 🐛 Problemas Comunes

### Variables de entorno no funcionan

```bash
# Vercel/Netlify: Asegúrate de agregarlas en el dashboard
# VPS: Verifica que el archivo .env existe y PM2 lo está leyendo
pm2 restart elmundodelcelular --update-env
```

### Error 404 en rutas

```javascript
// Verifica astro.config.mjs
export default defineConfig({
  output: 'server', // Debe ser 'server'
  adapter: node({
    mode: 'standalone'
  })
});
```

### Imágenes no cargan

- Verifica que el bucket `productos` existe en Supabase
- Revisa que las políticas de storage están configuradas
- Asegúrate de que el bucket es público

## 📊 Monitoreo

### Logs en producción

**Vercel:**
```bash
vercel logs
```

**Netlify:**
- Dashboard > Logs

**PM2:**
```bash
pm2 logs elmundodelcelular
```

### Errores de Supabase

- Ve a tu proyecto en Supabase
- Dashboard > Logs
- Revisa queries y storage logs

## 🔄 Actualizar Deployment

### Vercel/Netlify
```bash
git add .
git commit -m "Update"
git push
# Auto-deploy
```

### VPS
```bash
cd ElMundoDelCelular
git pull
npm install
npm run build
pm2 restart elmundodelcelular
```

## 💡 Tips de Optimización

1. **Caché de imágenes**
   - Usar Cloudflare como CDN
   - Configurar headers de caché

2. **Comprimir assets**
   - Astro ya optimiza por defecto
   - Considera usar WebP para imágenes

3. **Database pooling**
   - Supabase maneja esto automáticamente

4. **Analytics**
   - Agrega Google Analytics o Plausible
   - Monitorea comportamiento de usuarios

## 📚 Recursos Adicionales

- [Astro Deployment Docs](https://docs.astro.build/en/guides/deploy/)
- [Supabase Performance Tips](https://supabase.com/docs/guides/performance)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

¿Problemas? Abre un issue en GitHub