-- Script de migración para agregar la columna categoria a tablas existentes
-- Ejecutar esto en el SQL Editor de Supabase si ya tenías una base de datos creada

-- Paso 1: Crear el enum si no existe
DO $$ BEGIN
    CREATE TYPE categoria_producto AS ENUM ('iphone', 'airpods', 'fundas', 'accesorios');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Paso 2: Agregar la columna categoria si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'telefonos' AND column_name = 'categoria'
    ) THEN
        ALTER TABLE telefonos 
        ADD COLUMN categoria categoria_producto NOT NULL DEFAULT 'iphone';
    END IF;
END $$;

-- Paso 3: Crear política de eliminación si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'telefonos' AND policyname = 'Allow public delete access'
    ) THEN
        CREATE POLICY "Allow public delete access" ON telefonos
        FOR DELETE
        USING (true);
    END IF;
END $$;

-- Verificar que todo esté correcto
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'telefonos';
