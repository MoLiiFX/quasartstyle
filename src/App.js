import React, { useState } from 'react';
import { 
  User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff, 
  Search, Plus, Edit2, Trash2, AlertCircle, CheckCircle, 
  Clock, Download, Save, Shield, Database, Mail, Smartphone, X, AlertTriangle,
  DollarSign, Star
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Datos de ejemplo para inventario
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
  }
];

// Datos para las gráficas
const salesData = [
  { name: 'Ene', ventas: 1200, compras: 800, beneficio: 400 },
  { name: 'Feb', ventas: 1800, compras: 1100, beneficio: 700 },
  { name: 'Mar', ventas: 2200, compras: 1400, beneficio: 800 },
  { name: 'Abr', ventas: 1900, compras: 1200, beneficio: 700 },
  { name: 'May', ventas: 2400, compras: 1500, beneficio: 900 },
  { name: 'Jun', ventas: 2800, compras: 1700, beneficio: 1100 },
];

const brandData = [
  { name: 'Nike', ventas: 4500, porcentaje: 28, productos: 45 },
  { name: 'Adidas', ventas: 3200, porcentaje: 20, productos: 32 },
  { name: 'Champion', ventas: 2800, porcentaje: 17, productos: 28 },
  { name: 'Levi\'s', ventas: 2200, porcentaje: 14, productos: 22 },
  { name: 'Zara', ventas: 1800, porcentaje: 11, productos: 18 },
  { name: 'Otros', ventas: 1600, porcentaje: 10, productos: 16 },
];

const categoryData = [
  { name: 'Camisetas', value: 35, color: '#3B82F6' },
  { name: 'Sudaderas', value: 28, color: '#10B981' },
  { name: 'Pantalones', value: 22, color: '#F59E0B' },
  { name: 'Chaquetas', value: 15, color: '#EF4444' },
];

// Datos de notificaciones
const initialNotifications = [
  {
    id: 1,
    type: 'stock_low',
    title: 'Stock bajo en productos',
    message: '5 productos tienen stock crítico y necesitan reposición',
    timestamp: new Date('2024-01-25T10:30:00'),
    priority: 'high',
    read: false,
    actionRequired: true,
    data: { products: ['Camiseta Nike Vintage', 'Pantalones Levi\'s 501'] }
  },
  {
    id: 2,
    type: 'sale',
    title: 'Nueva venta completada',
    message: 'Chaqueta Adidas Original - €55',
    timestamp: new Date('2024-01-25T09:15:00'),
    priority: 'medium',
    read: false,
    actionRequired: false,
    data: { product: 'Chaqueta Adidas Original', amount: 55, buyer: 'Cliente Vinted' }
  }
];

// Componente de Login
const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!credentials.username || !credentials.password) return;
    
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        username: credentials.username,
        name: credentials.username === 'admin' ? 'Administrador' : 'Lorena',
        role: credentials.username === 'admin' ? 'Fundador' : 'Fundadora'
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-2xl font-bold text-slate-800">QS</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Quasart Style</h1>
          <p className="text-slate-600">Panel de Gestión</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Usuario</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="Introduce tu usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                  placeholder="Introduce tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !credentials.username || !credentials.password}
              className="w-full bg-slate-800 text-white py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-center space-y-2">
              <p className="text-xs text-slate-500">Usuarios de prueba:</p>
              <div className="text-xs text-slate-400 space-y-1">
                <p><strong>admin</strong> / cualquier contraseña</p>
                <p><strong>lorena</strong> / cualquier contraseña</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente del Sidebar
const Sidebar = ({ activeSection, setActiveSection, user, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'inventory', label: 'Inventario', icon: Package },
    { id: 'metrics', label: 'Métricas', icon: TrendingUp },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">QS</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Quasart Style</h2>
            <p className="text-sm text-slate-500">Gestión de Negocio</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    activeSection === item.id
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <User size={20} className="text-slate-600" />
          </div>
          <div>
            <p className="font-medium text-slate-800">{user.name}</p>
            <p className="text-sm text-slate-500">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

// Dashboard Principal
const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Bienvenido al panel de gestión de Quasart Style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package size={24} className="text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">156</span>
          </div>
          <h3 className="font-medium text-slate-600">Total Productos</h3>
          <p className="text-sm text-green-600 mt-1">+12 esta semana</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">€2,847</span>
          </div>
          <h3 className="font-medium text-slate-600">Ventas del Mes</h3>
          <p className="text-sm text-green-600 mt-1">+18% vs mes anterior</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Bell size={24} className="text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">23</span>
          </div>
          <h3 className="font-medium text-slate-600">Stock Bajo</h3>
          <p className="text-sm text-orange-600 mt-1">Requiere atención</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">67%</span>
          </div>
          <h3 className="font-medium text-slate-600">Margen Promedio</h3>
          <p className="text-sm text-green-600 mt-1">+3% vs objetivo</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            { action: 'Producto añadido', item: 'Camiseta Vintage Nike', user: 'Lorena', time: 'Hace 2 horas' },
            { action: 'Venta completada', item: 'Chaqueta Adidas', user: 'Sistema', time: 'Hace 4 horas' },
            { action: 'Stock actualizado', item: 'Pantalones Levi\'s', user: 'Admin', time: 'Hace 6 horas' },
            { action: 'Producto añadido', item: 'Sudadera Champion', user: 'Lorena', time: 'Ayer' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
              <div>
                <p className="font-medium text-slate-800">{activity.action}: {activity.item}</p>
                <p className="text-sm text-slate-500">Por {activity.user}</p>
              </div>
              <span className="text-sm text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Inventario
const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
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

  const uniqueBrands = [...new Set(products.map(p => p.brand))];
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.brand) return;
    
    const newProduct = {
      ...formData,
      id: Date.now(),
      status: parseInt(formData.quantity) <= 1 ? 'stock-bajo' : 'disponible',
      addedBy: 'Admin',
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      salePrice: parseFloat(formData.salePrice) || 0,
      quantity: parseInt(formData.quantity) || 1
    };

    setProducts([...products, newProduct]);
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
  };

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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
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

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left p-4 font-medium text-slate-700">Producto</th>
                <th className="text-left p-4 font-medium text-slate-700">Detalles</th>
                <th className="text-left p-4 font-medium text-slate-700">Estado</th>
                <th className="text-left p-4 font-medium text-slate-700">Precios</th>
                <th className="text-left p-4 font-medium text-slate-700">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.brand}</p>
                    </div>
                  </td>
                  <t
