/**
 * graficasnasve.art — Encargo asistido (4 pasos: producto · specs · archivo · presupuesto)
 * © 2026 Iniciativas Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import { Check, Diamond, Square, Upload, Loader2 } from 'lucide-react'
import {
  catalogoTienda,
  obtenerProductoTienda,
  etiquetaCategoria,
  tipoPresupuestoDe,
  ESTILO_CATEGORIA,
  type ProductoTienda,
} from '@/lib/catalogoTienda'
import {
  estimarPrecioUnitario,
  estimarTotal,
  formatearEuros,
  formatearPrecioUnidad,
} from '@/lib/precioTienda'
import { Stepper } from '@/components/ui/Stepper'
import { Boton } from '@/components/ui/Boton'
import { Campo } from '@/components/ui/Campo'
import { Baldosa } from '@/components/ui/Baldosa'
import { BarraCMYK } from '@/components/ui/BarraCMYK'
import { Chip } from '@/components/ui/Chip'

const PASOS = ['Producto', 'Especificaciones', 'Tu archivo', 'Presupuesto']

function refEncargo() {
  const letras = Array.from({ length: 4 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const num = String(Math.floor(1000 + Math.random() * 9000))
  return `NSV-${letras}-${num}`
}

/** Botón de opción seleccionable (chip grande con check). */
function Opcion({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex items-center justify-between gap-2 rounded-card border px-4 py-3 font-sans text-sm font-medium transition-colors text-left',
        selected ? 'border-ambar bg-ambar/10 text-key' : 'border-taupe text-key hover:border-key',
      ].join(' ')}
    >
      <span>{children}</span>
      {selected && <Check size={16} className="text-ambar-700 shrink-0" />}
    </button>
  )
}

const PREFLIGHT = [
  { estado: 'ok', titulo: 'Formato y sangre', detalle: '210×297 mm + 3 mm de sangre detectados' },
  { estado: 'ok', titulo: 'Resolución', detalle: 'Imágenes a 312 ppp · óptimo para offset' },
  { estado: 'aviso', titulo: 'Modo de color', detalle: 'Archivo en RGB → lo convertimos a CMYK ISO Coated v2' },
  { estado: 'ok', titulo: 'Tipografías', detalle: 'Incrustadas o trazadas · correcto' },
  { estado: 'info', titulo: 'Marcas de corte', detalle: 'No incluidas · las añadimos nosotros' },
] as const

function IconoEstado({ estado }: { estado: 'ok' | 'aviso' | 'info' }) {
  if (estado === 'ok') return <Check size={16} className="text-cyan shrink-0 mt-0.5" />
  if (estado === 'aviso') return <Diamond size={14} className="text-ambar fill-ambar shrink-0 mt-1" />
  return <Square size={13} className="text-spot-blue fill-spot-blue shrink-0 mt-1" />
}

interface PropsEncargoFlow {
  productoSlugInicial?: string
}

export function EncargoFlow({ productoSlugInicial }: PropsEncargoFlow) {
  const inicial = productoSlugInicial ? obtenerProductoTienda(productoSlugInicial) : undefined
  const [paso, setPaso] = useState(inicial ? 1 : 0)
  const [producto, setProducto] = useState<ProductoTienda | undefined>(inicial)
  const [gramajeId, setGramajeId] = useState(inicial?.gramajes[0].id ?? '')
  const [acabadoId, setAcabadoId] = useState(inicial?.acabados[0].id ?? '')
  const [cantidad, setCantidad] = useState(inicial?.cantidades[0] ?? 0)
  const [archivoNombre, setArchivoNombre] = useState('')
  const [sinArte, setSinArte] = useState(false)

  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [rgpd, setRgpd] = useState(false)
  const [estado, setEstado] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [referencia, setReferencia] = useState('')

  function elegirProducto(p: ProductoTienda) {
    setProducto(p)
    setGramajeId(p.gramajes[0].id)
    setAcabadoId(p.acabados[0].id)
    setCantidad(p.cantidades[0])
    setPaso(1)
  }

  const gramaje = producto?.gramajes.find((g) => g.id === gramajeId) ?? producto?.gramajes[0]
  const acabado = producto?.acabados.find((a) => a.id === acabadoId) ?? producto?.acabados[0]
  const params =
    producto && gramaje && acabado
      ? { precioBase: producto.precioBase, cantidad, factorGramaje: gramaje.factor, factorAcabado: acabado.factor }
      : null
  const precioUnidad = params ? estimarPrecioUnitario(params) : 0
  const total = params ? estimarTotal(params) : 0

  async function enviar() {
    if (!producto) return
    if (nombre.trim().length < 2 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !rgpd) {
      setErrorMsg('Revisa nombre, email y la aceptación de privacidad.')
      setEstado('error')
      return
    }
    setEstado('loading')
    setErrorMsg('')
    const detalle = `${producto.nombre} · ${producto.formato} · ${gramaje?.etiqueta} · ${acabado?.etiqueta} · ${cantidad} ud${sinArte ? ' · arte a cargo de Nasve' : archivoNombre ? ` · archivo: ${archivoNombre}` : ''} (estimación orientativa ${formatearEuros(total)})`
    const fd = new FormData()
    fd.append('nombre', nombre)
    fd.append('email', email)
    if (empresa) fd.append('empresa', empresa)
    if (telefono) fd.append('telefono', telefono)
    fd.append('producto', tipoPresupuestoDe(producto))
    fd.append('detalles', detalle)
    fd.append('rgpd', 'true')
    try {
      const res = await fetch('/api/presupuesto', { method: 'POST', body: fd })
      const json = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Error al enviar el encargo')
      setReferencia(refEncargo())
      setEstado('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado')
      setEstado('error')
    }
  }

  if (estado === 'success') {
    return (
      <div className="rounded-card border border-key/10 bg-paper-0 shadow-duro p-10 text-center max-w-xl mx-auto">
        <Baldosa color="cyan" icono="anillo" cuadrada={false} className="w-16 h-16 mx-auto mb-6" iconSize={36} />
        <h2 className="font-display font-extrabold text-2xl text-key mb-2">Encargo recibido</h2>
        <p className="font-sans text-sm text-gris mb-6">
          Te enviaremos el presupuesto cerrado y una prueba de color en menos de 24 h laborables.
        </p>
        <div className="inline-flex flex-col items-center gap-1 rounded-card border border-taupe bg-paper-50 px-6 py-4">
          <span className="font-mono text-xs uppercase tracking-widest text-gris">Tu referencia</span>
          <span className="font-mono text-lg font-semibold text-key">{referencia}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <Stepper pasos={PASOS} actual={paso} />
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-10 items-start">
        {/* Contenido del paso */}
        <div className="min-w-0">
          {/* PASO 0 — PRODUCTO */}
          {paso === 0 && (
            <div>
              <h2 className="font-display font-bold text-2xl text-key mb-6">Elige tu producto</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {catalogoTienda.map((p) => {
                  const est = ESTILO_CATEGORIA[p.categoria]
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => elegirProducto(p)}
                      className="group text-left rounded-card border border-taupe bg-paper-0 overflow-hidden hover:border-key transition-colors"
                    >
                      <Baldosa color={est.color} icono={est.icono} cuadrada={false} radius="none" iconSize={40} className="w-full aspect-[3/2]" />
                      <span className="block p-3 font-sans text-sm font-medium text-key">{p.nombre}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* PASO 1 — ESPECIFICACIONES */}
          {paso === 1 && producto && (
            <div className="flex flex-col gap-8">
              <h2 className="font-display font-bold text-2xl text-key">Configura tu {producto.nombre.toLowerCase()}</h2>

              {producto.gramajes.length > 1 && (
                <fieldset>
                  <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">
                    {producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte'}
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {producto.gramajes.map((g) => (
                      <Opcion key={g.id} selected={g.id === gramajeId} onClick={() => setGramajeId(g.id)}>
                        {g.etiqueta}
                      </Opcion>
                    ))}
                  </div>
                  <p className="mt-3 rounded-card bg-paper-50 border border-taupe px-4 py-2 font-sans text-sm text-gris">
                    Grosor del papel. Más alto = más rígido y premium.
                  </p>
                </fieldset>
              )}

              {producto.acabados.length > 1 && (
                <fieldset>
                  <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">Acabado</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {producto.acabados.map((a) => (
                      <Opcion key={a.id} selected={a.id === acabadoId} onClick={() => setAcabadoId(a.id)}>
                        {a.etiqueta}
                      </Opcion>
                    ))}
                  </div>
                </fieldset>
              )}

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">Cantidad</legend>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {producto.cantidades.map((c) => (
                    <Opcion key={c} selected={c === cantidad} onClick={() => setCantidad(c)}>
                      {c.toLocaleString('es-ES')} ud
                    </Opcion>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {/* PASO 2 — TU ARCHIVO (PREFLIGHT) */}
          {paso === 2 && producto && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-bold text-2xl text-key">Sube tu archivo de impresión</h2>
              <p className="font-sans text-sm text-gris -mt-2">
                Lo revisamos al instante y te decimos si necesita ajustes. Si no tienes arte listo, también lo preparamos nosotros.
              </p>

              <label className="flex items-center gap-4 rounded-card border border-dashed border-taupe bg-paper-50 px-5 py-6 cursor-pointer hover:border-key transition-colors">
                <Baldosa color="coral" cuadrada={false} className="w-12 h-12 shrink-0">
                  <Upload size={22} />
                </Baldosa>
                <div className="min-w-0">
                  <span className="block font-sans text-sm font-medium text-key truncate">
                    {archivoNombre || 'Selecciona tu archivo (PDF, AI, EPS, ZIP)'}
                  </span>
                  <span className="block font-mono text-xs text-gris">Máximo 50 MB</span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.ai,.eps,.zip"
                  className="sr-only"
                  onChange={(e) => {
                    setArchivoNombre(e.target.files?.[0]?.name ?? '')
                    setSinArte(false)
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() => { setSinArte(!sinArte); setArchivoNombre('') }}
                className={[
                  'flex items-center justify-between gap-2 rounded-card border px-4 py-3 font-sans text-sm font-medium text-left transition-colors',
                  sinArte ? 'border-ambar bg-ambar/10' : 'border-taupe hover:border-key',
                ].join(' ')}
              >
                <span><span className="font-mono text-xs uppercase tracking-widest text-gris mr-2">¿Sin arte final?</span> Que lo diseñe Nasve</span>
                {sinArte && <Check size={16} className="text-ambar-700" />}
              </button>

              {archivoNombre && (
                <div className="rounded-card border border-key/10 overflow-hidden">
                  <div className="flex items-center gap-2 bg-cyan/15 px-4 py-3">
                    <Check size={16} className="text-cyan" />
                    <span className="font-sans text-sm font-semibold text-key">
                      Listo para imprimir · 1 aviso resuelto por nosotros
                    </span>
                  </div>
                  <ul className="divide-y divide-key/5">
                    {PREFLIGHT.map((f) => (
                      <li key={f.titulo} className="flex items-start gap-3 px-4 py-3">
                        <IconoEstado estado={f.estado} />
                        <div>
                          <p className="font-sans text-sm font-semibold text-key">{f.titulo}</p>
                          <p className="font-sans text-xs text-gris">{f.detalle}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* PASO 3 — PRESUPUESTO */}
          {paso === 3 && producto && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display font-bold text-2xl text-key">Tus datos y te enviamos el presupuesto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Campo label="Nombre *" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellidos" />
                <Campo label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Opcional" />
                <Campo label="Email *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
                <Campo label="Teléfono" type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+34 600 000 000" />
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={rgpd} onChange={(e) => setRgpd(e.target.checked)} className="mt-1 w-4 h-4 accent-key" />
                <span className="font-sans text-sm text-gris leading-relaxed">
                  Acepto la política de privacidad. Mis datos serán tratados por Gráficas NASVE, S.L. para gestionar mi encargo (art. 6.1.b RGPD). *
                </span>
              </label>
              {estado === 'error' && (
                <p className="font-sans text-sm text-coral" role="alert">{errorMsg}</p>
              )}
            </div>
          )}

          {/* Navegación */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {paso > 0 ? (
              <Boton variant="secondary" size="md" onClick={() => setPaso(paso - 1)}>Atrás</Boton>
            ) : <span />}
            {paso > 0 && paso < 3 && (
              <Boton variant="primary" size="md" onClick={() => setPaso(paso + 1)}>Continuar</Boton>
            )}
            {paso === 3 && (
              <Boton variant="dark" size="md" onClick={enviar} disabled={estado === 'loading'} className="min-w-52">
                {estado === 'loading' ? (<><Loader2 size={16} className="animate-spin" /> Enviando…</>) : 'Enviar y pedir presupuesto'}
              </Boton>
            )}
          </div>
        </div>

        {/* Aside resumen (sticky, oscuro) */}
        {producto && (
          <aside className="lg:sticky lg:top-24 rounded-card bg-key text-paper-100 overflow-hidden">
            <BarraCMYK height={6} />
            <div className="p-6">
              <p className="font-display font-bold text-lg text-paper-0">{producto.nombre}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-paper-100/50 mb-5">
                {etiquetaCategoria(producto.categoria)}
              </p>
              <dl className="flex flex-col gap-2.5 font-mono text-xs">
                {[
                  ['Cantidad', `${cantidad.toLocaleString('es-ES')} ud`],
                  ['Formato', producto.formato],
                  [producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte', gramaje?.etiqueta ?? '—'],
                  ['Acabado', acabado?.etiqueta ?? '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="uppercase tracking-widest text-paper-100/50">{k}</dt>
                    <dd className="text-right text-paper-0">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-5 border-t border-paper-100/15">
                <p className="font-mono text-xs uppercase tracking-widest text-paper-100/50">Estimado</p>
                <p className="font-display font-extrabold text-3xl text-ambar leading-tight">
                  {formatearPrecioUnidad(precioUnidad)} <span className="text-base font-semibold text-paper-100/70">/ud</span>
                </p>
                <p className="font-mono text-xs text-paper-100/50 mt-1">≈ {formatearEuros(total)} total · orientativo</p>
              </div>
              <div className="mt-4">
                <Chip tono="ambar">Respuesta &lt; 24 h</Chip>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
