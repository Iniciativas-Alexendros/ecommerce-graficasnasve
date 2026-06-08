/**
 * graficasnasve.art — Baldosa (tile de color con icono geométrico)
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import { IconoGeometrico, type NombreIcono } from './iconosGeometricos'

export type ColorBaldosa =
  | 'ambar'
  | 'coral'
  | 'cyan'
  | 'sky'
  | 'spot-blue'
  | 'lavender'
  | 'key'

const fondo: Record<ColorBaldosa, string> = {
  ambar: 'bg-ambar',
  coral: 'bg-coral',
  cyan: 'bg-cyan',
  sky: 'bg-sky',
  'spot-blue': 'bg-spot-blue',
  lavender: 'bg-lavender',
  key: 'bg-key',
}

// Tinta del icono: claro sobre fondos oscuros, key sobre fondos claros.
const tinta: Record<ColorBaldosa, string> = {
  ambar: 'text-key',
  coral: 'text-paper-0',
  cyan: 'text-paper-0',
  sky: 'text-key',
  'spot-blue': 'text-paper-0',
  lavender: 'text-paper-0',
  key: 'text-paper-0',
}

interface PropsBaldosa {
  color: ColorBaldosa
  icono: NombreIcono
  /** lado en px del icono; la baldosa es cuadrada por aspect-ratio */
  iconSize?: number
  className?: string
}

export function Baldosa({ color, icono, iconSize = 48, className = '' }: PropsBaldosa) {
  return (
    <div
      className={[
        'flex items-center justify-center rounded-baldosa aspect-square',
        fondo[color],
        tinta[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <IconoGeometrico nombre={icono} size={iconSize} />
    </div>
  )
}
