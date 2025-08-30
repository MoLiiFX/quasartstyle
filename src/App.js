import React, { useState } from 'react';
import { User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff, Search, Plus } from 'lucide-react';

// Componente de Login
const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (credentials.username && credentials.password) {
      onLogin({
        username: credentials.username,
        name: credentials.username === 'admin' ? 'Administrador' : 'Lorena',
        role: credentials.username === 'admin' ? 'Fundador' : 'Fundadora'
      });
    }
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
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400"
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
                  className="w-full px-4 py-3 pr-12 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400"
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
              className="w-full bg-slate-800 text-white py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors font-medium shadow-lg"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Prueba con <strong>admin</strong> o <strong>lorena</strong> y cualquier contraseña
            </p>
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
          <div className="flex items-center justify-between py-3 border-b border-slate-50">
            <div>
              <p className="font-medium text-slate-800">Producto añadido: Camiseta Vintage Nike</p>
              <p className="text-sm text-slate-500">Por Lorena</p>
            </div>
            <span className="text-sm text-slate-400">Hace 2 horas</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-50">
            <div>
              <p className="font-medium text-slate-800">Venta completada: Chaqueta Adidas</p>
              <p className="text-sm text-slate-500">Por Sistema</p>
            </div>
            <span className="text-sm text-slate-400">Hace 4 horas</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-slate-800">Stock actualizado: Pantalones Levi's</p>
              <p className="text-sm text-slate-500">Por Admin</p>
            </div>
            <span className="text-sm text-slate-400">Hace 6 horas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Inventario Simple
const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const products = [
    { id: 1, name: 'Camiseta Vintage Nike', brand: 'Nike', price: '25€', status: 'Disponible' },
    { id: 2, name: 'Sudadera Champion', brand: 'Champion', price: '35€', status: 'Vendido' },
    { id: 3, name: 'Pantalones Levis', brand: 'Levis', price: '45€', status: 'Stock Bajo' }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Inventario</h1>
        <p className="text-slate-600">Gestiona todos los productos de Quasart Style</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex justify-between items-center">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            />
          </div>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2">
            <Plus size={16} />
            <span>Añadir Producto</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 font-medium text-slate-700">Producto</th>
              <th className="text-left p-4 font-medium text-slate-700">Marca</th>
              <th className="text-left p-4 font-medium text-slate-700">Precio</th>
              <th className="text-left p-4 font-medium text-slate-700">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-slate-50">
                <td className="p-4 font-medium text-slate-800">{product.name}</td>
                <td className="p-4 text-slate-600">{product.brand}</td>
                <td className="p-4 text-slate-600">{product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'Disponible' ? 'bg-green-100 text-green-700' :
                    product.status === 'Vendido' ? 'bg-gray-100 text-gray-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Notificaciones Simple
const Notifications = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Notificaciones</h1>
        <p className="text-slate-600">Centro de alertas y actividades</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-red-500 p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Stock bajo en productos</h3>
          <p className="text-slate-600">5 productos necesitan reposición urgente</p>
          <span className="text-sm text-slate-400 mt-2 block">Hace 2 horas</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 border-l-green-500 p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Nueva venta completada</h3>
          <p className="text-slate-600">Chaqueta Adidas vendida por 55€</p>
          <span className="text-sm text-slate-400 mt-2 block">Hace 4 horas</span>
        </div>
      </div>
    </div>
  );
};

// Configuración Simple
const SettingsComponent = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Ajustes</h1>
        <p className="text-slate-600">Configura tu cuenta</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Perfil de Usuario</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
            <input
              type="text"
              defaultValue="Administrador"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="admin@quasartstyle.com"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <button className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

// App Principal
function App() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('dashboard');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
