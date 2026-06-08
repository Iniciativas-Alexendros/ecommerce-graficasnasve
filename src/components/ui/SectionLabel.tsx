/**
 * graficasnasve.art — SectionLabel (nº de lámina + marca de registro + rótulo)
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import { MarcaRegistro } from './MarcaRegistro'

interface PropsSectionLabel {
  /** número de lámina, p.ej. "01" */
  numero?: string
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ numero, children, className = '' }: PropsSectionLabel) {
  return (
    <div
      className={['flex items-center gap-3 font-mono text-xs uppercase tracking-widest', className]
        .filter(Boolean)
        .join(' ')}
    >
      {numero && (
        <span className="inline-flex items-center justify-center bg-key text-paper-0 px-2 py-1 font-semibold">
          {numero}
        </span>
      )}
      <MarcaRegistro size={12} className="text-ambar shrink-0" />
      <span className="text-gris">{children}</span>
    </div>
  )
}
