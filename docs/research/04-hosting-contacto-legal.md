# Investigación 04: hosting, analítica, contacto, legal y dominio

Fecha de consulta: 2026-10-21. Precios y límites cambian; reverificar antes de contratar. Nada de esto es asesoría jurídica.

## 1. Hosting gratuito para sitio estático

| | Cloudflare (Workers static assets / Pages) | Netlify Free | Vercel Hobby | GitHub Pages |
|---|---|---|---|---|
| Límites gratis | 20.000 archivos, 25 MiB c/u; Pages: 500 builds/mes; requests de estáticos "gratis e ilimitados" | 300 créditos/mes (producción 15 cr/deploy; 20 cr/GB de ancho de banda) | ~100 GB transferencia, 1M invocaciones (guía de uso justo) | Sitio máx. 1 GB; límite blando 100 GB/mes; 10 builds/h |
| Uso comercial / servicios freelance | Sin cláusula restrictiva hallada para estáticos (ver abajo) | Sin restricción explícita hallada; pero "puede cerrar proyectos del plan gratis sin aviso" | Hobby solo no comercial; ofrecer servicios cuenta como comercial | Prohíbe usarlo como hosting gratis "para tu negocio en línea"; portafolio es zona gris |
| Previews por rama/PR | Sí, ilimitados (Pages) | Sí, deploy previews ilimitados | Sí | No nativo (requiere Actions propio) |
| Dominio propio + HTTPS | Sí, hasta 100 dominios por proyecto | Sí, SSL incluido | Sí | Sí (HTTPS con dominio propio) |
| Analítica incluida | Cloudflare Web Analytics gratis, sin cookies | Analytics de pago (30 días en Pro; no en Free según tabla) | Web Analytics propio (no verificado el cupo Hobby) | No |
| Formularios | No (Worker aparte) | Netlify Forms (cupo Free no verificado) | No | No |

Fuentes y cláusulas:
- Cloudflare Pages límites: https://developers.cloudflare.com/pages/platform/limits/ (20.000 archivos, 25 MiB, 500 builds/mes, previews sin tope, 100 dominios).
- Workers static assets límites: https://developers.cloudflare.com/workers/platform/limits/ (20.000 archivos / 25 MiB) y https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ ("Requests to static assets are free and unlimited"). Ojo: con `run_worker_first` el exceso del plan gratis devuelve 429.
- Términos Cloudflare: https://www.cloudflare.com/terms/ . Las secciones leídas (2.1, 2.2.1, 2.7) no prohíben uso comercial; solo reventa de acceso, proxies/VPN y actividades ilegales. No pude leer los términos específicos de Pages/Workers ni la política de contenido (la sección 2.8 sobre contenido no HTML no apareció en la versión leída).
- Vercel: https://vercel.com/docs/limits/fair-use-guidelines : "Hobby teams are restricted to non-commercial personal use only." Comercial incluye "Advertising the sale of a product or service" y "Receiving payment to create, update, or host the site". Un portafolio que ofrece servicios cae en esa definición. Descartar Hobby para este sitio (Pro cuesta dinero).
- Netlify: https://www.netlify.com/pricing/ (Free 300 créditos, previews ilimitados, dominios con SSL) y https://www.netlify.com/legal/self-serve-subscription-agreement/ (Sec. 6: "Netlify may shut down Free Usage Tier website projects without notice for any reason or no reason"; Sec. 5: si excedes, "agrees to pay additional fees"). Riesgo: cobro por uso excedido y cierre discrecional. No encontré prohibición explícita de uso comercial; la Acceptable Use Policy no se leyó.
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits : "not intended for or allowed to be used as a free web-hosting service to run your online business". Un portafolio sin ventas probablemente es aceptable, pero la redacción deja ambigüedad.

## 2. Analítica sin cookies

- Cloudflare Web Analytics: gratis ("available on all plans"), funciona sin cambiar DNS ni proxy, no usa cookies ni localStorage según Cloudflare. Fuente: https://developers.cloudflare.com/web-analytics/ (la página oficial no detalla cookies; la afirmación de "sin estado del lado cliente" viene de resumen de https://www.cloudflare.com/web-analytics/ vía búsqueda). No soporta eventos personalizados (fuentes secundarias, p. ej. https://wireboard.io/en/blog/wireboard-vs-cloudflare-web-analytics-a-free-gauge-is-not-a-cockpit-2026): no mide clics en CTA. Muestreo en rangos largos.
- Plausible Cloud: desde 9 USD/mes (10k pageviews), 30 días de prueba, sin cookies, goals y eventos personalizados en todos los planes, incluye clics en enlaces salientes. https://plausible.io/
- Umami Cloud: plan Hobby 0 USD, 100k eventos/mes, 1 sitio, 6 meses de retención; autohospedable gratis (open source). Soporta eventos (no verificado en la página). https://umami.is/pricing
- GoatCounter: "gratis para uso público razonable", incluye negocios pequeños, identifica visitas sin cookies. Sección "Events" existe en su ayuda, no pude leerla. https://www.goatcounter.com/
- Banner de cookies: las herramientas sin cookies/identificadores persistentes evitan, en la práctica, el banner. Colombia no exige banner de cookies como la UE; la obligación es informar finalidad si hay datos personales. No verifiqué criterio de la SIC sobre analítica.
- Para medir clics en CTA gratis: Umami Cloud (Hobby) es la opción verificada; Cloudflare WA para tráfico general.

## 3. Contacto

- mailto: sin costo, sin JS, sin terceros, sin recolección de datos por el sitio. Contras: depende de cliente de correo configurado; fricción en móvil/web.
- Web3Forms: gratis 250 envíos/mes, formularios y dominios ilimitados, hCaptcha y honeypot (fuentes secundarias), historial 30 días; Turnstile, archivos y autorespuesta requieren Pro (~149 USD/año). Envío por POST HTML a api.web3forms.com/submit. https://web3forms.com/pricing (resultado de búsqueda; la página principal devolvió 403). No verifiqué si hCaptcha obliga a JS.
- Formspree: gratis 50 envíos/mes, formularios ilimitados, filtro antispam ML y reCAPTCHA; honeypot personalizado no incluido. https://formspree.io/plans
- Netlify Forms: solo si se aloja en Netlify; cupo Free no verificado.
- Cloudflare Worker + Resend: Resend gratis 100 correos/día, 3.000/mes, 3 dominios (https://resend.com/pricing). Máximo control (Turnstile, validación, sin tercero de formularios) pero requiere código y mantenimiento; el Worker se invoca por envío (cupo gratis de Workers no verificado en esta sesión).
- Cal.com: plan gratis individual, 1 usuario, tipos de evento ilimitados, correo/SMS. https://cal.com/pricing . Útil para clientes ("agenda 30 min"); no pude verificar detalles del embed.
- Qué conviene: reclutadores quieren rapidez y baja fricción: correo visible + enlaces a LinkedIn/GitHub/CV. Clientes freelance: botón "Agendar" (Cal.com) + correo. Un formulario agrega fricción y obligaciones legales; ofrecerlo solo si hay necesidad real.

## 4. Legal Colombia (orientativo, no es asesoría jurídica)

- Ley 1581 de 2012 aplica a datos personales en bases de datos tratadas por entidades públicas o privadas, incl. personas naturales, salvo bases en "ámbito exclusivamente personal o doméstico" (art. 2). Una base de contactos profesionales para captar trabajo/clientes difícilmente es "doméstica". Fuente (texto de la ley): https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=49981
- Si un formulario recoge nombre y correo, la persona es "responsable del tratamiento" (persona natural o jurídica que decide sobre la base de datos). Obligaciones relevantes: autorización previa, expresa e informada, obtenida por medio consultable (art. 9); deber de pedir y conservar copia de la autorización, informar finalidad y derechos, atender consultas y reclamos, adoptar manual interno de políticas (art. 17).
- Decreto 1377 de 2013 (hoy compilado en Decreto 1074 de 2015): autorización a más tardar en la recolección, informando datos y finalidades específicas (art. 5); política de tratamiento (art. 13); aviso de privacidad cuando no se pueda poner la política a disposición (art. 15). Fuente: https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1377_2013.pdf ; SIC Circular 005 de 2020 recomienda ubicar el aviso en lugar visible: https://cancilleria.gov.co/normograma/compilacion/docs/circular_superindustria_0005_2020.htm
- Mínimo a publicar si hay formulario (práctica común, no lista oficial verificada): casilla de aceptación no premarcada junto al formulario con enlace a una política breve que indique: identidad y contacto del responsable (nombre, correo); qué datos (nombre, correo, mensaje); finalidad única (responder la consulta); derechos del titular (conocer, actualizar, rectificar, suprimir, revocar) y cómo ejercerlos; tercero encargado (el proveedor del formulario/correo) y transferencia internacional; plazo de conservación. Guardar copia de la autorización (el correo recibido suele servir como prueba, a validar).
- Registro RNBD ante la SIC: la obligación depende de umbrales fijados por norma (Decreto 090 de 2019 según una fuente secundaria). No pude confirmar los umbrales vigentes ni la situación de personas naturales; verificar en la SIC.
- Solo mailto y enlaces: el sitio no recolecta datos; el tratamiento ocurre en tu correo al recibir mensajes. Sigues obligado a respetar los datos de quien te escribe, pero no hay formulario que autorizar. Una nota breve de privacidad (qué haces con el correo recibido) es prudente. Si usas analítica sin cookies ni identificadores, el riesgo es bajo; no verificado ante la SIC.
- Dato no hallado: no encontré guía de la SIC específica para formularios web de personas naturales; consultar abogado o la SIC.

## 5. Dominio (precios aproximados anuales, USD, fuentes secundarias)

- Cloudflare Registrar: precio al costo, sin recargo, WHOIS gratis. .com ~10,4 y .dev ~12,2 (fuentes: https://devtoolpicks.com/blog/best-domain-registrars-indie-hackers-2026 y https://porkbun.com/about/domain-cost-calculator/dev). La página oficial (https://www.cloudflare.com/products/registrar/) confirma al costo, +430 TLDs y menciona .com y .dev, pero no .co: no verificado que soporte .co.
- Porkbun: .com ~11,1; .dev ~12,9 (promos ~10,8 primer año); .co ~25-31 renovación (fuentes: https://startupowl.com/reviews/porkbun y https://domainoffer.net/tld/co/porkbun; las cifras .co discrepan entre fuentes). Calculadora propia: https://porkbun.com/about/domain-cost-calculator
- Namecheap: no pude obtener precios actuales; verificar. 
- .dev exige HTTPS (HSTS preload en el TLD), compatible con Cloudflare. .co es caro en renovación; no aporta valor claro frente a .com/.dev.

## Lo que no pude verificar
- Términos específicos de Cloudflare Pages/Workers sobre uso comercial y política de contenido.
- Netlify Acceptable Use Policy; cupo gratis de Netlify Forms; precios de Namecheap; Cloudflare .co.
- Si hCaptcha de Web3Forms funciona sin JS; detalles de eventos en GoatCounter y Umami.
- Texto exacto del art. 15 del Decreto 1377, umbrales RNBD y criterio SIC para personas naturales.

## Recomendación
- Hosting: Cloudflare (Workers static assets o Pages) con previews por rama, dominio propio y HTTPS, 0 USD. Descartar Vercel Hobby (prohíbe uso comercial; ofrecer servicios califica). Netlify y GitHub Pages son plan B, con riesgo de cierre/ambigüedad.
- Analítica: Cloudflare Web Analytics para tráfico; si se quieren clics en CTA, Umami Cloud Hobby (gratis) o Plausible (9 USD/mes). Sin cookies, sin banner.
- Contacto: lanzar con mailto + enlaces (LinkedIn, GitHub, CV) + botón Cal.com para clientes. Evitar formulario al inicio; si se agrega, Web3Forms (250/mes gratis) con casilla de autorización y política corta.
- Legal: publicar igualmente una página breve de privacidad (responsable, finalidad, derechos, proveedor) en ES/EN; es barata y cubre el caso del formulario y el correo. Confirmar con abogado o la SIC.
- Dominio: .com o .dev en Cloudflare Registrar (~10-12 USD/año); evitar .co por costo de renovación.
