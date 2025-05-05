const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor(uri = 'mongodb://localhost:27017', dbName = 'bodega_erp') {
    this.uri = uri;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    if (!this.client) {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    }
    return this.db;
  }

  async getCollection(collectionName) {
    const db = await this.connect();
    return db.collection(collectionName);
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

module.exports = new MongoAdapter();