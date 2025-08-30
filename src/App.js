// COMPONENTE NOTIFICACIONES
const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRead = !showUnreadOnly || !notification.read;
    
    return matchesFilter && matchesSearch && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'stock_low': return <AlertTriangle className="text-orange-500" size={20} />;
      case 'sale': return <TrendingUp className="text-green-500" size={20} />;
      case 'user_activity': return <User className="text-blue-500" size={20} />;
      case 'milestone': return <CheckCircle className="text-purple-500" size={20} />;
      case 'price_change': return <Package className="text-indigo-500" size={20} />;
      case 'system': return <Clock className="text-gray-500" size={20} />;
      default: return <Bell className="text-slate-500" size={20} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} horas`;
    if (days < 7) return `Hace ${days} días`;
    return timestamp.toLocaleDateString();
  };

  const stats = {
    total: notifications.length,
    unread: unreadCount,
    highPriority: notifications.filter(n => n.priority === 'high' && !n.read).length,
    actionRequired: notifications.filter(n => n.actionRequired && !n.read).length
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Centro de Notificaciones</h1>
            <p className="text-slate-600">Mantente al día con todas las actividades de Quasart Style</p>
          </div>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Marcar todas como leídas
          </button>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              <p className="text-sm text-slate-600">Total</p>
            </div>
            <Bell className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.unread}</p>
              <p className="text-sm text-slate-600">No leídas</p>
            </div>
            <AlertCircle className="text-orange-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.highPriority}</p>
              <p className="text-sm text-slate-600">Alta prioridad</p>
            </div>
            <AlertTriangle className="text-red-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.actionRequired}</p>
              <p className="text-sm text-slate-600">Requieren acción</p>
            </div>
            <CheckCircle className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar notificaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            >
              <option value="all">Todos los tipos</option>
              <option value="stock_low">Stock bajo</option>
              <option value="sale">Ventas</option>
              <option value="user_activity">Actividad usuario</option>
              <option value="milestone">Hitos</option>
              <option value="price_change">Cambios de precio</option>
              <option value="system">Sistema</option>
            </select>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="rounded border-slate-300 text-slate-800 focus:ring-slate-400"
              />
              <span className="text-sm text-slate-600">Solo no leídas</span>
            </label>
          </div>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
            <Bell size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No hay notificaciones</h3>
            <p className="text-slate-500">No se encontraron notificaciones con los filtros actuales</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-slate-100 ${getPriorityColor(notification.priority)} border-l-4 transition-all hover:shadow-md ${
                !notification.read ? 'bg-slate-50/50' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            Acción requerida
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-600 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{formatTime(notification.timestamp)}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {notification.priority === 'high' ? 'Alta' : 
                           notification.priority === 'medium' ? 'Media' : 'Baja'} prioridad
                        </span>
                      </div>

                      {/* Datos adicionales según el tipo */}
                      {notification.type === 'stock_low' && notification.data.products && (
                        <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                          <p className="text-sm font-medium text-orange-800 mb-1">Productos afectados:</p>
                          <ul className="text-sm text-orange-700 space-y-1">
                            {notification.data.products.map((product, index) => (
                              <li key={index}>• {product}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {notification.type === 'sale' && notification.data && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-green-800">
                            <p><span className="font-medium">Producto:</span> {notification.data.product}</p>
                            <p><span className="font-medium">Importe:</span> €{notification.data.amount}</p>
                            <p><span className="font-medium">Comprador:</span> {notification.data.buyer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Marcar como leída"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar notificación"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Botones de acción específicos */}
                {notification.actionRequired && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex space-x-3">
                      {notification.type === 'stock_low' && (
                        <>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                            Ver inventario
                          </button>
                          <button className="border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                            Programar reposición
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// COMPONENTE CONFIGURACIÓN
const SettingsComponent = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
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

  const handleSaveProfile = () => {
    alert('Perfil actualizado correctamente');
  };

  const handleSaveNotifications = () => {
    alert('Preferencias de notificaciones guardadas');
  };

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      profile: profileData,
      settings: {
        notifications: notificationSettings,
        system: systemSettings
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};// COMPONENTE MÉTRICAS
const Metrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');

  const kpis = {
    totalRevenue: 16100,
    totalProfit: 5400,
    averageMargin: 67.2,
    totalProducts: 156,
    soldThisMonth: 89,
    pendingProducts: 67,
    topBrand: 'Nike',
    growthRate: 18.5
  };

  const generateReport = () => {
    const reportData = {
      period: selectedPeriod,
      date: new Date().toLocaleDateString(),
      ...kpis,
      salesData,
      brandData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `quasart-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-slate-800 text-white' 
          : 'text-slate-600 hover:bg-slate-100'
  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-slate-800 text-white' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );

  const StatCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color === 'blue' ? 'bg-blue-100' : color === 'green' ? 'bg-green-100' : color === 'orange' ? 'bg-orange-100' : 'bg-purple-100'} rounded-xl flex items-center justify-center`}>
          <Icon size={24} className={`${color === 'blue' ? 'text-blue-600' : color === 'green' ? 'text-green-600' : color === 'orange' ? 'text-orange-600' : 'text-purple-600'}`} />
        </div>
        <span className="text-2xl font-bold text-slate-800">{value}</span>
      </div>
      <h3 className="font-medium text-slate-600 mb-1">{title}</h3>
      {change && (
        <div className="flex items-center space-x-1">
          {change > 0 ? <TrendingUp size={16} className="text-green-500" /> : <TrendingUp size={16} className="text-red-500" />}
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Métricas y Análisis</h1>
            <p className="text-slate-600">Dashboard completo de rendimiento de Quasart Style</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-400"
            >
              <option value="1m">Último mes</option>
              <option value="3m">Últimos 3 meses</option>
              <option value="6m">Últimos 6 meses</option>
              <option value="1y">Último año</option>
            </select>
            <button
              onClick={generateReport}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center space-x-2"
            >
              <Download size={16} />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton 
          id="overview" 
          label="Resumen" 
          isActive={activeTab === 'overview'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="financial" 
          label="Financiero" 
          isActive={activeTab === 'financial'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="products" 
          label="Productos" 
          isActive={activeTab === 'products'} 
          onClick={setActiveTab} 
        />
        <TabButton 
          id="brands" 
          label="Marcas" 
          isActive={activeTab === 'brands'} 
          onClick={setActiveTab} 
        />
      </div>

      {/* Contenido según tab activa */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Ingresos Totales"
              value={`€${kpis.totalRevenue.toLocaleString()}`}
              change={18.5}
              icon={DollarSign}
              color="green"
            />
            <StatCard
              title="Beneficio Total"
              value={`€${kpis.totalProfit.toLocaleString()}`}
              change={22.3}
              icon={TrendingUp}
              color="blue"
            />
            <StatCard
              title="Margen Promedio"
              value={`${kpis.averageMargin}%`}
              change={3.2}
              icon={Star}
              color="purple"
            />
            <StatCard
              title="Productos Activos"
              value={kpis.totalProducts}
              change={12.1}
              icon={Package}
              color="orange"
            />
          </div>

          {/* Gráfica de ventas mensuales */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Evolución de Ventas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Area type="monotone" dataKey="ventas" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="beneficio" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <div className="space-y-6">
          {/* Cuenta de Resultados */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Cuenta de Resultados</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">Ingresos por Ventas</span>
                <span className="text-green-600 font-semibold">€{kpis.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">Coste de Productos Vendidos</span>
                <span className="text-red-600 font-semibold">-€{(kpis.totalRevenue - kpis.totalProfit).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="font-medium text-slate-700">Gastos de Vinted (Destacados)</span>
                <span className="text-red-600 font-semibold">-€127</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-slate-50 px-4 rounded-lg">
                <span className="font-bold text-slate-800">Beneficio Neto</span>
                <span className="text-green-600 font-bold text-lg">€{(kpis.totalProfit - 127).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Ratios financieros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3">Ratios de Rentabilidad</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">ROI</span>
                  <span className="font-medium">87.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Margen Bruto</span>
                  <span className="font-medium">67.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Margen Neto</span>
                  <span className="font-medium">32.8%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3">Rotación de Inventario</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Días promedio</span>
                  <span className="font-medium">23 días</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Rotaciones/año</span>
                  <span className="font-medium">15.8x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Velocidad</span>
                  <span className="font-medium text-green-600">Excelente</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3">Cashflow</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Ingresos</span>
                  <span className="font-medium text-green-600">+€{kpis.totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Gastos</span>
                  <span className="font-medium text-red-600">-€{(kpis.totalRevenue - kpis.totalProfit + 127).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-slate-600 font-medium">Neto</span>
                  <span className="font-bold text-green-600">+€{(kpis.totalProfit - 127).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Distribución por categorías */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Distribución por Categorías</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{backgroundColor: item.color}}></div>
                    <span className="text-sm text-slate-600">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Productos Top Rendimiento</h3>
              <div className="space-y-4">
                {[
                  { name: 'Chaqueta Vintage Nike', margin: 89.5, sales: 12 },
                  { name: 'Sudadera Champion', margin: 78.3, sales: 8 },
                  { name: 'Pantalones Levi\'s 501', margin: 67.8, sales: 15 },
                  { name: 'Camiseta Adidas Retro', margin: 64.2, sales: 10 },
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{product.name}</p>
                      <p className="text-sm text-slate-500">{product.sales} unidades vendidas</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{product.margin}%</p>
                      <p className="text-xs text-slate-500">margen</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'brands' && (
        <div className="space-y-6">
          {/* Ranking de marcas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Ranking de Marcas por Ventas</h3>
            <div className="space-y-4">
              {brandData.map((brand, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{brand.name}</p>
                      <p className="text-sm text-slate-500">{brand.productos} productos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-800">€{brand.ventas.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">{brand.porcentaje}% del total</p>
                  </div>
                  <div className="w-24">
                    <div className="bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-slate-800 h-2 rounded-full" 
                        style={{width: `${Math.min(brand.porcentaje * 3, 100)}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};import React, { useState } from 'react';
import { 
  User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff, 
  Search, Plus, Filter, Edit2, Trash2, AlertCircle, CheckCircle, 
  Clock, Calendar, Download, Upload, Save, Shield, Database, 
  Palette, Smartphone, Mail, Globe, HelpCircle, X, AlertTriangle
} from 'lucide-react';
import React, { useState } from 'react';
import { 
  User, Package, TrendingUp, Bell, Settings, LogOut, Eye, EyeOff, 
  Search, Plus, Filter, Edit2, Trash2, AlertCircle, CheckCircle, 
  Clock, Calendar, Download, Upload, Save, Shield, Database, 
  Palette, Smartphone, Mail, Globe, HelpCircle, X, AlertTriangle,
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
    data: { products: ['Camiseta Nike Vintage', 'Pantalones Levi\'s 501', 'Sudadera Champion'] }
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
  },
  {
    id: 3,
    type: 'user_activity',
    title: 'Lorena añadió nuevos productos',
    message: 'Se han añadido 3 productos al inventario',
    timestamp: new Date('2024-01-25T08:45:00'),
    priority: 'low',
    read: false,
    actionRequired: false,
    data: { user: 'Lorena', count: 3 }
  }
];

// COMPONENTE INVENTARIO
const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    const matchesStatus = filterStatus === '' || product.status === filterStatus;
    
    return matchesSearch && matchesBrand && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-700';
      case 'vendido': return 'bg-gray-100 text-gray-700';
      case 'stock-bajo': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'disponible': return <CheckCircle size={14} />;
      case 'vendido': return <Package size={14} />;
      case 'stock-bajo': return <AlertCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

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
      addedBy: 'Admin',
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

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
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
