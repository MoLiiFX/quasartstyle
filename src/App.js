import React, { useState } from 'react';
import { User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff } from 'lucide-react';

// Importar componentes (en tu proyecto real, estos estarían en archivos separados)
import Inventory from './components/Inventory';
import Metrics from './components/Metrics';
import Notifications from './components/Notifications';
import SettingsComponent from './components/Settings';

// Componente de Login
const LoginScreen = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md quasart-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4 hover-scale">
            <span className="text-2xl font-bold text-slate-800">QS</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Quasart Style</h1>
          <p className="text-slate-600">Panel de Gestión</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 hover-lift">
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">
                Usuario
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                onKeyPress={handleKeyPress}
                className="form-input"
                placeholder="Introduce tu usuario"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  onKeyPress={handleKeyPress}
                  className="form-input pr-12"
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
              className="quasart-button w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
    <div className="quasart-sidebar">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover-scale cursor-pointer">
            <span className="text-white font-bold">QS</span>
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Quasart Style</h2>
            <p className="text-sm text-slate-500">Gestión de Negocio</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 quasart-scrollbar overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-slate-800 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
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
        <div className="flex items-center space-x-3 mb-4 p-3 rounded-xl bg-slate-50">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
            <User size={20} className="text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-sm text-slate-500 truncate">{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
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
    <div className="p-6 container-quasart">
      <div className="mb-8 quasart-fade-in">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-600">Bienvenido al panel de gestión de Quasart Style</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="kpi-card hover-lift quasart-slide-in">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package size={24} className="text-blue-600" />
            </div>
            <span className="kpi-value">156</span>
          </div>
          <h3 className="kpi-label">Total Productos</h3>
          <div className="kpi-change-positive mt-1">
            <TrendingUp size={16} />
            <span>+12 esta semana</span>
          </div>
        </div>

        <div className="kpi-card hover-lift quasart-slide-in" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <span className="kpi-value">€2,847</span>
          </div>
          <h3 className="kpi-label">Ventas del Mes</h3>
          <div className="kpi-change-positive mt-1">
            <TrendingUp size={16} />
            <span>+18% vs mes anterior</span>
          </div>
        </div>

        <div className="kpi-card hover-lift quasart-slide-in" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Bell size={24} className="text-orange-600" />
            </div>
            <span className="kpi-value">23</span>
          </div>
          <h3 className="kpi-label">Stock Bajo</h3>
          <p className="text-sm text-orange-600 mt-1">Requiere atención</p>
        </div>

        <div className="kpi-card hover-lift quasart-slide-in" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <User size={24} className="text-purple-600" />
            </div>
            <span className="kpi-value">67%</span>
          </div>
          <h3 className="kpi-label">Margen Promedio</h3>
          <div className="kpi-change-positive mt-1">
            <TrendingUp size={16} />
            <span>+3% vs objetivo</span>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="quasart-card hover-lift">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Actividad Reciente</h2>
        <div className="space-y-4">
          {[
            { action: 'Producto añadido', item: 'Camiseta Vintage Nike', user: 'Lorena', time: 'Hace 2 horas', color: 'text-green-600' },
            { action: 'Venta completada', item: 'Chaqueta Adidas', user: 'Sistema', time: 'Hace 4 horas', color: 'text-blue-600' },
            { action: 'Stock actualizado', item: 'Pantalones Levi\'s', user: 'Admin', time: 'Hace 6 horas', color: 'text-orange-600' },
            { action: 'Producto añadido', item: 'Sudadera Champion', user: 'Lorena', time: 'Ayer', color: 'text-green-600' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0 hover:bg-slate-25 rounded-lg px-3 -mx-3 transition-colors">
              <div>
                <p className="font-medium text-slate-800">
                  <span className={activity.color}>{activity.action}:</span> {activity.item}
                </p>
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

// Componente Principal de la App
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
      case 'metrics':
        return <Metrics />;
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
      <main className="flex-1 overflow-auto quasart-scrollbar">
        <div className="min-h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
