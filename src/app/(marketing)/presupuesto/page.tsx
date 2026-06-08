/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { FormularioPresupuesto } from '@/components/formularios/FormularioPresupuesto'

export const metadata: Metadata = {
  title: 'Solicitar Presupuesto — Gráficas NASVE',
  description:
    'Solicita presupuesto sin compromiso para tu proyecto de impresión. Respondemos en menos de 24 horas laborables.',
}

export default function PaginaPresupuesto() {
  return (
    <div className="py-24">
      <div className="contenedor">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info lateral */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
              Sin compromiso
            </p>
            <h1 className="font-display text-4xl font-bold text-negro mb-6">
              Solicita un presupuesto
            </h1>
            <p className="font-sans text-base text-gris leading-relaxed mb-8">
              Cuéntanos qué necesitas. Nuestro equipo revisará tu solicitud y te
              responderá con un presupuesto detallado en un plazo máximo de
              24–48 horas laborables.
            </p>

            <div className="space-y-6 border-t border-borde pt-8">
              <div>
                <p className="font-sans font-medium text-negro text-sm mb-1">
                  Teléfono
                </p>
                <a
                  href="tel:+34961553409"
                  className="font-sans text-sm text-gris hover:text-negro transition-colors"
                >
                  961 55 34 09
                </a>
              </div>
              <div>
                <p className="font-sans font-medium text-negro text-sm mb-1">Email</p>
                <a
                  href="mailto:nasve@nasve.com"
                  className="font-sans text-sm text-gris hover:text-negro transition-colors"
                >
                  nasve@nasve.com
                </a>
              </div>
              <div>
                <p className="font-sans font-medium text-negro text-sm mb-1">Horario</p>
                <p className="font-sans text-sm text-gris">
                  L–J 8:00–18:00 · V 8:00–19:00
                </p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-8">
            <FormularioPresupuesto />
          </div>
        </div>
      </div>
    </div>
  )
}
