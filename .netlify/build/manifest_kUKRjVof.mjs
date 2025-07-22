import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { n as NOOP_MIDDLEWARE_HEADER, o as decodeKey } from './chunks/astro/server_CQsW9hJ5.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

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

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/","cacheDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/node_modules/.astro/","outDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/dist/","srcDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/src/","publicDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/public/","buildClientDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/dist/","buildServerDir":"file:///C:/Users/mteis/Documents/GitHub/Portfolioastro/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/mteis/Documents/GitHub/Portfolioastro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_kUKRjVof.mjs","C:/Users/mteis/Documents/GitHub/Portfolioastro/node_modules/.pnpm/unstorage@1.16.0_@netlify+blobs@10.0.6/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_Cc2jag08.mjs","C:/Users/mteis/Documents/GitHub/Portfolioastro/src/React/SkillsList.tsx":"_astro/SkillsList.wpOGl9zG.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","C:/Users/mteis/Documents/GitHub/Portfolioastro/src/components/nav.astro?astro&type=script&index=0&lang.ts":"_astro/nav.astro_astro_type_script_index_0_lang.BYJ67qGU.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/mteis/Documents/GitHub/Portfolioastro/src/components/nav.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"main-nav\"),v=1e3;let i=null;function h(){if(window.scrollY>0){s?.classList.add(\"scrolling\");const o=Math.min(window.scrollY/v,1),e=1-Math.pow(1-o,4),r=528,t=window.innerWidth*.8,n=t-(t-r)*e;window.innerWidth>=768&&s?.style.setProperty(\"width\",`${n}px`)}else s?.classList.remove(\"scrolling\"),s?.style.setProperty(\"width\",\"80%\");i=null}window.addEventListener(\"scroll\",()=>{i||(i=requestAnimationFrame(h))},{passive:!0});document.querySelectorAll('a[href^=\"#\"]').forEach(o=>{o.addEventListener(\"click\",function(e){e.preventDefault();const t=e.currentTarget.getAttribute(\"href\")?.substring(1)||\"\",n=document.getElementById(t);n&&n.scrollIntoView({behavior:\"smooth\"})})});document.addEventListener(\"DOMContentLoaded\",()=>{const o=document.querySelectorAll(\"section[id]\"),e=document.querySelectorAll(\"nav a[href^='#']\"),r={threshold:.6},t=c=>{c.forEach(a=>{if(a.isIntersecting){e.forEach(u=>u.classList.remove(\"active\"));const d=a.target.getAttribute(\"id\"),l=document.querySelector(`nav a[href=\"#${d}\"]`);l&&l.classList.add(\"active\")}})},n=new IntersectionObserver(t,r);o.forEach(c=>n.observe(c))});"]],"assets":["/_astro/soulsbanner.DZ6l3VQv.png","/_astro/stitchmeasure.DtSbLqLL.png","/_astro/index.Cj41mZQ8.css","/favicon.png","/soulsbanner.png","/stitchmeasure.png","/_astro/client.BPIbHqJh.js","/_astro/index.BVOCwoKb.js","/_astro/SkillsList.wpOGl9zG.js","/svg/astro.svg","/svg/bash.svg","/svg/c++.svg","/svg/CSS3.svg","/svg/git.svg","/svg/HTML5.svg","/svg/java.svg","/svg/javaScript.svg","/svg/mysql.svg","/svg/next.svg","/svg/nodejs.svg","/svg/python.svg","/svg/react.svg","/svg/supabase.svg","/svg/tailwindcss.svg","/svg/typeScript.svg","/svg/vercel.svg","/svg/vue.svg","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"/86yJmnC5w+3LZUMbCxGP46vBkDWkSQDS42wIWOIc+0=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_Cc2jag08.mjs');

export { manifest };
