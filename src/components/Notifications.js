import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  User, 
  Calendar, 
  CheckCircle, 
  X, 
  Filter,
  Search,
  Clock,
  AlertCircle
} from 'lucide-react';

// Datos de ejemplo para las notificaciones
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
  },
  {
    id: 4,
    type: 'milestone',
    title: '¡Meta alcanzada!',
    message: 'Has superado los €2,500 en ventas este mes',
    timestamp: new Date('2024-01-24T16:20:00'),
    priority: 'high',
    read: true,
    actionRequired: false,
    data: { milestone: 'monthly_sales', target: 2500, achieved: 2847 }
  },
  {
    id: 5,
    type: 'price_change',
    title: 'Admin modificó precios',
    message: 'Se actualizaron los precios de 2 productos',
    timestamp: new Date('2024-01-24T14:10:00'),
    priority: 'medium',
    read: true,
    actionRequired: false,
    data: { user: 'Admin', products: 2 }
  },
  {
    id: 6,
    type: 'system',
    title: 'Backup automático completado',
    message: 'Respaldo de datos realizado correctamente',
    timestamp: new Date('2024-01-24T12:00:00'),
    priority: 'low',
    read: true,
    actionRequired: false,
    data: { backup_size: '2.3 MB' }
  },
  {
    id: 7,
    type: 'stock_low',
    title: 'Producto agotado',
    message: 'Vestido Zara Vintage se ha agotado completamente',
    timestamp: new Date('2024-01-23T18:30:00'),
    priority: 'high',
    read: true,
    actionRequired: true,
    data: { product: 'Vestido Zara Vintage', lastSale: '2024-01-23' }
  },
  {
    id: 8,
    type: 'user_activity',
    title: 'Lorena editó inventario',
    message: 'Se actualizaron las cantidades de 4 productos',
    timestamp: new Date('2024-01-23T15:45:00'),
    priority: 'low',
    read: true,
    actionRequired: false,
    data: { user: 'Lorena', count: 4 }
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || notification.type === filter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRead = !showUnreadOnly || !notification.read;
    
    return matchesFilter && matchesSearch && matchesRead;
  });

  // Contar notificaciones no leídas
  const unreadCount = notifications.filter(n => !n.read).length;

  // Marcar como leída
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Marcar todas como leídas
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Eliminar notificación
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  // Obtener icono según tipo
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

  // Obtener color de prioridad
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  // Formatear tiempo
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

  // Obtener estadísticas
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
          {/* Búsqueda */}
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

          {/* Filtros */}
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

                      {notification.type === 'milestone' && notification.data && (
                        <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm text-purple-800">
                            <p><span className="font-medium">Objetivo:</span> €{notification.data.target}</p>
                            <p><span className="font-medium">Logrado:</span> €{notification.data.achieved}</p>
                            <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{width: `${Math.min((notification.data.achieved / notification.data.target) * 100, 100)}%`}}
                              ></div>
                            </div>
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

      {/* Paginación o carga más (si tuvieras muchas notificaciones) */}
      {filteredNotifications.length > 10 && (
        <div className="mt-6 text-center">
          <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            Cargar más notificaciones
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
