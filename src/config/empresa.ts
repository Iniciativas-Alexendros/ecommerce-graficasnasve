/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

/**
 * Fuente única de verdad de los datos de la empresa.
 *
 * Para personalizar la plantilla para un cliente, edita SOLO este fichero:
 * nombre, contacto, dirección, datos legales, dominio y SEO se propagan a
 * toda la web (cabeceras, footer, legales, schema.org, emails, manifest,
 * Open Graph, sitemap…). El catálogo de productos/servicios vive aparte en
 * `src/lib/catalogoTienda.ts` y `src/lib/catalogoServicios.ts`.
 */
export const empresa = {
  // Identidad
  nombre: 'Gráficas Ejemplo',
  nombreLegal: 'Gráficas Ejemplo, S.L.',
  marca: 'ejemplo',
  anioFundacion: '20XX',
  aniosExperiencia: '+XX',
  descripcion:
    'Imprenta offset y digital en Tu Ciudad (Tu Provincia). Encuadernación artesanal, acabados premium, personalización e impresión sobre madera.',
  // Dominio y correo
  dominio: 'tudominio.com',
  dominioAntiguo: 'tudominioantiguo.com',
  email: 'hola@tudominio.com',
  emailPrivacidad: 'privacidad@tudominio.com',
  emailRemitente: 'noreply@tudominio.com',
  // Teléfono
  telefono: { e164: '+34600000000', display: '600 00 00 00' },
  // Dirección
  direccion: {
    calle: 'Calle de Ejemplo, 1',
    detalle: 'Polígono Industrial',
    cp: '00000',
    ciudad: 'Tu Ciudad',
    provincia: 'Tu Provincia',
    pais: 'ES',
    geo: { lat: 0, lng: 0 },
  },
  // Datos legales
  cif: 'B00000000',
  registroMercantil:
    'Registro Mercantil de Tu Provincia · Tomo 0000 · Folio 000 · Hoja 00000',
  // Horario
  horario: {
    laborable: { etiqueta: 'Lun–Jue', abre: '08:00', cierra: '18:00' },
    viernes: { etiqueta: 'Vie', abre: '08:00', cierra: '19:00' },
  },
} as const

/** URL absoluta del sitio (https://…). */
export const SITIO_URL = `https://${empresa.dominio}`

/** Localidad + provincia, p. ej. «Tu Ciudad (Tu Provincia)». */
export const ciudadProvincia = `${empresa.direccion.ciudad} (${empresa.direccion.provincia})`

/** Dirección postal en una línea. */
export const direccionLinea = `${empresa.direccion.calle} · ${empresa.direccion.cp} ${ciudadProvincia}`
