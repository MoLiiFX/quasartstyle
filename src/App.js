import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">Quasart Style</h1>
        <p className="text-center text-gray-600">Dashboard funcionando correctamente</p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="font-bold">Productos</h2>
            <p className="text-2xl">156</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <h2 className="font-bold">Ventas</h2>
            <p className="text-2xl">€2,847</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
