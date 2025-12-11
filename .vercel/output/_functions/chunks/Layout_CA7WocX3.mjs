import { c as createComponent, f as createAstro, e as addAttribute, p as renderHead, q as renderSlot, a as renderScript, b as renderTemplate } from './astro/server_Db_MbTxX.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="El Mundo del Celular - Los mejores smartphones del mercado"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> <nav class="navbar"> <div class="nav-container"> <a href="/" class="logo">El Mundo del Celular</a> <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú"> <span class="hamburger"></span> <span class="hamburger"></span> <span class="hamburger"></span> </button> <div class="nav-links" id="navLinks"> <a href="/">Inicio</a> <a href="/productos">Productos</a> </div> </div> </nav> ${renderSlot($$result, $$slots["default"])} <footer class="footer"> <p>&copy; 2025 Echo con ❤️ por Marz Software para El Mundo del Celular.</p> </footer> ${renderScript($$result, "C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html> `;
}, "C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
