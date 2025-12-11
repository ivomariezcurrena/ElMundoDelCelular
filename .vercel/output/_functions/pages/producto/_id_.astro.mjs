import { c as createComponent, f as createAstro, r as renderComponent, b as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../../chunks/astro/server_Db_MbTxX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_CA7WocX3.mjs';
import { s as supabase, C as CATEGORIAS } from '../../chunks/supabase_B__nPN_c.mjs';
import { $ as $$Image } from '../../chunks/_astro_assets_DbFJKgjL.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const LOCALE = "es-AR";
  let producto = null;
  try {
    const { data, error: fetchError } = await supabase.from("telefonos").select("*").eq("id", id).single();
    if (fetchError) throw fetchError;
    producto = data;
  } catch (e) {
    e instanceof Error ? e.message : "Producto no encontrado";
    console.error("Error fetching producto:", e);
  }
  if (!producto) {
    return Astro2.redirect("/productos");
  }
  const categoriaInfo = CATEGORIAS[producto.categoria];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${producto.nombre} - El Mundo del Celular`, "data-astro-cid-mvbiubgv": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="producto-detalle-page" data-astro-cid-mvbiubgv> <section class="detalle-hero" data-astro-cid-mvbiubgv> <div class="container" data-astro-cid-mvbiubgv> <a href="/productos" class="btn-back" data-astro-cid-mvbiubgv> <svg width="20" height="20" viewBox="0 0 20 20" fill="none" data-astro-cid-mvbiubgv> <path d="M12 16L6 10L12 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-mvbiubgv></path> </svg>
Volver a productos
</a> </div> </section> ${producto && renderTemplate`<section class="detalle-content" data-astro-cid-mvbiubgv> <div class="container" data-astro-cid-mvbiubgv> <div class="detalle-grid" data-astro-cid-mvbiubgv> <div class="detalle-image-section" data-astro-cid-mvbiubgv> <div class="detalle-image-wrapper" data-astro-cid-mvbiubgv> ${renderComponent($$result2, "Image", $$Image, { "src": producto.imagen_url, "alt": producto.nombre, "class": "detalle-image", "width": 800, "height": 800, "loading": "lazy", "data-astro-cid-mvbiubgv": true })} </div> </div> <div class="detalle-info-section" data-astro-cid-mvbiubgv> <p class="detalle-categoria" data-astro-cid-mvbiubgv>${categoriaInfo.nombre}</p> <h1 class="detalle-nombre" data-astro-cid-mvbiubgv>${producto.nombre}</h1> <p class="detalle-precio" data-astro-cid-mvbiubgv>$${producto.precio.toLocaleString(LOCALE)}</p> <div class="detalle-descripcion" data-astro-cid-mvbiubgv> <h2 data-astro-cid-mvbiubgv>Descripción</h2> <p data-astro-cid-mvbiubgv>${producto.descripcion}</p> </div> <div class="detalle-actions" data-astro-cid-mvbiubgv> <a${addAttribute(`https://wa.me/5491165874209?text=Hola!%20Estoy%20interesado%20en%20${encodeURIComponent(producto.nombre)}%20-%20$${producto.precio}`, "href")} target="_blank" rel="noopener noreferrer" class="btn-contactar-whatsapp" data-astro-cid-mvbiubgv> <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-mvbiubgv> <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" data-astro-cid-mvbiubgv></path> </svg>
Contactar por WhatsApp
</a> </div> </div> </div> </div> </section>`} </main> ` })} `;
}, "C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/producto/[id].astro", void 0);

const $$file = "C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
