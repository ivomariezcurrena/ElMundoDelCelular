-- Script SQL para crear la tabla en Supabase
-- Ejecutar esto en el SQL Editor de Supabase

-- Crear tabla telefonos
CREATE TABLE IF NOT EXISTS telefonos (
  id BIGSERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  imagen_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE telefonos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Allow public read access" ON telefonos
  FOR SELECT
  USING (true);

-- Política para permitir inserción pública (para el formulario admin)
-- ⚠️ ADVERTENCIA: En producción, esta política debería restringirse
-- a usuarios autenticados. Esta configuración es para desarrollo/demo.
-- Para producción, considere implementar autenticación con Supabase Auth.
CREATE POLICY "Allow public insert access" ON telefonos
  FOR INSERT
  WITH CHECK (true);

-- Crear índice para mejorar rendimiento
CREATE INDEX idx_telefonos_created_at ON telefonos(created_at DESC);

-- Crear storage bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public)
VALUES ('productos', 'productos', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas para el bucket de productos
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'productos');

CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'productos');
