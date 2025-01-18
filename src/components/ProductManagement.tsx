import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}

const categories = [
  { value: 'gas_detection', label: 'Detección de gas' },
  { value: 'fire_detection', label: 'Detección de incendios' },
  { value: 'fall_protection', label: 'Protección contra caídas' },
  { value: 'automation', label: 'Automatización' },
  { value: 'emergency_notification', label: 'Notificación de emergencias' },
  { value: 'intercom_paging', label: 'Intercomunicación y voceo' },
  { value: 'air_gas_treatment', label: 'Tratamiento de aire y gas' },
  { value: 'air_compression', label: 'Compresión de aire' },
  { value: 'switches', label: 'Interruptores' },
  { value: 'equipment_protection', label: 'Protección de equipos' },
  { value: 'video_surveillance', label: 'Videovigilancia' },
  { value: 'instrument_air', label: 'Aire para instrumentos' }
];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      toast.error('No se pudieron cargar los productos. Por favor, intente nuevamente.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct({ ...newProduct, category: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }
      toast.success('Producto creado exitosamente');
      setNewProduct({});
      fetchProducts();
    } catch (error) {
      console.error('Error al crear el producto:', error);
      toast.error('No se pudo crear el producto. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={newProduct.name || ''}
          onChange={handleInputChange}
          placeholder="Nombre del producto"
          required
        />
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Textarea
          name="description"
          value={newProduct.description || ''}
          onChange={handleInputChange}
          placeholder="Descripción del producto"
          required
        />
        <Input
          name="price"
          type="number"
          value={newProduct.price || ''}
          onChange={handleInputChange}
          placeholder="Precio"
          required
        />
        <Input
          name="stock"
          type="number"
          value={newProduct.stock || ''}
          onChange={handleInputChange}
          placeholder="Stock"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </form>
      <div>
        <h3 className="text-xl font-semibold mb-2">Lista de Productos</h3>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id} className="border p-2 rounded">
              <p><strong>Nombre:</strong> {product.name}</p>
              <p><strong>Categoría:</strong> {categories.find(c => c.value === product.category)?.label}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

