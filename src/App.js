import React, { useState, useEffect } from 'react';
import { User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff } from 'lucide-react';

// Componente de Login
const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulamos autenticación (en producción conectarías con tu backend)
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        onLogin({
          username: credentials.username,
          name: credentials.username === 'admin' ? 'Administrador' : 'Lorena',
          role: credentials.username === 'admin' ? 'Fundador' : 'Fundadora'
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <span className="text-2xl font-bold text-slate-800">QS</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Quasart Style</h1>
          <p className="text-slate-600">Panel de Gestión</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="Introduce tu usuario"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
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
              disabled={isLoading}
              className="w-full bg-slate-800 text-white py-3 px-6 rounded-xl hover:bg-slate-700 transition-colors font-medium shadow-lg disabled:opacity-50"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Demo: usa cualquier usuario y contraseña
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
    { id: 'metrics', label: 'Métricas', icon: TrendingUp },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      {/* Header */}
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

      {/* Menu Items */}
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

      {/* User Info */}
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

// Componente Dashboard Principal
const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Bienvenido al panel de gestión de Quasart Style</p>
      </div>

      {/* KPI Cards */}
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

      {/* Actividad Reciente */}
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

// Placeholder para otras secciones
const PlaceholderSection = ({ title }) => (
  <div className="p-6">
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">{title}</h2>
      <p className="text-slate-600">Esta sección está en desarrollo...</p>
    </div>
  </div>
);

// Componente Principal de la App
const QuasartApp = () => {
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
        return <PlaceholderSection title="Inventario" />;
      case 'metrics':
        return <PlaceholderSection title="Métricas" />;
      case 'notifications':
        return <PlaceholderSection title="Notificaciones" />;
      case 'settings':
        return <PlaceholderSection title="Ajustes" />;
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
        {renderContent()}
      </main>
    </div>
  );
};

export default QuasartApp;
