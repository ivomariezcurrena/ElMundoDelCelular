# ⚡ Quick Start Guide

Comienza en 5 minutos! 🚀

## 🎯 Lo que harás

1. ✅ Instalar dependencias
2. ✅ Configurar Supabase (3 minutos)
3. ✅ Iniciar la aplicación
4. ✅ Agregar tu primer producto

## 📦 Paso 1: Instalar

```bash
npm install
```

## 🔧 Paso 2: Configurar Supabase

### A. Crear proyecto
1. Ve a [supabase.com](https://supabase.com/) y crea cuenta
2. Crea un nuevo proyecto (toma 1-2 minutos)

### B. Ejecutar SQL
1. En Supabase, ve a **SQL Editor**
2. Copia el contenido de `database-schema.sql`
3. Pégalo y haz clic en **RUN**

### C. Obtener credenciales
1. Ve a **Settings** > **API**
2. Copia:
   - Project URL
   - anon/public key

### D. Configurar .env
```bash
cp .env.example .env
```

Edita `.env` y pega tus credenciales:
```env
SUPABASE_URL=tu_url_aqui
SUPABASE_ANON_KEY=tu_key_aqui
```

## 🚀 Paso 3: Iniciar

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321)

## 🎨 Paso 4: Probar

1. Ve a `/admin-oculto`
2. Completa el formulario:
   - **Nombre:** iPhone 15 Pro
   - **Descripción:** El smartphone más avanzado
   - **Precio:** 1299
   - **Imagen:** Sube cualquier imagen
3. Click en "Agregar Producto"
4. Ve a `/productos` - ¡Deberías ver tu producto!

## ✅ ¡Listo!

Tu aplicación está funcionando. Ahora puedes:

- Personalizar los colores en `src/layouts/Layout.astro`
- Agregar más productos
- Modificar el diseño
- Hacer deploy (ver `DEPLOYMENT.md`)

## 🆘 ¿Problemas?

### Error de conexión a Supabase
- Verifica que el `.env` esté configurado correctamente
- Asegúrate de ejecutar el `database-schema.sql`

### No puedo subir imágenes
- Verifica que el bucket `productos` existe en Supabase Storage
- Asegúrate de que es público

### Más ayuda
- Ver `README.md` para documentación completa
- Ver `SUPABASE_SETUP.md` para guía detallada de Supabase
- Ver `DEPLOYMENT.md` para guía de deploy

## 📚 Próximos pasos

1. **Personalizar:** Cambia colores, textos, logos
2. **Agregar productos:** Llena tu catálogo
3. **Deploy:** Publica tu sitio en Vercel/Netlify
4. **Proteger admin:** Agrega autenticación (opcional)

---

**¿Todo funcionando?** ¡Genial! Ahora revisa los otros archivos MD para más información.

**¿Hay problemas?** Abre un issue en GitHub con:
- Mensaje de error completo
- Pasos que seguiste
- Screenshots si es posible