import { useEffect } from 'preact/hooks';
import { useVentasStore } from '../stores/ventasStore';

export default function SaleList() {
  const { sales, loading, error, fetchSales, addSale } = useVentasStore();

  useEffect(() => {
    fetchSales();
  }, []);

  const handleAddSale = () => {
    const newSale = {
      productId: prompt('ID del producto:'),
      quantity: parseInt(prompt('Cantidad:')),
      total: parseFloat(prompt('Total (PEN):'))
    };
    if (newSale.productId && newSale.quantity && newSale.total) {
      addSale(newSale);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ventas</h1>
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={handleAddSale}
      >
        Registrar Venta
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID Producto</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Total (PEN)</th>
            <th className="border p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td className="border p-2">{sale.productId}</td>
              <td className="border p-2">{sale.quantity}</td>
              <td className="border p-2">{sale.total.toFixed(2)}</td>
              <td className="border p-2">{new Date(sale.saleDate).toLocaleDateString('es-PE')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}