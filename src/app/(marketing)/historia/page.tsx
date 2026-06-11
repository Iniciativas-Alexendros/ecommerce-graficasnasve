/**
 * tudominio.com
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { empresa } from '@/config/empresa'

export const metadata: Metadata = {
  title: `Historia — ${empresa.nombre}`,
  description:
    'Décadas de oficio gráfico. Del pequeño taller de barrio a unas instalaciones modernas, con el mismo compromiso artesanal de siempre.',
}

const hitos = [
  {
    año: 'Inicio',
    titulo: 'El origen',
    descripcion:
      'La imprenta abre como un pequeño taller de barrio con una sola prensa offset. Desde el primer día, una apuesta por la calidad artesanal y el trato cercano con cada cliente.',
  },
  {
    año: 'Crecimiento',
    titulo: 'Nuevas instalaciones',
    descripcion:
      'El taller se traslada a un espacio mayor en el polígono industrial: más maquinaria, más gama de servicios y capacidad para afrontar tiradas más exigentes.',
  },
  {
    año: 'Relevo',
    titulo: 'La segunda generación',
    descripcion:
      'Llega una fuerte inversión en tecnología —CTP (Computer-to-Plate), encuadernación automatizada y los primeros acabados premium— sin perder el espíritu artesanal. La capacidad productiva se multiplica.',
  },
  {
    año: 'Hoy',
    titulo: 'El mismo compromiso',
    descripcion:
      `${empresa.nombre} combina el trato personal con las técnicas más avanzadas del sector: impresión digital de gran formato, dato variable, impresión directa sobre madera, stamping y UVI selectivo.`,
  },
]

export default function PaginaHistoria() {
  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-20">
          <SectionLabel>Quiénes somos</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
            Oficio gráfico, generación tras generación
          </h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            La historia de {empresa.nombre} es la de un equipo que apostó por la
            calidad cuando la calidad aún requería esfuerzo. Un compromiso que no ha cambiado
            con el paso de los años.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div
            className="absolute left-16 md:left-24 top-0 bottom-0 w-px bg-borde"
            aria-hidden="true"
          />

          <ol className="relative space-y-16">
            {hitos.map((hito, i) => (
              <li key={hito.año} className="relative flex gap-12 md:gap-16">
                {/* Año y punto */}
                <div className="relative flex flex-col items-end w-14 md:w-22 shrink-0 pt-1">
                  <span className="font-mono text-sm font-medium text-gris">
                    {hito.año}
                  </span>
                  {/* Punto dorado */}
                  <div
                    className="absolute right-0 translate-x-[calc(100%+1px)] top-2 w-3 h-3 rounded-full bg-ambar border-2 border-papel"
                    aria-hidden="true"
                    style={{ transform: 'translateX(calc(50% + 1px))' }}
                  />
                </div>

                {/* Contenido */}
                <div className={`pb-8 ${i < hitos.length - 1 ? 'border-b border-borde' : ''}`}>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-negro mb-3">
                    {hito.titulo}
                  </h2>
                  <p className="font-sans text-base text-gris leading-relaxed max-w-xl">
                    {hito.descripcion}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
