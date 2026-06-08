/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

import React from 'react'

type VarianteBoton = 'primary' | 'secondary' | 'ghost'
type TamanoBoton = 'sm' | 'md' | 'lg'

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VarianteBoton
  size?: TamanoBoton
  asChild?: boolean
  className?: string
}

const clasesTamano: Record<TamanoBoton, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-md',
}

const clasesVariante: Record<VarianteBoton, string> = {
  primary:
    'bg-negro text-oro border border-negro hover:bg-oro hover:text-negro focus-visible:bg-oro focus-visible:text-negro',
  secondary:
    'bg-transparent text-negro border border-negro hover:bg-negro hover:text-papel focus-visible:bg-negro focus-visible:text-papel',
  ghost:
    'bg-transparent text-papel border border-papel hover:bg-papel hover:text-negro focus-visible:bg-papel focus-visible:text-negro',
}

const clasesBase =
  'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oro'

export function Boton({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  children,
  ...props
}: PropiedadesBoton) {
  const clases = [
    clasesBase,
    clasesVariante[variant],
    clasesTamano[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: [
        clases,
        (children as React.ReactElement<{ className?: string }>).props.className ?? '',
      ]
        .filter(Boolean)
        .join(' '),
    })
  }

  return (
    <button className={clases} {...props}>
      {children}
    </button>
  )
}
