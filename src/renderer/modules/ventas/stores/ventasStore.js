import { create } from 'zustand';
import VentasService from '../services/ventasService';

export const useVentasStore = create((set) => ({
  sales: [],
  loading: false,
  error: null,

  fetchSales: async () => {
    set({ loading: true, error: null });
    try {
      const sales = await VentasService.getSales();
      set({ sales, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addSale: async (sale) => {
    set({ loading: true, error: null });
    try {
      await VentasService.addSale(sale);
      set((state) => ({
        sales: [...state.sales, { ...sale, _id: Date.now().toString() }],
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
}));