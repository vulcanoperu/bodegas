const mongoAdapter = require('../adapters/mongoAdapter');

class ProductModel {
  static collectionName = 'products';

  static async create(product) {
    const collection = await mongoAdapter.getCollection(this.collectionName);
    return collection.insertOne(product);
  }

  static async findAll() {
    const collection = await mongoAdapter.getCollection(this.collectionName);
    return collection.find({}).toArray();
  }

  static async update(id, product) {
    const collection = await mongoAdapter.getCollection(this.collectionName);
    return collection.updateOne({ _id: id }, { $set: product });
  }

  static async delete(id) {
    const collection = await mongoAdapter.getCollection(this.collectionName);
    return collection.deleteOne({ _id: id });
  }
}

module.exports = ProductModel;