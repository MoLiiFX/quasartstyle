import React, { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash2, Package, AlertCircle, CheckCircle, Clock } from 'lucide-react';

// Datos de ejemplo para el inventario
const initialProducts = [
  {
    id: 1,
    name: 'Camiseta Vintage Nike',
    brand: 'Nike',
    size: 'M',
    gender: 'Unisex',
    type: 'Camiseta',
    status: 'disponible',
    purchasePrice: 12,
    salePrice: 25,
    quantity: 3,
    addedBy: 'Lorena',
    dateAdded: '2024-01-15',
    lastUpdate: '2024-01-20'
  },
  {
    id: 2,
    name: 'Sudadera Champion Retro',
    brand: 'Champion',
    size: 'L',
    gender: 'Hombre',
    type: 'Sudadera',
    status: 'vendido',
    purchasePrice: 18,
    salePrice: 35,
    quantity: 0,
    addedBy: 'Admin',
    dateAdded: '2024-01-10',
    lastUpdate: '2024-01-22'
  },
  {
    id: 3,
    name: 'Pantalones Levis 501',
    brand: 'Levis',
    size: '32',
    gender: 'Hombre',
    type: 'Pantalón',
    status: 'stock-bajo',
    purchasePrice: 22,
    salePrice: 45,
    quantity: 1,
    addedBy: 'Lorena',
    dateAdded: '2024-01-12',
    lastUpdate: '2024-01-19'
  },
  {
    id: 4,
    name: 'Chaqueta Adidas Original',
    brand: 'Adidas',
    size: 'S',
    gender: 'Mujer',
    type: 'Chaqueta',
    status: 'disponible',
    purchasePrice: 25,
    salePrice: 55,
    quantity: 2,
    addedBy: 'Admin',
    dateAdded: '2024-01-08',
    lastUpdate: '2024-01-18'
  },
  {
    id: 5,
    name: 'Vestido Zara Vintage',
    brand: 'Zara',
    size: 'M',
    gender: 'Mujer',
    type: 'Vestido',
    status: 'disponible',
    purchasePrice: 15,
    salePrice: 30,
    quantity: 1,
    addedBy: 'Lorena',
    dateAdded: '2024-01-14',
    lastUpdate: '2024-01-21'
  }
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estados para el formulario de añadir/editar producto
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    size: '',
    gender: '',
    type: '',
    purchasePrice: '',
    salePrice: '',
    quantity: 1
  });

  // Obtener marcas únicas para el filtro
  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    const matchesStatus = filterStatus === '' || product.status === filterStatus;
    const matchesGender = filterGender === '' || product.gender === filterGender;
    
    return matchesSearch && matchesBrand && matchesStatus && matchesGender;
  });

  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-700';
      case 'vendido': return 'bg-gray-100 text-gray-700';
      case 'stock-bajo': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Función para obtener el icono del estado
  const getStatusIcon = (status) => {
    switch (status) {
      case 'disponible': return <CheckCircle size={14} />;
      case 'vendido': return <Package size={14} />;
      case 'stock-bajo': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    if (!formData.name || !formData.brand || !formData.purchasePrice || !formData.salePrice) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const newProduct = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now(),
      status: parseInt(formData.quantity) === 0 ? 'vendido' : 
              parseInt(formData.quantity) <= 1 ? 'stock-bajo' : 'disponible',
      addedBy: 'Admin', // En producción sería el usuario actual
      dateAdded: editingProduct ? editingProduct.dateAdded : new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      purchasePrice: parseFloat(formData.purchasePrice),
      salePrice: parseFloat(formData.salePrice),
      quantity: parseInt(formData.quantity)
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? newProduct : p));
    } else {
      setProducts([...products, newProduct]);
    }

    // Resetear formulario
    setFormData({
      name: '',
      brand: '',
      size: '',
      gender: '',
      type: '',
      purchasePrice: '',
      salePrice: '',
      quantity: 1
    });
    setShowAddModal(false);
    setEditingProduct(null);
  };

  // Manejar edición
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      brand: product.brand,
      size: product.size,
      gender: product.gender,
      type: product.type,
      purchasePrice: product.purchasePrice.toString(),
      salePrice: product.salePrice.toString(),
      quantity: product.quantity
    });
    setEditingProduct(product);
    setShowAddModal(true);
  };

  // Manejar eliminación
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Calcular estadísticas
  const stats = {
    total: products.length,
    available: products.filter(p => p.status === 'disponible').length,
    lowStock: products.filter(p => p.status === 'stock-bajo').length,
    sold: products.filter(p => p.status === 'vendido').length
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Inventario</h1>
        <p className="text-slate-600">Gestiona todos los productos de Quasart Style</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-sm text-slate-600">Total</p>
            </div>
            <Package className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-slate-600">Disponibles</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
              <p className="text-sm text-slate-600">Stock Bajo</p>
            </div>
            <AlertCircle className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats.sold}</p>
              <p className="text-sm text-slate-600">Vendidos</p>
            </div>
            <Package className="text-gray-500" size={24} />
          </div>
        </div>
      </div>

      {/* Barra de herramientas */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            >
              <option value="">Todas las marcas</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            >
              <option value="">Todos los estados</option>
              <option value="disponible">Disponible</option>
              <option value="stock-bajo">Stock Bajo</option>
              <option value="vendido">Vendido</option>
            </select>

            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            >
              <option value="">Todos los géneros</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Unisex">Unisex</option>
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Añadir Producto</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Producto</th>
                <th className="text-left p-4 font-medium text-slate-700">Detalles</th>
                <th className="text-left p-4 font-medium text-slate-700">Estado</th>
                <th className="text-left p-4 font-medium text-slate-700">Precios</th>
                <th className="text-left p-4 font-medium text-slate-700">Margen</th>
                <th className="text-left p-4 font-medium text-slate-700">Cantidad</th>
                <th className="text-left p-4 font-medium text-slate-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const margin = ((product.salePrice - product.purchasePrice) / product.purchasePrice * 100).toFixed(1);
                
                return (
                  <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-25">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.brand}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-600">
                        <p>Talla: {product.size}</p>
                        <p>{product.gender} • {product.type}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {getStatusIcon(product.status)}
                        <span className="capitalize">{product.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-slate-600">Compra: €{product.purchasePrice}</p>
                        <p className="font-medium text-slate-800">Venta: €{product.salePrice}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-medium ${margin > 50 ? 'text-green-600' : margin > 30 ? 'text-blue-600' : 'text-orange-600'}`}>
                        +{margin}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-slate-800">{product.quantity}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para añadir/editar producto */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                {editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    placeholder="ej. Camiseta Vintage Nike"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Marca *
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      placeholder="Nike"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Talla
                    </label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      placeholder="M"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Género
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tipo
                    </label>
                    <input
                      type="text"
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      placeholder="Camiseta"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Precio Compra (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      placeholder="12.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Precio Venta (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.salePrice}
                      onChange={(e) => setFormData({...formData, salePrice: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      placeholder="25.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Cantidad
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                {formData.purchasePrice && formData.salePrice && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600">
                      Margen estimado: <span className="font-medium text-green-600">
                        {((parseFloat(formData.salePrice) - parseFloat(formData.purchasePrice)) / parseFloat(formData.purchasePrice) * 100).toFixed(1)}%
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      brand: '',
                      size: '',
                      gender: '',
                      type: '',
                      purchasePrice: '',
                      salePrice: '',
                      quantity: 1
                    });
                  }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  {editingProduct ? 'Actualizar' : 'Añadir'} Producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
