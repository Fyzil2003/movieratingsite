// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://fyzil:fyzil7358@cluster0.pd4srlz.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
    return client.db('movieapp');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;



