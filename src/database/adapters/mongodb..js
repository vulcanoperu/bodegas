const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017/erp';
let client;

async function initializeDB() {
  if (client) return client;

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    await client.connect();
    console.log('Conectado a MongoDB');
    return client;
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    throw err;
  }
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = { initializeDB, closeDB };