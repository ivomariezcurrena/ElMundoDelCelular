import 'piccolore';
import { v as decodeKey } from './chunks/astro/server_Db_MbTxX.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_B_TrE0Vu.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/","cacheDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/node_modules/.astro/","outDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/dist/","srcDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/","publicDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/public/","buildClientDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/dist/client/","buildServerDir":"file:///C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin-oculto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin-oculto","isIndex":false,"type":"page","pattern":"^\\/admin-oculto\\/?$","segments":[[{"content":"admin-oculto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin-oculto.astro","pathname":"/admin-oculto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"productos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/productos","isIndex":false,"type":"page","pattern":"^\\/productos\\/?$","segments":[[{"content":"productos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/productos.astro","pathname":"/productos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"*{margin:0;padding:0;box-sizing:border-box}:root{--color-text: #1d1d1f;--color-bg: #fbfbfd;--color-accent: #0071e3;--color-surface: #ffffff;--color-border: #d2d2d7;--font-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--shadow-sm: 0 2px 8px rgba(0, 0, 0, .05);--shadow-md: 0 4px 16px rgba(0, 0, 0, .08);--shadow-lg: 0 8px 32px rgba(0, 0, 0, .12)}body{font-family:var(--font-system);background:var(--color-bg);color:var(--color-text);line-height:1.6;overflow-x:hidden}.navbar{position:fixed;top:0;left:0;right:0;background:#fbfbfdcc;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--color-border);z-index:1000}@keyframes slideDown{0%{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}.nav-container{max-width:1200px;margin:0 auto;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.logo{font-size:1.2rem;font-weight:600;text-decoration:none;color:var(--color-text);transition:opacity .2s}.logo:hover{opacity:.7}.nav-links{display:flex;gap:2rem}.nav-links a{text-decoration:none;color:var(--color-text);font-size:.95rem;transition:opacity .2s;position:relative}.nav-links a:hover{opacity:.7}.menu-toggle{display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:.5rem}.hamburger{width:20px;height:2px;background:var(--color-text);transition:all .3s}@media(max-width:768px){.menu-toggle{display:flex;z-index:1001}.nav-links{position:fixed;top:60px;left:0;right:0;background:#fbfbfdfa;backdrop-filter:blur(20px);flex-direction:column;padding:2rem;gap:1.5rem;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .3s;border-bottom:1px solid var(--color-border)}.nav-links.active{transform:translateY(0);opacity:1;pointer-events:all}.nav-links a{font-size:1.1rem;padding:.5rem 0}.menu-toggle.active .hamburger:nth-child(1){transform:rotate(45deg) translate(5px,5px)}.menu-toggle.active .hamburger:nth-child(2){opacity:0}.menu-toggle.active .hamburger:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}}.footer{background:var(--color-surface);border-top:1px solid var(--color-border);padding:2rem;text-align:center;color:#86868b;font-size:.9rem;margin-top:4rem}@keyframes fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}\n.producto-detalle-page[data-astro-cid-mvbiubgv]{padding-top:60px;min-height:100vh;background:#f5f5f7}.detalle-hero[data-astro-cid-mvbiubgv]{background:#fff;border-bottom:1px solid #d2d2d7;padding:1rem 0}.container[data-astro-cid-mvbiubgv]{max-width:1200px;margin:0 auto;padding:0 2rem}.btn-back[data-astro-cid-mvbiubgv]{display:inline-flex;align-items:center;gap:.5rem;color:#0071e3;text-decoration:none;font-size:.875rem;font-weight:400;transition:opacity .2s;letter-spacing:-.01em}.btn-back[data-astro-cid-mvbiubgv]:hover{opacity:.7}.btn-back[data-astro-cid-mvbiubgv] svg[data-astro-cid-mvbiubgv]{transition:transform .2s}.btn-back[data-astro-cid-mvbiubgv]:hover svg[data-astro-cid-mvbiubgv]{transform:translate(-2px)}.detalle-content[data-astro-cid-mvbiubgv]{padding:4rem 0 6rem}.detalle-grid[data-astro-cid-mvbiubgv]{display:grid;grid-template-columns:1fr;gap:4rem}@media(min-width:768px){.detalle-grid[data-astro-cid-mvbiubgv]{grid-template-columns:1.2fr 1fr;gap:5rem;align-items:start}.detalle-content[data-astro-cid-mvbiubgv]{padding:5rem 0 8rem}}@media(min-width:1024px){.detalle-grid[data-astro-cid-mvbiubgv]{gap:6rem}}.detalle-image-section[data-astro-cid-mvbiubgv]{display:flex;align-items:center;justify-content:center}.detalle-image-wrapper[data-astro-cid-mvbiubgv]{background:#fff;border-radius:20px;padding:4rem;width:100%;max-width:600px;border:1px solid #d2d2d7;transition:box-shadow .3s}.detalle-image-wrapper[data-astro-cid-mvbiubgv]:hover{box-shadow:0 4px 20px #0000000f}.detalle-image[data-astro-cid-mvbiubgv]{width:100%;height:auto;object-fit:contain;display:block}.detalle-info-section[data-astro-cid-mvbiubgv]{display:flex;flex-direction:column;gap:0;padding:1rem 0}.detalle-categoria[data-astro-cid-mvbiubgv]{font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#f56300;margin-bottom:.5rem}.detalle-nombre[data-astro-cid-mvbiubgv]{font-size:clamp(1.75rem,4vw,2.5rem);font-weight:600;color:#1d1d1f;letter-spacing:-.01em;line-height:1.1;margin:0 0 1rem}.detalle-precio[data-astro-cid-mvbiubgv]{font-size:1.5rem;font-weight:600;color:#1d1d1f;margin-bottom:2rem}.detalle-descripcion[data-astro-cid-mvbiubgv]{padding:2rem 0;border-top:1px solid #d2d2d7;margin-bottom:2rem}.detalle-descripcion[data-astro-cid-mvbiubgv] h2[data-astro-cid-mvbiubgv]{font-size:1rem;font-weight:600;margin-bottom:1rem;color:#1d1d1f;letter-spacing:-.01em}.detalle-descripcion[data-astro-cid-mvbiubgv] p[data-astro-cid-mvbiubgv]{font-size:1rem;line-height:1.7;color:#6e6e73}.detalle-actions[data-astro-cid-mvbiubgv]{display:flex;flex-direction:column;gap:1rem}.btn-contactar-whatsapp[data-astro-cid-mvbiubgv]{display:inline-flex;align-items:center;justify-content:center;gap:.625rem;background:#25d366;color:#fff;padding:.875rem 1.75rem;border-radius:980px;text-decoration:none;font-size:.9375rem;font-weight:500;transition:all .2s cubic-bezier(.4,0,.2,1);letter-spacing:-.01em;border:none;cursor:pointer;box-shadow:none}.btn-contactar-whatsapp[data-astro-cid-mvbiubgv]:hover{background:#20ba5a;transform:scale(1.02)}.btn-contactar-whatsapp[data-astro-cid-mvbiubgv]:active{transform:scale(.98)}.btn-contactar-whatsapp[data-astro-cid-mvbiubgv] svg[data-astro-cid-mvbiubgv]{width:20px;height:20px}@media(max-width:768px){.detalle-content[data-astro-cid-mvbiubgv]{padding:2rem 0 4rem}.detalle-grid[data-astro-cid-mvbiubgv]{gap:2.5rem}.detalle-image-wrapper[data-astro-cid-mvbiubgv]{padding:2.5rem;border-radius:16px}.detalle-info-section[data-astro-cid-mvbiubgv]{padding:0}.btn-contactar-whatsapp[data-astro-cid-mvbiubgv]{width:100%;padding:1rem 1.75rem}}@keyframes fadeIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\n"}],"routeData":{"route":"/producto/[id]","isIndex":false,"type":"page","pattern":"^\\/producto\\/([^/]+?)\\/?$","segments":[[{"content":"producto","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/producto/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/admin-oculto.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/producto/[id].astro",{"propagation":"none","containsHead":true}],["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/productos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/admin-oculto@_@astro":"pages/admin-oculto.astro.mjs","\u0000@astro-page:src/pages/producto/[id]@_@astro":"pages/producto/_id_.astro.mjs","\u0000@astro-page:src/pages/productos@_@astro":"pages/productos.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_1OfsyiMb.mjs","C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bn8M9ZPV.mjs","C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/admin-oculto.astro?astro&type=script&index=0&lang.ts":"_astro/admin-oculto.astro_astro_type_script_index_0_lang.8qJfdnjY.js","C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/productos.astro?astro&type=script&index=0&lang.ts":"_astro/productos.astro_astro_type_script_index_0_lang.C8uEWz2C.js","C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.CDkQL6Pe.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/pages/productos.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"searchInput\"),a=document.querySelectorAll(\".producto-card\");n&&n.addEventListener(\"input\",c=>{const o=c.target.value.toLowerCase();a.forEach(e=>{const s=e.querySelector(\".producto-nombre\")?.textContent?.toLowerCase()||\"\",r=e.querySelector(\".producto-descripcion\")?.textContent?.toLowerCase()||\"\",t=e.querySelector(\".producto-categoria\")?.textContent?.toLowerCase()||\"\";s.includes(o)||r.includes(o)||t.includes(o)?e.style.display=\"block\":e.style.display=\"none\"})});const d=document.querySelectorAll(\".btn-contactar\");d.forEach(c=>{c.addEventListener(\"click\",o=>{o.stopPropagation()})});document.addEventListener(\"DOMContentLoaded\",()=>{const c=document.querySelectorAll(\".tab-btn\"),o=document.querySelectorAll(\".categoria-section\");c.forEach(e=>{e.addEventListener(\"click\",()=>{const s=e.dataset.categoria;c.forEach(t=>t.classList.remove(\"active\")),e.classList.add(\"active\"),s===\"todos\"?o.forEach(t=>t.classList.remove(\"hidden\")):o.forEach(t=>{t.dataset.categoria===s?t.classList.remove(\"hidden\"):t.classList.add(\"hidden\")});const r=document.querySelector(\".productos-sections\");r&&window.scrollTo({top:r.offsetTop-120,behavior:\"smooth\"})})})});"],["C:/Users/ivoma/OneDrive/Documentos/GitHub/ElMundoDelCelular/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"menuToggle\"),t=document.getElementById(\"navLinks\");e?.addEventListener(\"click\",()=>{e.classList.toggle(\"active\"),t?.classList.toggle(\"active\")});t?.querySelectorAll(\"a\").forEach(c=>{c.addEventListener(\"click\",()=>{e?.classList.remove(\"active\"),t?.classList.remove(\"active\")})});"]],"assets":["/_astro/admin-oculto.WiwmFXlB.css","/_astro/productos.B_ukrKjF.css","/apl.svg","/banner.svg","/favicon.svg","/iphone","/iphones.svg","/_astro/admin-oculto.astro_astro_type_script_index_0_lang.8qJfdnjY.js","/admin-oculto/index.html","/productos/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"RTEXL07uzgZspjTM1267G/f0CV+73U4Gy2P1w6RHIOA="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
