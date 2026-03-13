// src/components/manager/ProductCategoriesManager.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ProductCategory {
  id: string
  tipo: string
  descripcion: string | null
  imagen: string | null
  items: string[]
  order: number
}

const emptyForm = { tipo: '', descripcion: '', imagen: '', items: '', order: 0 }

export default function ProductCategoriesManager() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading,    setLoading]    = useState(true)
  const [saving,     setSaving]     = useState(false)
  const [deleting,   setDeleting]   = useState<string | null>(null)
  const [form,       setForm]       = useState(emptyForm)
  const [editing,    setEditing]    = useState<string | null>(null) // id del que se edita
  const [showForm,   setShowForm]   = useState(false)
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState('')

  const load = () => {
    setLoading(true)
    fetch('/api/product-categories')
      .then(r => r.json())
      .then(setCategories)
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm(emptyForm)
    setError('')
    setShowForm(true)
  }

  const openEdit = (cat: ProductCategory) => {
    setEditing(cat.id)
    setForm({
      tipo:        cat.tipo,
      descripcion: cat.descripcion || '',
      imagen:      cat.imagen || '',
      items:       (cat.items as string[]).join('\n'),
      order:       cat.order,
    })
    setError('')
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.tipo.trim()) { setError('El nombre es requerido'); return }
    setSaving(true)
    setError('')

    const body = {
      tipo:        form.tipo.trim(),
      descripcion: form.descripcion.trim() || null,
      imagen:      form.imagen.trim() || null,
      items:       form.items.split('\n').map(s => s.trim()).filter(Boolean),
      order:       Number(form.order) || 0,
    }

    const url    = editing ? `/api/product-categories/${editing}` : '/api/product-categories'
    const method = editing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) { const d = await res.json(); setError(d.message || 'Error al guardar'); return }
      setSuccess(editing ? 'Categoría actualizada' : 'Categoría creada')
      setShowForm(false)
      load()
      setTimeout(() => setSuccess(''), 3000)
    } catch {
      setError('Error de conexión')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta categoría? Esta acción no se puede deshacer.')) return
    setDeleting(id)
    try {
      await fetch(`/api/product-categories/${id}`, { method: 'DELETE' })
      load()
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-4 h-px bg-[#FF7420]" />
            <span className="text-[#FF7420] text-[10px] font-bold uppercase tracking-[0.3em]">Catálogo</span>
          </div>
          <h2 className="text-white font-black text-xl">Categorías de Productos</h2>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Nueva categoría
        </button>
      </div>

      {success && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-3 rounded-xl">{success}</div>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold text-sm">{editing ? 'Editar categoría' : 'Nueva categoría'}</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Nombre *</label>
              <input
                value={form.tipo}
                onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))}
                placeholder="ej. Detección de gas y flama"
                className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Orden</label>
              <input
                type="number"
                value={form.order}
                onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))}
                className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 text-white text-sm px-4 py-3 rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
              placeholder="Descripción breve de la categoría..."
              rows={2}
              className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Ruta de imagen</label>
            <input
              value={form.imagen}
              onChange={e => setForm(f => ({ ...f, imagen: e.target.value }))}
              placeholder="/productos/nombre-imagen.jpg"
              className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Productos <span className="normal-case font-normal text-gray-500">(uno por línea)</span>
            </label>
            <textarea
              value={form.items}
              onChange={e => setForm(f => ({ ...f, items: e.target.value }))}
              placeholder={"Detectores fijos de gas\nKits de calibración\nControladores CEP"}
              rows={6}
              className="w-full bg-[#1a1a1a] border border-white/10 focus:border-[#FF7420]/50 text-white placeholder-gray-600 text-sm px-4 py-3 rounded-xl outline-none transition-colors resize-none font-mono"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium px-4 py-2.5 rounded-xl">{error}</div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-[#FF7420] hover:bg-[#e5681c] disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-colors"
            >
              {saving ? (
                <><div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />Guardando...</>
              ) : (
                editing ? 'Actualizar' : 'Crear categoría'
              )}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-300 text-sm font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#FF7420]" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <p className="font-bold mb-1">Sin categorías</p>
          <p className="text-sm">Crea la primera categoría de productos.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.id} className="bg-[#141414] border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-colors">

              {/* Imagen */}
              <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-[#1a1a1a]">
                {cat.imagen ? (
                  <Image src={cat.imagen} alt={cat.tipo} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-white font-bold text-sm">{cat.tipo}</p>
                  <span className="text-[10px] text-gray-600 font-mono">#{cat.order}</span>
                </div>
                {cat.descripcion && <p className="text-gray-500 text-xs mb-2 leading-relaxed">{cat.descripcion}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {(cat.items as string[]).slice(0, 4).map((item, i) => (
                    <span key={i} className="bg-white/5 text-gray-400 text-[10px] px-2 py-0.5 rounded-md">{item}</span>
                  ))}
                  {(cat.items as string[]).length > 4 && (
                    <span className="bg-white/5 text-gray-600 text-[10px] px-2 py-0.5 rounded-md">+{(cat.items as string[]).length - 4} más</span>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(cat)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  disabled={deleting === cat.id}
                  className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-500 transition-colors disabled:opacity-50"
                >
                  {deleting === cat.id ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-500/30 border-t-red-500" />
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
