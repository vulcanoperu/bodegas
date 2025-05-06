import { h } from 'preact';
import { useStore } from '../core/hooks/useStore';

export default function Home() {
  const { setState } = useStore();

  const handleLogout = () => {
    setState({ isAuthenticated: false });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Menú Principal (Alta Jerarquía) */}
      <nav className="bg-bodega text-white p-4">
        <ul className="flex space-x-6">
          <li><a href="#inventario" className="hover:underline">Inventario</a></li>
          <li><a href="#ventas" className="hover:underline">Ventas</a></li>
          <li><a href="#proveedores" className="hover:underline">Proveedores</a></li>
          <li><a href="#reportes" className="hover:underline">Reportes</a></li>
        </ul>
      </nav>

      {/* Submenú (Baja Jerarquía) */}
      <nav className="bg-gray-200 p-2">
        <ul className="flex space-x-4">
          <li><a href="#inicio" className="hover:underline">Inicio</a></li>
          <li><a href="#configuracion" className="hover:underline">Configuración</a></li>
          <li><a href="#" onClick={handleLogout} className="hover:underline">Cerrar Sesión</a></li>
        </ul>
      </nav>

      {/* Contenido Principal */}
      <main className="p-4">
        <h1 className="text-3xl font-bold">Bienvenido a Bodega ERP</h1>
        <p>Selecciona una opción del menú para comenzar.</p>
      </main>
    </div>
  );
}