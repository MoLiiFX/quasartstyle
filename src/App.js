import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      setUser({ name: username });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quasart Style</h1>
          
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Introduce tu usuario"
            />
          </div>
          
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Quasart Style Dashboard</h1>
          <button
            onClick={() => setUser(null)}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold">Total Productos</h2>
            <p className="text-3xl text-blue-600">156</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold">Ventas del Mes</h2>
            <p className="text-3xl text-green-600">€2,847</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">¡Dashboard funcionando!</h2>
          <p>Hola {user.name}, bienvenido a Quasart Style.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
