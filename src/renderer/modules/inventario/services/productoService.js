// productoService.js
import { BodegaError } from "../../core/errors";

export async function saveProduct(productData) {
  try {
    // Validación con Zod (opcional)
    const response = await window.electronAPI.saveProduct(productData);
    if (!response.success) throw new BodegaError(response.error);
    return response.data;
  } catch (error) {
    error.log(); // Log centralizado
    throw error; // Re-lanzar para UI
  }
}