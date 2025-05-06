import { h } from 'preact';
import { useState } from 'preact/hooks';
import { useStore } from '../core/hooks/useStore';

export default function Login() {
  const { setState } = useStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [secretAnswer, setSecretAnswer] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setState({ isAuthenticated: true });
      setMessage('Login exitoso');
    } else {
      setMessage('Usuario o contraseña incorrectos');
    }
  };

  const handleRecoverPassword = () => {
    if (secretAnswer === 'respuesta') {
      setMessage('Contraseña recuperada: nueva_password123');
    } else {
      setMessage('Respuesta incorrecta');
    }
  };

  if (showRecovery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Recuperar Contraseña</h2>
          <p className="mb-4">¿Cuál era el nombre de tu primera mascota?</p>
          <input
            type="text"
            value={secretAnswer}
            onInput={e => setSecretAnswer(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Respuesta secreta"
          />
          <button onClick={handleRecoverPassword} className="btn-bodega w-full mb-2">
            Recuperar
          </button>
          <button onClick={() => setShowRecovery(false)} className="btn-bodega w-full">
            Volver
          </button>
          {message && <p className="mt-2 text-center text-red-500">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-blue-500">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Iniciar Sesión</h2>
        <input
          type="text"
          value={username}
          onInput={e => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onInput={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Contraseña"
        />
        <button onClick={handleLogin} className="btn-bodega w-full mb-2">
          Iniciar Sesión
        </button>
        <button onClick={() => setShowRecovery(true)} className="text-bodega underline">
          ¿Olvidaste tu contraseña?
        </button>
        {message && <p className="mt-2 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}