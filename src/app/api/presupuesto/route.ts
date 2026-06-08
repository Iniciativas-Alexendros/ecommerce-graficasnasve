/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { randomUUID } from 'crypto'
import { schemaPresupuesto } from '@/lib/validaciones/presupuesto'
import { sendEmailPresupuesto } from '@/lib/resend'
import type { Database } from '@/types/supabase'

const MAX_ARCHIVO_BYTES = 50 * 1024 * 1024 // 50 MB

function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createServerClient<Database>(url, serviceKey, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parsear FormData (soporta multipart para archivo adjunto)
    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json(
        { error: 'No se pudo procesar la solicitud' },
        { status: 400 },
      )
    }

    // 2. Extraer campos del formulario
    const campos = {
      nombre: formData.get('nombre'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      producto: formData.get('producto'),
      tirada: formData.get('tirada'),
      detalles: formData.get('detalles'),
      acabados: formData.get('acabados'),
      entrega: formData.get('entrega'),
      rgpd: formData.get('rgpd'),
    }

    // Convertir rgpd a boolean
    const datosRaw = {
      ...campos,
      rgpd: campos.rgpd === 'true',
    }

    // 3. Validar con zod
    const resultado = schemaPresupuesto.safeParse(datosRaw)
    if (!resultado.success) {
      const errores = resultado.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Datos inválidos', errores },
        { status: 422 },
      )
    }

    const datos = resultado.data
    const archivo = formData.get('archivo')
    let archivoUrl: string | null = null
    let archivoNombre: string | null = null

    // 4. Upload de archivo a Supabase Storage (si se adjuntó)
    if (archivo && archivo instanceof File && archivo.size > 0) {
      if (archivo.size > MAX_ARCHIVO_BYTES) {
        return NextResponse.json(
          { error: 'El archivo supera el límite de 50 MB' },
          { status: 413 },
        )
      }

      const supabaseAdmin = createAdminClient()
      if (supabaseAdmin) {
        const uuid = randomUUID()
        const path = `presupuestos/${uuid}/${archivo.name}`

        const buffer = await archivo.arrayBuffer()

        const { error: uploadError } = await supabaseAdmin.storage
          .from('arte-files')
          .upload(path, buffer, {
            contentType: archivo.type || 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) {
          console.error('[api/presupuesto] Error subiendo archivo:', uploadError.message)
          // No bloqueamos el envío si falla el upload
        } else {
          const { data: urlData } = supabaseAdmin.storage
            .from('arte-files')
            .getPublicUrl(path)
          archivoUrl = urlData.publicUrl
          archivoNombre = archivo.name
        }
      }
    }

    // 5. INSERT en tabla presupuestos
    const supabaseAdmin = createAdminClient()
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from('presupuestos')
        .insert({
          nombre: datos.nombre,
          empresa: datos.empresa || null,
          email: datos.email,
          telefono: datos.telefono || null,
          producto: datos.producto,
          tirada: datos.tirada || null,
          detalles: datos.detalles || null,
          acabados: datos.acabados || null,
          entrega: datos.entrega || null,
          archivo_url: archivoUrl,
          archivo_nombre: archivoNombre,
          estado: 'nuevo',
          notas_admin: null,
        })

      if (dbError) {
        console.error('[api/presupuesto] Error insertando en BD:', dbError.message)
        // Continuamos de todas formas para enviar el email
      }
    }

    // 6. Enviar emails
    await sendEmailPresupuesto(datos, archivoNombre ?? undefined)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[api/presupuesto] Error inesperado:', err)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}
