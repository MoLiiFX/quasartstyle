import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Download, 
  Upload,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Globe,
  HelpCircle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados para configuración
  const [profileData, setProfileData] = useState({
    name: 'Administrador',
    email: 'admin@quasartstyle.com',
    role: 'Fundador',
    phone: '+34 666 777 888',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    stockAlerts: true,
    salesNotifications: true,
    weeklyReports: true,
    systemUpdates: false
  });

  const [systemSettings, setSystemSettings] = useState({
    currency: 'EUR',
    language: 'es',
    timezone: 'Europe/Madrid',
    dateFormat: 'DD/MM/YYYY',
    darkMode: false,
    compactView: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    loginAlerts: true,
    dataExportEnabled: true
  });

  const handleSaveProfile = () => {
    // Aquí guardarías los datos del perfil
    alert('Perfil actualizado correctamente');
  };

  const handleSaveNotifications = () => {
    // Aquí guardarías las preferencias de notificaciones
    alert('Preferencias de notificaciones guardadas');
  };

  const handleSaveSecurity = () => {
    // Aquí guardarías la configuración de seguridad
    alert('Configuración de seguridad actualizada');
  };

  const handleExportData = () => {
    // Simular exportación de datos
    const data = {
      exportDate: new Date().toISOString(),
      profile: profileData,
      settings: {
        notifications: notificationSettings,
        system: systemSettings,
        security: securitySettings
      }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quasart-settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('Configuración exportada correctamente');
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-slate-800 text-white' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Ajustes</h1>
        <p className="text-slate-600">Configura tu experiencia en Quasart Style</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de navegación */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
            <nav className="space-y-2">
              <TabButton 
                id="profile" 
                label="Perfil" 
                icon={User}
                isActive={activeTab === 'profile'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="notifications" 
                label="Notificaciones" 
                icon={Bell}
                isActive={activeTab === 'notifications'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="security" 
                label="Seguridad" 
                icon={Shield}
                isActive={activeTab === 'security'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="system" 
                label="Sistema" 
                icon={Database}
                isActive={activeTab === 'system'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="appearance" 
                label="Apariencia" 
                icon={Palette}
                isActive={activeTab === 'appearance'} 
                onClick={setActiveTab} 
              />
              <TabButton 
                id="backup" 
                label="Backup" 
                icon={Download}
                isActive={activeTab === 'backup'} 
                onClick={setActiveTab} 
              />
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Información del Perfil</h2>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {profileData.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{profileData.name}</h3>
                    <p className="text-slate-600">{profileData.role}</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Cambiar foto
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Rol
                    </label>
                    <input
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Cambiar Contraseña</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contraseña actual
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={profileData.currentPassword}
                          onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
                          className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        value={profileData.newPassword}
                        onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Confirmar contraseña
                      </label>
                      <input
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Guardar cambios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Preferencias de Notificaciones</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-800">Canales de notificación</h4>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div className="flex items-center space-x-3">
                        <Mail className="text-slate-500" size={20} />
                        <div>
                          <p className="font-medium text-slate-800">Notificaciones por email</p>
                          <p className="text-sm text-slate-600">Recibe actualizaciones en tu correo</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="text-slate-500" size={20} />
                        <div>
                          <p className="font-medium text-slate-800">Notificaciones push</p>
                          <p className="text-sm text-slate-600">Alertas en tiempo real en el navegador</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-semibold text-slate-800">Tipos de notificación</h4>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-800">Alertas de stock bajo</p>
                        <p className="text-sm text-slate-600">Cuando productos tengan poco inventario</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.stockAlerts}
                        onChange={(e) => setNotificationSettings({...notificationSettings, stockAlerts: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-800">Notificaciones de ventas</p>
                        <p className="text-sm text-slate-600">Cuando se complete una venta</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.salesNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, salesNotifications: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-800">Reportes semanales</p>
                        <p className="text-sm text-slate-600">Resumen semanal de rendimiento</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.weeklyReports}
                        onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReports: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                      <div>
                        <p className="font-medium text-slate-800">Actualizaciones del sistema</p>
                        <p className="text-sm text-slate-600">Nuevas funciones y mantenimiento</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemUpdates}
                        onChange={(e) => setNotificationSettings({...notificationSettings, systemUpdates: e.target.checked})}
                        className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotifications}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Guardar preferencias</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Configuración de Seguridad</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-blue-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium text-blue-900">Estado de seguridad: Bueno</h4>
                      <p className="text-sm text-blue-700 mt-1">Tu cuenta está protegida con las medidas básicas de seguridad.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">Autenticación de dos factores</p>
                      <p className="text-sm text-slate-600">Añade una capa extra de seguridad a tu cuenta</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorEnabled}
                      onChange={(e) => setSecuritySettings({...securitySettings, twoFactorEnabled: e.target.checked})}
                      className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">Alertas de inicio de sesión</p>
                      <p className="text-sm text-slate-600">Recibe notificaciones cuando alguien acceda a tu cuenta</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={securitySettings.loginAlerts}
                      onChange={(e) => setSecuritySettings({...securitySettings, loginAlerts: e.target.checked})}
                      className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                    />
                  </label>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-semibold text-slate-800">Configuración de sesión</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tiempo de inactividad (minutos)
                    </label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value={15}>15 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={60}>1 hora</option>
                      <option value={120}>2 horas</option>
                      <option value={-1}>Nunca</option>
                    </select>
                    <p className="text-sm text-slate-500 mt-1">Tiempo antes de cerrar sesión automáticamente</p>
                  </div>
                </div>

                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-semibold text-slate-800">Gestión de datos</h4>
                  
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Download className="text-slate-500" size={20} />
                        <div className="text-left">
                          <p className="font-medium text-slate-800">Exportar mis datos</p>
                          <p className="text-sm text-slate-600">Descarga una copia de toda tu información</p>
                        </div>
                      </div>
                      <span className="text-slate-400">→</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Database className="text-red-500" size={20} />
                        <div className="text-left">
                          <p className="font-medium text-red-800">Eliminar mi cuenta</p>
                          <p className="text-sm text-red-600">Elimina permanentemente tu cuenta y datos</p>
                        </div>
                      </div>
                      <span className="text-red-400">→</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSecurity}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Guardar configuración</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Configuración del Sistema</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Moneda
                    </label>
                    <select
                      value={systemSettings.currency}
                      onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dólar ($)</option>
                      <option value="GBP">Libra (£)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Idioma
                    </label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Zona horaria
                    </label>
                    <select
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="Europe/Madrid">Madrid (UTC+1)</option>
                      <option value="Europe/London">Londres (UTC+0)</option>
                      <option value="America/New_York">Nueva York (UTC-5)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Formato de fecha
                    </label>
                    <select
                      value={systemSettings.dateFormat}
                      onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-800 mb-4">Información del sistema</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700">Versión de la aplicación</p>
                      <p className="text-lg font-semibold text-slate-900">v2.1.0</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700">Última actualización</p>
                      <p className="text-lg font-semibold text-slate-900">25 Ene 2024</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700">Navegador</p>
                      <p className="text-lg font-semibold text-slate-900">Chrome 120.0</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-700">Estado del servidor</p>
                      <p className="text-lg font-semibold text-green-600">Operativo</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => alert('Configuración del sistema guardada')}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Guardar configuración</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Personalización de Apariencia</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">Modo oscuro</p>
                      <p className="text-sm text-slate-600">Cambia a un tema oscuro para reducir el cansancio visual</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={systemSettings.darkMode}
                      onChange={(e) => setSystemSettings({...systemSettings, darkMode: e.target.checked})}
                      className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-800">Vista compacta</p>
                      <p className="text-sm text-slate-600">Reduce el espaciado para mostrar más información</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={systemSettings.compactView}
                      onChange={(e) => setSystemSettings({...systemSettings, compactView: e.target.checked})}
                      className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
                    />
                  </label>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-800 mb-4">Vista previa del tema</h4>
                  <div className="p-6 border border-slate-200 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">QS</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Quasart Style</h3>
                          <p className="text-sm text-slate-600">Panel de gestión</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg text-center">
                          <p className="text-xl font-bold text-blue-600">156</p>
                          <p className="text-xs text-blue-800">Productos</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-center">
                          <p className="text-xl font-bold text-green-600">€2,847</p>
                          <p className="text-xs text-green-800">Ventas</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg text-center">
                          <p className="text-xl font-bold text-purple-600">67%</p>
                          <p className="text-xs text-purple-800">Margen</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 text-center">Vista previa de la interfaz</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => alert('Configuración de apariencia guardada')}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>Aplicar cambios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Copia de Seguridad y Restauración</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="text-green-600 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium text-green-900">Última copia de seguridad</h4>
                      <p className="text-sm text-green-700 mt-1">Realizada el 25 de enero de 2024 a las 12:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={handleExportData}
                    className="p-6 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <Download size={32} className="text-slate-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 mb-2">Exportar datos</h4>
                    <p className="text-sm text-slate-600">Descarga una copia completa de tu configuración</p>
                  </button>

                  <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg">
                    <Upload size={32} className="text-slate-400 mx-auto mb-3" />
                    <h4 className="font-semibold text-slate-800 mb-2">Importar configuración</h4>
                    <p className="text-sm text-slate-600 mb-3">Restaura tu configuración desde un archivo</p>
                    <input
                      type="file"
                      accept=".json"
                      className="text-sm text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold text-slate-800 mb-4">Historial de copias de seguridad</h4>
                  <div className="space-y-3">
                    {[
                      { date: '25 Ene 2024, 12:00 PM', size: '2.3 MB', type: 'Automática' },
                      { date: '24 Ene 2024, 12:00 PM', size: '2.1 MB', type: 'Automática' },
                      { date: '23 Ene 2024, 12:00 PM', size: '2.0 MB', type: 'Automática' },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{backup.date}</p>
                          <p className="text-sm text-slate-600">{backup.type} • {backup.size}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Restaurar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-slate-800">Copia de seguridad automática</h4>
                      <p className="text-sm text-slate-600 mt-1">Se realiza diariamente a las 12:00 PM</p>
                    </div>
                    <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
