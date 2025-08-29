import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Star, Calendar, Download, Filter } from 'lucide-react';

// Datos de ejemplo para las gráficas
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

const weeklyData = [
  { day: 'Lun', ventas: 120, visitas: 45 },
  { day: 'Mar', ventas: 180, visitas: 67 },
  { day: 'Mié', ventas: 240, visitas: 89 },
  { day: 'Jue', ventas: 160, visitas: 52 },
  { day: 'Vie', ventas: 300, visitas: 112 },
  { day: 'Sáb', ventas: 280, visitas: 98 },
  { day: 'Dom', ventas: 200, visitas: 76 },
];

const Metrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');

  // KPIs principales
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

  // Generar reporte
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
          {change > 0 ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />}
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

          {/* Gráficas de barras semanales */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Rendimiento Semanal</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
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

          {/* Gráfica de beneficios */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Análisis de Rentabilidad</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
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
                <Line type="monotone" dataKey="ventas" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="compras" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444' }} />
                <Line type="monotone" dataKey="beneficio" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
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

          {/* Análisis de stock */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Análisis de Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{kpis.totalProducts}</div>
                <div className="text-slate-600">Total Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{kpis.soldThisMonth}</div>
                <div className="text-slate-600">Vendidos este mes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">{kpis.pendingProducts}</div>
                <div className="text-slate-600">En stock</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div className="text-slate-600">Stock bajo</div>
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
                        style={{width: `${brand.porcentaje * 3}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Análisis de rentabilidad por marca */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Rentabilidad por Marca</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandData.slice(0, 5)}>
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
                <Bar dataKey="ventas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metrics;
