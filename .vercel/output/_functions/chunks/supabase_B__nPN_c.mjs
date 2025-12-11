import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bvbnnuetbhvyrrhudqyn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Ym5udWV0Ymh2eXJyaHVkcXluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzMzA4NTEsImV4cCI6MjA4MDkwNjg1MX0.bIN3IbXalK3-fdlK5rh_rN9m8PW1d3VYNJzvoBRU5Oc";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const CATEGORIAS = {
  iphone: { nombre: "iPhone", emoji: "📱" },
  airpods: { nombre: "AirPods", emoji: "🎧" },
  fundas: { nombre: "Fundas", emoji: "🛡️" },
  accesorios: { nombre: "Accesorios", emoji: "⚡" }
};

export { CATEGORIAS as C, supabase as s };
