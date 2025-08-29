# 🚀 Quasart Style - Dashboard de Gestión

![Quasart Style Dashboard](https://via.placeholder.com/1200x600/1e293b/ffffff?text=Quasart+Style+Dashboard)

**Panel de gestión moderno y minimalista para Quasart Style** - Tu negocio de compra-venta de ropa vintage en Vinted.

## ✨ Características

### 🎯 **Funcionalidades Principales**
- **Dashboard Completo** - KPIs, métricas y actividad en tiempo real
- **Gestión de Inventario** - CRUD completo con filtros y búsqueda avanzada
- **Análisis Financiero** - Gráficas, ratios y cuenta de resultados
- **Centro de Notificaciones** - Alertas inteligentes y seguimiento de actividad
- **Configuración Avanzada** - Personalización completa del sistema

### 🎨 **Diseño y UX**
- **Interfaz Moderna** - Diseño minimalista con Tailwind CSS
- **Responsive Design** - Optimizado para móvil, tablet y escritorio
- **Animaciones Suaves** - Transiciones profesionales
- **Paleta Coherente** - Colores profesionales en tonos slate/gris
- **Iconografía** - Lucide React icons para mejor experiencia visual

### 📊 **Métricas y Análisis**
- **KPIs en Tiempo Real** - Total productos, ventas, márgenes, stock
- **Gráficas Interactivas** - Recharts para visualización de datos
- **Análisis de Rentabilidad** - Seguimiento de márgenes por producto/marca
- **Reportes Automatizados** - Exportación de datos en JSON
- **Análisis de Inventario** - Rotación, stock bajo, productos top

### 🔧 **Gestión Operativa**
- **Inventario Completo** - Productos, marcas, tallas, estados
- **Filtros Avanzados** - Por marca, estado, género, búsqueda de texto
- **Seguimiento de Márgenes** - Precio compra vs venta automático
- **Estados Inteligentes** - Disponible, vendido, stock bajo
- **Historial de Actividad** - Registro completo de cambios

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 18** - Framework principal
- **Tailwind CSS 3** - Estilos y diseño responsive
- **Lucide React** - Iconografía moderna
- **Recharts** - Gráficas y visualización de datos

### **Desarrollo y Build**
- **Create React App** - Configuración base optimizada
- **PostCSS** - Procesamiento CSS
- **Autoprefixer** - Compatibilidad cross-browser

### **Deploy y Hosting**
- **Netlify** - Hosting optimizado con CDN global
- **GitHub** - Control de versiones y CI/CD automático
- **PWA Ready** - Preparado para Progressive Web App

## 📦 Instalación y Configuración

### **Requisitos Previos**
```bash
Node.js >= 16.x
npm >= 8.x
Git
```

### **1. Clonar el Repositorio**
```bash
git clone https://github.com/tu-usuario/quasart-style-dashboard.git
cd quasart-style-dashboard
```

### **2. Instalar Dependencias**
```bash
npm install
```

### **3. Configurar Variables de Entorno**
Crea un archivo `.env.local` en la raíz:
```env
REACT_APP_VERSION=2.1.0
REACT_APP_NAME="Quasart Style Dashboard"
REACT_APP_DESCRIPTION="Panel de gestión para negocio de ropa vintage"
```

### **4. Iniciar Desarrollo**
```bash
npm start
```
La aplicación estará disponible en `http://localhost:3000`

## 🚀 Despliegue en Netlify

### **Método 1: Conexión Automática (Recomendado)**

1. **Push a GitHub:**
```bash
git add .
git commit -m "Initial commit - Quasart Style Dashboard"
git push origin main
```

2. **Conectar con Netlify:**
   - Ve a [Netlify](https://netlify.com)
   - "New site from Git" → Selecciona GitHub
   - Escolhe tu repositorio `quasart-style-dashboard`
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - Deploy!

3. **Configurar Dominio Personalizado (Opcional):**
   - En Netlify: Site settings → Domain management
   - Add custom domain: `quasartstyle.netlify.app`

### **Método 2: Deploy Manual**
```bash
# Construir la aplicación
npm run build

# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

## 👥 Usuarios de Prueba

Para probar la aplicación, usa cualquiera de estos usuarios:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| `admin` | `cualquiera` | Fundador |
| `lorena` | `cualquiera` | Fundadora |

## 📱 Estructura del Proyecto

```
quasart-style-dashboard/
├── public/
│   ├── index.html          # HTML principal
│   ├── manifest.json       # PWA config
│   └── favicon.ico         # Favicon
├── src/
│   ├── components/         # Componentes React
│   │   ├── Inventory.js    # Gestión inventario
│   │   ├── Metrics.js      # Análisis y métricas
│   │   ├── Notifications.js # Centro notificaciones
│   │   └── Settings.js     # Configuración
│   ├── App.js             # Componente principal
│   ├── index.js           # Punto de entrada
│   └── index.css          # Estilos principales
├── netlify.toml           # Configuración Netlify
├── tailwind.config.js     # Configuración Tailwind
├── package.json           # Dependencias y scripts
└── README.md             # Esta documentación
```

## 🎨 Personalización

### **Colores y Branding**
Edita `tailwind.config.js` para personalizar la paleta de colores:

```javascript
theme: {
  extend: {
    colors: {
      quasart: {
        50: '#f8fafc',   // Más claro
        // ... hasta
        900: '#0f172a',  // Más oscuro
      }
    }
  }
}
```

### **Logo y Branding**
- Reemplaza el logo "QS" en `src/App.js`
- Actualiza favicon en `public/favicon.ico`
- Modifica título en `public/index.html`

### **Datos de Ejemplo**
Los datos están hardcodeados para demo. En producción:
- Conecta con tu API/base de datos
- Implementa autenticación real
- Integra con sistemas de inventario existentes

## 📊 Funcionalidades Detalladas

### **Dashboard Principal**
- **KPIs Visuales:** Productos totales, ventas mensuales, stock bajo, márgenes
- **Actividad Reciente:** Timeline de acciones realizadas por usuarios
- **Navegación Intuitiva:** Sidebar con acceso rápido a todas las secciones

### **Gestión de Inventario**
- **CRUD Completo:** Crear, leer, actualizar, eliminar productos
- **Filtros Avanzados:** Por marca, estado, género, búsqueda de texto
- **Cálculo Automático:** Márgenes, estados basados en cantidad
- **Vista de Tabla:** Información completa con acciones rápidas

### **Análisis de Métricas**
- **Múltiples Vistas:** Overview, financiero, productos, marcas
- **Gráficas Interactivas:** Líneas, barras, áreas, pie charts
- **Exportación:** Descarga de reportes en formato JSON
- **KPIs Financieros:** ROI, márgenes, ratios de rentabilidad

### **Centro de Notificaciones**
- **Alertas Inteligentes:** Stock bajo, ventas, cambios importantes
- **Filtros y Búsqueda:** Por tipo, prioridad, estado de lectura
- **Acciones Rápidas:** Marcar como leída, eliminar, acciones contextuales
- **Diferentes Tipos:** Stock, ventas, actividad usuario, hitos, sistema

### **Configuración Completa**
- **Perfil de Usuario:** Información personal, cambio de contraseña
- **Notificaciones:** Preferencias de alertas por email, push, tipos
- **Seguridad:** 2FA, alertas de login, timeout de sesión
- **Sistema:** Moneda, idioma, zona horaria, apariencia
- **Backup:** Exportar/importar configuración, historial

## 🔒 Seguridad

### **Características de Seguridad Implementadas**
- Headers de seguridad en Netlify
- Protección XSS y CSRF
- Sanitización de inputs
- Validación de formularios
- Session timeout configurable

### **Para Producción (Próximos pasos)**
- Implementar autenticación JWT
- Conexión HTTPS obligatoria
- Rate limiting en APIs
- Logs de auditoría
- Backup automático de datos

## 🚀 Rendimiento

### **Optimizaciones Incluidas**
- **Code Splitting** automático con React
- **Lazy Loading** de componentes
- **Compresión** automática en Netlify
- **CDN Global** para assets estáticos
- **Caché Inteligente** para recursos

### **Métricas Objetivo**
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3s

## 🤝 Contribuir

### **Cómo Contribuir**
1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

### **Próximas Funcionalidades**
- [ ] Integración con API de Vinted
- [ ] Notificaciones push reales
- [ ] Modo offline con PWA
- [ ] Dashboard para móvil nativo
- [ ] Integración con herramientas de contabilidad
- [ ] Multi-idioma completo
- [ ] Tema oscuro
- [ ] Análisis predictivo con IA

## 📞 Soporte

### **Documentación**
- [React Docs](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify Docs](https://docs.netlify.com/)
- [Recharts](https://recharts.org/)

### **Contacto**
- **Email:** soporte@quasartstyle.com
- **Web:** [quasartstyle.com](https://quasartstyle.com)
- **GitHub Issues:** Para reportar bugs o sugerir mejoras

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para Quasart Style**

*Panel de gestión moderno para hacer crecer tu negocio de ropa vintage*
