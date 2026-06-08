/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

// TODO: Configurar STRIPE_WEBHOOK_SECRET en Vercel antes de activar
// Ver DEPLOYMENT.md sección 8 para instrucciones completas
//
// Pasos para activar:
// 1. Crear cuenta Stripe y obtener claves API
// 2. Registrar endpoint en Stripe Dashboard: https://graficasnasve.art/api/webhooks/stripe
// 3. Añadir STRIPE_WEBHOOK_SECRET y STRIPE_SECRET_KEY en Vercel > Settings > Environment Variables
// 4. Descomentar el código de abajo y eliminar la respuesta 501

import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  // Handler stub — Stripe no está configurado aún
  return NextResponse.json(
    { error: 'Stripe no implementado. Ver TODO en el código fuente.' },
    { status: 501 },
  )
}

/*
// ── Código completo del webhook — descomentar cuando Stripe esté configurado ──

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Firma de webhook no encontrada' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[stripe/webhook] STRIPE_WEBHOOK_SECRET no configurado')
    return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : 'Error desconocido'
    console.error('[stripe/webhook] Firma inválida:', mensaje)
    return NextResponse.json({ error: `Firma inválida: ${mensaje}` }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('[stripe/webhook] checkout.session.completed:', session.id)
      // TODO: Actualizar estado del pedido en Supabase
      // const { customer_email, metadata } = session
      // await procesarPagoCompletado(session)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('[stripe/webhook] payment_intent.payment_failed:', paymentIntent.id)
      // TODO: Notificar al cliente del fallo de pago
      break
    }

    default:
      console.log(`[stripe/webhook] Evento no gestionado: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
*/
