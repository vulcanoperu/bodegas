import { useElectronSafeDOM } from '@/core/hooks/useElectronSafeDOM';
import ProductList from '@/modules/inventario/components/ProductList';
import SaleList from '@/modules/ventas/components/SaleList';
import '@/assets/styles.css';

export default function App() {
  const domReady = useElectronSafeDOM();

  if (!domReady) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Bodega ERP</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ProductList />
          </div>
          <div>
            <SaleList />
          </div>
        </div>
      </div>
    </div>
  );
}