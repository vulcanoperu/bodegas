const SaleModel = require('../../../database/models/sale');

class VentasService {
  static async addSale(sale) {
    try {
      return await SaleModel.create({
        ...sale,
        saleDate: new Date()
      });
    } catch (err) {
      throw new Error(`Error al agregar venta: ${err.message}`);
    }
  }

  static async getSales() {
    try {
      return await SaleModel.findAll();
    } catch (err) {
      throw new Error(`Error al obtener ventas: ${err.message}`);
    }
  }
}

module.exports = VentasService;