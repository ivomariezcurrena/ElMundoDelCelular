# 🔧 Configuración de Supabase

Esta guía te llevará paso a paso por la configuración completa de Supabase para "El Mundo del Celular".

## 📝 Pasos

### 1. Crear cuenta y proyecto

1. Ve a [supabase.com](https://supabase.com/)
2. Haz clic en "Start your project"
3. Crea una cuenta con GitHub, Google o email
4. Haz clic en "New Project"
5. Completa los datos:
   - **Name:** ElMundoDelCelular
   - **Database Password:** Genera una contraseña segura (guárdala!)
   - **Region:** Elige la más cercana a ti
6. Haz clic en "Create new project"
7. Espera 1-2 minutos mientras se inicializa

### 2. Obtener credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️ en la barra lateral)
2. Click en **API**
3. Encontrarás:

   **Project URL** (ejemplo):
   ```
   https://abcdefghijklmnop.supabase.co
   ```

   **anon/public key** (ejemplo):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
   ```

4. Copia ambos valores (los necesitarás en el paso 5)

### 3. Crear la tabla de productos

1. En la barra lateral, ve a **SQL Editor**
2. Haz clic en "+ New query"
3. Copia TODO el contenido del archivo `database-schema.sql`
4. Pégalo en el editor
5. Haz clic en **RUN** (o presiona Ctrl/Cmd + Enter)
6. Deberías ver el mensaje: "Success. No rows returned"

✅ Esto creó:
- La tabla `telefonos`
- Las políticas de seguridad (RLS)
- El bucket de storage `productos`

### 4. Verificar la tabla

1. Ve a **Table Editor** en la barra lateral
2. Deberías ver la tabla `telefonos` con estas columnas:
   - id
   - nombre
   - descripcion
   - precio
   - imagen_url
   - created_at

### 5. Verificar Storage

1. Ve a **Storage** en la barra lateral
2. Deberías ver el bucket `productos`
3. Haz clic en el bucket
4. Está vacío por ahora (se llenará cuando subas productos)

### 6. Configurar variables de entorno

En tu proyecto local:

```bash
# Crea el archivo .env
cp .env.example .env
```

Edita `.env` y pega tus credenciales:

```env
SUPABASE_URL=https://tu-proyecto-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **IMPORTANTE:** Nunca subas el archivo `.env` a GitHub. Ya está en `.gitignore`.

## ✅ Verificación

Para verificar que todo funciona:

1. Inicia el proyecto:
   ```bash
   npm run dev
   ```

2. Ve a `http://localhost:4321/productos`
   - Deberías ver "No hay productos disponibles" (es normal)
   - NO deberías ver errores de conexión

3. Ve a `http://localhost:4321/admin-oculto`
   - Prueba agregar un producto
   - Si funciona, verás "✅ Producto agregado exitosamente"

4. Ve nuevamente a `/productos`
   - Deberías ver el producto que agregaste

## 🔒 Políticas de Seguridad (RLS)

El schema incluye Row Level Security (RLS) configurado automáticamente:

### Lectura pública
```sql
"Allow public read access"
- Cualquiera puede ver los productos
```

### Inserción pública
```sql
"Allow public insert access"
- Cualquiera puede agregar productos (para el formulario)
```

### ⚠️ Para producción

Si quieres proteger el panel admin:

1. Elimina la política de inserción pública:
```sql
DROP POLICY "Allow public insert access" ON telefonos;
```

2. Implementa autenticación (ver sección avanzada)

## 📊 Monitorear tu base de datos

### Ver datos
1. **Table Editor** > `telefonos`
2. Aquí verás todos los productos

### Ver imágenes
1. **Storage** > `productos`
2. Aquí verás todas las imágenes subidas

### Ver logs
1. **Logs** en la barra lateral
2. Puedes ver queries, errores, etc.

## 🔄 Limpiar datos de prueba

Si agregaste productos de prueba y quieres eliminarlos:

```sql
-- En SQL Editor:
DELETE FROM telefonos WHERE nombre LIKE '%test%';
-- O elimina todos:
TRUNCATE telefonos CASCADE;
```

Para eliminar imágenes:
1. Ve a **Storage** > `productos`
2. Selecciona archivos
3. Click en Delete

## 🌟 Configuración Avanzada

### Agregar autenticación

Si quieres proteger `/admin-oculto`:

1. **Crear tabla de usuarios admin:**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agregar tu email
INSERT INTO admin_users (email) VALUES ('tu@email.com');
```

2. **Actualizar política:**
```sql
-- Eliminar política pública
DROP POLICY "Allow public insert access" ON telefonos;

-- Nueva política solo para admins
CREATE POLICY "Allow authenticated insert" ON telefonos
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' IN (SELECT email FROM admin_users)
  );
```

### Optimizar imágenes

Para comprimir imágenes automáticamente:

1. Ve a **Storage** > `productos` > Settings
2. Habilita "Image Transformations"
3. Ahora puedes usar URLs como:
   ```
   https://tu-proyecto.supabase.co/storage/v1/render/image/public/productos/imagen.jpg?width=400
   ```

### Backups automáticos

Los proyectos de Supabase incluyen backups diarios automáticamente en el plan gratuito.

Para restaurar:
1. **Database** > **Backups**
2. Selecciona el backup
3. Click en "Restore"

## 🆘 Problemas comunes

### "Invalid API key"
- Verifica que copiaste la `anon/public` key (no la `service_role`)
- Asegúrate de que no hay espacios extra en `.env`

### "Row Level Security policy violation"
- Ejecuta el `database-schema.sql` nuevamente
- Verifica que las políticas se crearon en **Authentication** > **Policies**

### "Bucket not found"
- Ve a **Storage**
- Si no existe `productos`, créalo manualmente:
  - Click "+ New bucket"
  - Name: `productos`
  - Public: ✅
  - Allowed MIME types: `image/*`

### Imágenes no cargan
- Verifica que el bucket `productos` es público
- Ve a **Storage** > `productos` > Settings
- "Public bucket" debe estar en ✅

## 📚 Recursos

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)
- [Dashboard Overview](https://supabase.com/docs/guides/platform)

---

¿Problemas? Abre un issue en GitHub con:
- Mensaje de error
- Pasos que seguiste
- Screenshots del dashboard de Supabase