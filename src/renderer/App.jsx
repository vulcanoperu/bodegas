import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useStore } from './core/hooks/useStore';
import Login from './modules/Login';
import Home from './modules/Home';

export default function App() {
  const { state, setState } = useStore();

  useEffect(() => {
    window.electronAPI.connectToDB()
      .then(result => {
        if (result.success) {
          setState({ dbConnected: true });
        } else {
          setState({ dbError: result.error });
        }
      })
      .catch(err => setState({ dbError: err.message }));
  }, []);

  if (!state.isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Bodega ERP</h1>
        {state.dbConnected ? (
          <p className="text-green-600">Conectado a MongoDB</p>
        ) : (
          <p className="text-red-600">
            {state.dbError || 'Conectando a la base de datos...'}
          </p>
        )}
      </header>
      <Home />
    </div>
  );
}