'use client'

import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: number
  stock: number
}

const categories = [
  { value: 'gas_detection',          label: 'Detección de gas' },
  { value: 'fire_detection',         label: 'Detección de incendios' },
  { value: 'fall_protection',        label: 'Protección contra caídas' },
  { value: 'automation',             label: 'Automatización' },
  { value: 'emergency_notification', label: 'Notificación de emergencias' },
  { value: 'intercom_paging',        label: 'Intercomunicación y voceo' },
  { value: 'air_gas_treatment',      label: 'Tratamiento de aire y gas' },
  { value: 'air_compression',        label: 'Compresión de aire' },
  { value: 'switches',               label: 'Interruptores' },
  { value: 'equipment_protection',   label: 'Protección de equipos' },
  { value: 'video_surveillance',     label: 'Videovigilancia' },
  { value: 'instrument_air',         label: 'Aire para instrumentos' },
]

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className="w-4 h-px bg-[#FF7420]" />
      <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">{text}</span>
    </div>
  )
}

const DarkInput = ({
  name, type = 'text', placeholder, value, onChange, required = false
}: {
  name: string; type?: string; placeholder: string; value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean
}) => (
  <input
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
  />
)

export default function ProductManagement() {
  const [products, setProducts]   = useState<Product[]>([])
  const [newProduct, setNewProd]  = useState<Partial<Product>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [loadingList, setLoadingList] = useState(true)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error()
      setProducts(await res.json())
    } catch {
      toast.error('No se pudieron cargar los productos.')
    } finally {
      setLoadingList(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProd({ ...newProduct, [name]: value })
  }

  const handleCategoryChange = (value: string) => {
    setNewProd({ ...newProduct, category: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      })
      if (!res.ok) throw new Error()
      toast.success('Producto creado exitosamente')
      setNewProd({})
      fetchProducts()
    } catch {
      toast.error('No se pudo crear el producto.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Formulario nuevo producto */}
      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 p-6">
        <SectionLabel text="Agregar producto" />
        <form onSubmit={handleSubmit} className="space-y-3">
          <DarkInput
            name="name"
            placeholder="Nombre del producto"
            value={newProduct.name || ''}
            onChange={handleInputChange}
            required
          />

          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-gray-300 rounded-xl">
              <SelectValue placeholder="Seleccione una categoría" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              {categories.map(c => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <textarea
            name="description"
            placeholder="Descripción del producto"
            value={newProduct.description || ''}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full bg-[#1a1a1a] border border-white/10 hover:border-white/20 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors resize-none"
          />

          <div className="grid grid-cols-2 gap-3">
            <DarkInput
              name="price"
              type="number"
              placeholder="Precio (MXN)"
              value={newProduct.price || ''}
              onChange={handleInputChange}
              required
            />
            <DarkInput
              name="stock"
              type="number"
              placeholder="Stock"
              value={newProduct.stock || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-50 text-white text-sm font-bold py-3 rounded-xl transition-colors"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creando...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear Producto
              </>
            )}
          </button>
        </form>
      </div>

      {/* Lista de productos */}
      <div>
        <SectionLabel text={`Productos (${products.length})`} />
        {loadingList ? (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#FF7420]" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 bg-[#1a1a1a] rounded-2xl border border-white/5">
            <p className="text-gray-500 text-sm">No hay productos registrados aún</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map(product => (
              <div key={product.id} className="bg-[#1a1a1a] rounded-2xl border border-white/5 hover:border-white/10 p-5 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-white font-bold text-sm leading-tight">{product.name}</h4>
                  <span className="shrink-0 text-[#FF7420] font-black text-sm">
                    ${Number(product.price).toLocaleString('es-MX')}
                  </span>
                </div>
                <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-wider mb-2">
                  {categories.find(c => c.value === product.category)?.label ?? product.category}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <p className="text-gray-500 text-xs">{product.description}</p>
                  <span className={`shrink-0 ml-3 inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    product.stock > 10 ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    product.stock > 0  ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                         'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {product.stock} en stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}