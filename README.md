# OZON · Tarjeta médica digital

Interfaz Angular 22 responsive, con CSS propio y componentes standalone. Incluye la foto proporcionada del Dr. Oscar Juan Soto Caminada, médico general, CMP 29626. Incluye el teléfono 959 281 145, WhatsApp y el mapa de OZON en José Luis Bustamante y Rivero, Arequipa. Los textos de presentación y servicios son editables.

## Ejecutar

Se recomienda Node.js 24 LTS (el Node 23 instalado en la computadora emite advertencias).

```sh
npm install
npm start
```

Abrir http://localhost:4200. También se puede ejecutar `npx ng serve`.

```sh
npm run build
npm test -- --watch=false
npm run test:share
```

## Reemplazar los datos

El único archivo de datos es:
`src/app/features/doctor-profile/infrastructure/repositories/mock-doctor-profile.repository.ts`

- `name`, `specialty`, `cmp`, `location` y `phoneLabel`: textos visibles.
- `phone` y `whatsapp`: números internacionales reales, por ejemplo con prefijo +51.
- `appointmentUrl`: enlace real del sistema de citas.
- `mapUrl`: enlace real de la ubicación.
- `socialNetworks[].url`: enlaces reales de las redes.
- `photo`: ruta local a la fotografía autorizada, guardada en `src/assets/doctors/`.

Los destinos configurados abren llamadas, WhatsApp o Google Maps. La agenda coordina las citas por WhatsApp. Los destinos `null` conservan el aviso de datos pendientes para futuras integraciones. Cuando se agregan los datos reales, se convierten automáticamente en enlaces WhatsApp, agenda, llamada, mapa o redes. No hay formularios, envíos ni reservas simuladas.

## Estructura

```text
src/app/
  features/doctor-profile/
    domain/           Modelos y contrato del repositorio
    application/      Servicio y preparación de las acciones de contacto
    infrastructure/   Repositorio de ejemplo
    presentation/     Página y componentes con TS, HTML y CSS separados
  shared/components/  Iconos SVG y diálogo accesible
```

Para integrar una API, implementar `DoctorProfileRepository.getProfile()` y sustituir el provider en `doctor-profile.providers.ts`. La presentación permanece igual. El repositorio es asíncrono y la página incluye carga, error y reintento.

## Identidad y recursos

- Logo: `src/assets/brand/ozon-logo-white.svg`, recurso autocontenido con transparencia que incorpora el JPG oficial intacto. El emblema y las letras proceden del archivo original. La misma imagen se usa en portada, bienvenida y skeleton sin recortes ni mezcla de capas CSS, para evitar fondos rectangulares en Safari. Puede regenerarse con `node scripts/prepare-brand-logo.mjs`.
- Fotografía: `src/assets/doctors/oscar-soto.png`, copia intacta del retrato proporcionado. Si falla su carga, se muestra un icono de Tabler.
- Iconos: SVG locales de [Tabler Icons v3.34.1](https://github.com/tabler/tabler-icons/tree/v3.34.1), licencia MIT incluida. Las redes usan los iconos de marca de esa biblioteca; no se dibujaron con CSS.
- Tipografía: Manrope local, licencia OFL incluida.
- Sin Tailwind, Bootstrap ni Material. El QR se genera localmente con `qrcode` (MIT), cargado solo al pulsar «Mostrar QR».

La tarjeta reorganiza los mismos componentes en móvil: acciones verticales, servicios en lista y contacto compacto. Incluye foco visible, teclado, textos alternativos, diálogo nativo con Escape y respeto por movimiento reducido.

## Pantalla completa y estados de carga

La tarjeta usa el criterio de la referencia proporcionada: contenedor centrado de hasta 2000 px, una portada amplia en escritorio, ancho completo en móvil y altura natural según el contenido.

- `src/index.html` incluye una pantalla OZON antes de descargar o ejecutar Angular. Su CSS se sirve como recurso local independiente. Si los bundles no arrancan, conserva el mensaje y ofrece recargar después de 12 segundos.
- Al iniciar Angular se muestra una animación de marca breve (650 ms). Si falla la carga de una ruta o tarda más de 12 segundos, ofrece recargar.
- Mientras se obtiene el perfil o se reintenta, se muestra un skeleton con la misma composición responsive.
- Una solicitud sin respuesta pasa al estado de error a los 10 segundos; el usuario puede reintentar. El repositorio de ejemplo responde inmediatamente y no añade demoras artificiales.
- Si falta el logo o falla la fotografía, se muestra el nombre de la marca o el avatar provisional.
- Las animaciones respetan `prefers-reduced-motion`.

La tipografía mantiene una escala moderada en escritorio, con límites mediante `clamp()` para el nombre. Los breakpoints reorganizan los componentes y ajustan el texto para móvil.

La cabecera incluye bienvenida y ubicación. Las tarjetas de servicios muestran toda su explicación sin clics ni diálogos; una sección adicional presenta al médico y los pasos de consulta. Las redes sin enlaces reales no se muestran.

Ubicación forma parte de la misma fila de acciones que WhatsApp, citas y llamada. En tableta las cuatro acciones pasan a dos columnas y en móvil a una columna.

Al final del perfil, «Mostrar QR» abre un diálogo con el código del sitio y permite descargarlo en PNG. El destino toma la URL canónica configurada en la compilación de Netlify; en desarrollo usa el origen local. Las rutas, parámetros y fragmentos se normalizan a la portada del perfil. No utiliza servicios externos para generar el QR.

## Netlify y vista previa al compartir

El archivo `netlify.toml` configura Node 24, el comando `npm run build` y la carpeta publicable `dist/Tarjetas/browser`. Conecta este repositorio a Netlify; no es necesario conocer el dominio antes de la primera compilación.

El script `postbuild` toma la URL que suministra Netlify y escribe direcciones absolutas en OpenGraph, Twitter y el enlace canónico del HTML compilado. En producción utiliza `URL`; las vistas previas usan `DEPLOY_PRIME_URL`. Puede fijarse un dominio mediante la variable opcional `SITE_URL`. Los metadatos se sirven desde el HTML inicial, sin depender de Angular.

- Imagen lista para compartir: `public/og/ozon-profile-v1.jpg` (1200 × 630). Usa la fotografía, el logo y los iconos del sitio.
- `public/_redirects` mantiene la portada en `/` y redirige las rutas desconocidas a `/`. Los archivos existentes, como imágenes, bundles y la vCard, siguen siendo accesibles. Angular también redirige las rutas desconocidas al perfil.
- `public/_headers` limita a una hora la caché de la imagen de vista previa.
- La configuración y la imagen se copian automáticamente a la carpeta publicable.

**Si subes la carpeta manualmente, sin compilación en Netlify:** primero crea el sitio para conocer su URL, y luego compila con esa dirección real antes de subir `dist/Tarjetas/browser`:

```sh
SITE_URL=https://tu-sitio.netlify.app npm run build
```

Una compilación local sin `SITE_URL` conserva rutas relativas para desarrollo. Al compartir públicamente, la imagen debe tener una URL absoluta y accesible. Los servicios de mensajería pueden conservar en caché una vista previa anterior.

Para actualizar la composición de la imagen, edita `scripts/og-preview.html`, ejecuta `node scripts/preview-server.mjs` y captura la página `http://127.0.0.1:4201/` en un viewport de 1200 × 630. Guarda la nueva imagen en `public/og/`; si cambia su nombre, actualiza `SHARE_IMAGE_PATH` en `scripts/share-metadata.mjs` y las etiquetas de `src/index.html`.
