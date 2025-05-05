import { useEffect } from 'preact/hooks';
import { useInventarioStore } from '../stores/inventarioStore';

export default function ProductList() {
  const { products, loading, error, fetchProducts, addProduct } = useInventarioStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      name: prompt('Nombre del producto:'),
      price: parseFloat(prompt('Precio (PEN):')),
      stock: parseInt(prompt('Stock:')),
    };
    if (newProduct.name && newProduct.price && newProduct.stock) {
      addProduct(newProduct);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario</h1>
      <button
        className="bg-primary text-white px-4 py-2 rounded mb-4"
        onClick={handleAddProduct}
      >
        Agregar Producto
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio (PEN)</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.price.toFixed(2)}</td>
              <td className="border p-2">{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}