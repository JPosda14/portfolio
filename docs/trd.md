# TRD — Portafolio de Juan Andrés Posada

## Stack y por qué
| Capa | Elección | Por qué |
| --- | --- | --- |
| Framework | Astro 7 (sitio estático) + TypeScript estricto | Cero JS por defecto, i18n nativo, content collections con MDX |
| Contenido | Content collections (`glob()` + Zod), un MDX por proyecto e idioma | Añadir contenido sin tocar código; validación en build |
| Estilos | CSS moderno propio: custom properties (tokens), Grid con `grid-template-areas`, `light-dark()`, `@view-transition` | Muestra dominio de CSS; sin dependencias |
| Iconos | Lucide (generales) + Simple Icons (tecnologías), SVG inline en build | Sin JS ni fuentes de iconos |
| Imágenes | `<Picture>` de Astro, AVIF/WebP | LCP bajo |
| Fuentes | Autoalojadas, variables, `font-display: swap` (Fonts API de Astro si es estable) | Sin peticiones a terceros |
| Hosting | Cloudflare (Workers static assets / Pages), previews por rama | 0 USD, uso con servicios freelance permitido |
| Dominio | `juanposada.dev` en Cloudflare Registrar | Marca personal, ~10–12 USD/año |
| Contacto | `mailto`, LinkedIn, GitHub, Cal.com (gratis), CV PDF | Sin formulario: sin backend ni obligaciones de datos |
| Analítica | Cloudflare Web Analytics (sin cookies); Umami Hobby si se miden clics | Pendiente de decidir |

Entorno local verificado: Node 24.14, npm 11.9, git 2.53. Gestor de paquetes: npm.

## Restricciones
- Costo: 0 USD salvo el dominio.
- Único JS de la v1: script inline < 1 KB para el tema (evita parpadeo).
- Lighthouse ≥95 en las 4 categorías (móvil) y WCAG 2.2 AA.
- Windows 11 como entorno de desarrollo.

## Integraciones externas
Cal.com (enlace), Cloudflare (hosting y analítica). Ninguna API en tiempo de ejecución.

## Backend
No hay backend ni base de datos en la v1; por eso no existe `backend-schema.md`. Si se añade un formulario, se crea ese documento y se aplica la Ley 1581.

## Convenciones de código y carpetas
```
src/
  content/projects/{en,es}/<slug>.mdx   # casos de estudio
  content/site/{en,es}.ts               # textos de la home (hero, skills, experiencia…)
  components/                            # componentes .astro, uno por celda del bento
  layouts/  pages/  styles/  i18n/
public/cv/  public/images/
tests/
```
- Código, nombres y commits en inglés; interfaz ES/EN; documentación en español.
- Un componente por celda del bento; las celdas no conocen el grid (lo define la página).
- Textos en archivos de contenido, nunca dentro de los componentes.
- Commits convencionales (`feat:`, `fix:`, `docs:`…).

## Alternativas descartadas
- **Next.js 16 (export estático)**: envía runtime de React aunque no haya interactividad; i18n estático manual.
- **SvelteKit**: sin i18n ni colecciones de contenido nativas.
- **Tailwind 4**: válido, pero se prefiere CSS propio como señal técnica.
- **Vercel Hobby**: uso solo no comercial; anunciar servicios cuenta como comercial.
- **Formulario de contacto**: añade fricción y obligaciones de la Ley 1581.

## Estrategia de pruebas
- `npm test` → Playwright (escritorio y móvil, EN y ES) + `@axe-core/playwright` en cada ruta.
- `npm run check` → `astro check` (tipos y esquemas de contenido).
- `npm run lhci` → Lighthouse CI con umbral ≥0.95 en las 4 categorías.
- Revisión manual: teclado, contraste, lector de pantalla en la home.
- Vitest solo si aparece lógica propia (p. ej. vencimiento de "Ahora").
- Versiones exactas y APIs se verifican con Context7 al crear el proyecto (Fase 2).
