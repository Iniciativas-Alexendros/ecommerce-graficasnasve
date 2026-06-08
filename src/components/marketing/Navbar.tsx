/**
 * graficasnasve.art
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Boton } from '@/components/ui/Boton'

const enlaces = [
  { href: '/historia', label: 'Historia' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/sostenibilidad', label: 'Sostenibilidad' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-papel border-b border-borde">
      <nav className="contenedor flex items-center justify-between h-16" aria-label="Navegación principal">
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-2xl text-negro tracking-tight hover:text-oro transition-colors duration-150"
          aria-label="Gráficas NASVE — ir a inicio"
        >
          nasve
        </Link>

        {/* Links escritorio */}
        <ul className="hidden md:flex items-center gap-6" role="list">
          {enlaces.map(({ href, label }) => {
            const activo = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'font-sans text-sm font-medium transition-colors duration-150',
                    activo
                      ? 'text-negro border-b border-negro pb-0.5'
                      : 'text-gris hover:text-negro',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA escritorio */}
        <div className="hidden md:flex items-center">
          <Boton variant="primary" size="sm" asChild>
            <Link href="/presupuesto">Presupuesto</Link>
          </Boton>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-negro"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuAbierto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-papel border-t border-borde">
          <ul className="contenedor flex flex-col py-4 gap-1" role="list">
            {enlaces.map(({ href, label }) => {
              const activo = pathname === href || pathname.startsWith(href + '/')
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'block py-3 font-sans text-base font-medium transition-colors duration-150',
                      activo ? 'text-negro' : 'text-gris hover:text-negro',
                    ].join(' ')}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-3 border-t border-borde mt-2">
              <Boton
                variant="primary"
                size="sm"
                className="w-full"
                asChild
              >
                <Link href="/presupuesto" onClick={() => setMenuAbierto(false)}>
                  Solicitar presupuesto
                </Link>
              </Boton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
