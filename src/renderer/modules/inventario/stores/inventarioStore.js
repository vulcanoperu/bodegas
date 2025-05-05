import { create } from 'zustand';
import InventarioService from '../services/inventarioService';

export const useInventarioStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await InventarioService.getProducts();
      set({ products, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      await InventarioService.addProduct(product);
      set((state) => ({
        products: [...state.products, { ...product, _id: Date.now().toString() }],
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));