/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import { Resend } from 'resend'
import type { DatosPresupuesto } from '@/lib/validaciones/presupuesto'
import { empresa, ciudadProvincia } from '@/config/empresa'

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

const ETIQUETAS_PRODUCTO: Record<DatosPresupuesto['producto'], string> = {
  papeleria: 'Papelería comercial',
  catalogo: 'Catálogos y revistas',
  libro: 'Libros',
  carpeteria: 'Carpetería',
  otro: 'Personalizados / Otro',
}

function buildTablaHtml(datos: DatosPresupuesto, archivoNombre?: string): string {
  const filas: [string, string][] = [
    ['Nombre', datos.nombre],
    ['Empresa', datos.empresa ?? '—'],
    ['Email', datos.email],
    ['Teléfono', datos.telefono ?? '—'],
    ['Producto', ETIQUETAS_PRODUCTO[datos.producto]],
    ['Tirada', datos.tirada ?? '—'],
    ['Fecha de entrega deseada', datos.entrega ?? '—'],
    ['Detalles', datos.detalles ?? '—'],
    ['Acabados', datos.acabados ?? '—'],
    ['Archivo adjunto', archivoNombre ?? '—'],
  ]

  const filasHtml = filas
    .map(
      ([campo, valor]) =>
        `<tr>
          <td style="padding:8px 12px;background:#f5f0e8;font-weight:600;color:#0d0d0b;white-space:nowrap;vertical-align:top;">${campo}</td>
          <td style="padding:8px 12px;color:#1a1a17;vertical-align:top;">${valor}</td>
        </tr>`,
    )
    .join('')

  return `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
      <tbody>${filasHtml}</tbody>
    </table>
  `
}

export interface ResultadoEmail {
  ok: boolean
  error?: string
}

export async function sendEmailPresupuesto(
  datos: DatosPresupuesto,
  archivoNombre?: string,
): Promise<ResultadoEmail> {
  const resend = getResendClient()
  if (!resend) {
    console.warn('[resend] RESEND_API_KEY no configurada — email omitido')
    return { ok: false, error: 'Servicio de email no configurado' }
  }

  const from = process.env.RESEND_FROM ?? empresa.emailRemitente
  const to = process.env.RESEND_PRESUPUESTO_TO ?? empresa.emailPrivacidad
  const tablaHtml = buildTablaHtml(datos, archivoNombre)

  // Email interno a Ejemplo
  const emailInterno = resend.emails.send({
    from,
    to,
    subject: `Nuevo presupuesto: ${datos.nombre}${datos.empresa ? ` (${datos.empresa})` : ''} — ${ETIQUETAS_PRODUCTO[datos.producto]}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"/></head>
      <body style="margin:0;padding:32px;background:#edebe4;font-family:sans-serif;">
        <div style="max-width:640px;margin:auto;background:#fafaf7;border-radius:4px;overflow:hidden;">
          <div style="background:#0d0d0b;padding:24px 32px;">
            <p style="margin:0;font-size:24px;font-weight:700;color:#f5f0e8;letter-spacing:-0.02em;">${empresa.marca}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#c9a84c;text-transform:uppercase;letter-spacing:0.1em;">Nuevo presupuesto recibido</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#1a1a17;margin-top:0;">Se ha recibido una nueva solicitud de presupuesto a través de ${empresa.dominio}.</p>
            ${tablaHtml}
            <p style="color:#6b6b60;font-size:13px;margin-top:24px;">
              Responde directamente a ${datos.email} o accede al panel de administración para gestionar esta solicitud.
            </p>
          </div>
          <div style="padding:16px 32px;background:#f5f0e8;font-size:12px;color:#6b6b60;text-align:center;">
            ${empresa.nombreLegal} · ${empresa.direccion.calle} · ${empresa.direccion.cp} ${ciudadProvincia} · ${empresa.telefono.display}
          </div>
        </div>
      </body>
      </html>
    `,
  })

  // Email de acuse al solicitante
  const emailAcuse = resend.emails.send({
    from,
    to: datos.email,
    subject: `Tu solicitud de presupuesto ha llegado — ${empresa.nombre}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"/></head>
      <body style="margin:0;padding:32px;background:#edebe4;font-family:sans-serif;">
        <div style="max-width:640px;margin:auto;background:#fafaf7;border-radius:4px;overflow:hidden;">
          <div style="background:#0d0d0b;padding:24px 32px;">
            <p style="margin:0;font-size:24px;font-weight:700;color:#f5f0e8;letter-spacing:-0.02em;">${empresa.marca}</p>
            <p style="margin:4px 0 0;font-size:13px;color:#c9a84c;text-transform:uppercase;letter-spacing:0.1em;">Solicitud recibida</p>
          </div>
          <div style="padding:32px;">
            <p style="color:#1a1a17;margin-top:0;">Hola ${datos.nombre},</p>
            <p style="color:#1a1a17;">Hemos recibido tu solicitud de presupuesto. Nuestro equipo la revisará y te responderemos en un plazo máximo de 24–48 horas laborables.</p>
            <p style="color:#1a1a17;">A continuación te dejamos un resumen de los datos que nos has enviado:</p>
            ${tablaHtml}
            <p style="color:#1a1a17;margin-top:24px;">Si necesitas ampliar información o tienes alguna duda, puedes contactarnos en:</p>
            <ul style="color:#1a1a17;padding-left:20px;">
              <li>Email: <a href="mailto:${empresa.email}" style="color:#c9a84c;">${empresa.email}</a></li>
              <li>Teléfono: <a href="tel:${empresa.telefono.e164}" style="color:#c9a84c;">${empresa.telefono.display}</a></li>
              <li>Horario: L–J 8:00–18:00 · V 8:00–19:00</li>
            </ul>
          </div>
          <div style="padding:16px 32px;background:#f5f0e8;font-size:12px;color:#6b6b60;text-align:center;">
            ${empresa.nombreLegal} · ${empresa.direccion.calle} · ${empresa.direccion.cp} ${ciudadProvincia} · ${empresa.telefono.display}
            <br/>© 2026 ${empresa.nombreLegal} · CIF ${empresa.cif}
          </div>
        </div>
      </body>
      </html>
    `,
  })

  try {
    const [internoRes, acuseRes] = await Promise.allSettled([emailInterno, emailAcuse])

    if (internoRes.status === 'rejected') {
      console.error('[resend] Error enviando email interno:', internoRes.reason)
    }
    if (acuseRes.status === 'rejected') {
      console.error('[resend] Error enviando acuse de recibo:', acuseRes.reason)
    }

    if (internoRes.status === 'rejected' && acuseRes.status === 'rejected') {
      return { ok: false, error: 'Error enviando emails de notificación' }
    }

    return { ok: true }
  } catch (err) {
    console.error('[resend] Error inesperado:', err)
    return { ok: false, error: 'Error inesperado en el servicio de email' }
  }
}
