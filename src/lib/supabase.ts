import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || 'https://bvbnnuetbhvyrrhudqyn.supabase.co';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ym5udWV0Ymh2eXJyaHVkcXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMzA4NTEsImV4cCI6MjA4MDkwNjg1MX0.bIN3IbXalK3-fdlK5rh_rN9m8PW1d3VYNJzvoBRU5Oc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la base de datos
export type CategoriaProducto = 'iphone' | 'airpods' | 'fundas' | 'accesorios';

export interface Telefono {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string;
  categoria: CategoriaProducto;
  created_at: string;
}

export const CATEGORIAS = {
  iphone: { nombre: 'iPhone', emoji: '📱' },
  airpods: { nombre: 'AirPods', emoji: '🎧' },
  fundas: { nombre: 'Fundas', emoji: '🛡️' },
  accesorios: { nombre: 'Accesorios', emoji: '⚡' }
} as const;
