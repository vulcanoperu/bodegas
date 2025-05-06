
import { create } from 'zustand';

const useStore = create((set) => ({
  state: {
    dbConnected: false,
    dbError: null
  },
  setState: (newState) => set((prev) => ({
    state: { ...prev.state, ...newState }
  }))
}));

export { useStore };