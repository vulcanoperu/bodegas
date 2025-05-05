const ProductModel = require('../../../database/models/product');

class InventarioService {
  static async addProduct(product) {
    return ProductModel.create({
      ...product,
      createdAt: new Date()
    });
  }

  static async getProducts() {
    return ProductModel.findAll();
  }
}

module.exports = InventarioService;