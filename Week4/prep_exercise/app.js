import { MongoClient } from 'mongodb';
import { recipe } from './data/data.js';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function main() {
  await client.connect();
  console.log('Connected to MongoDB');
  const database = client.db('recipe');
  const deletedDatabase = await database.dropDatabase();
  console.log('Deleted database:', deletedDatabase);

  const collection = database.collection('dishes');

  await insertDishes(collection);
}

main()
  .catch(console.error)
  .finally(async () => {
    await client.close();
    console.log('Disconnected from MongoDB');
  });

async function insertDishes(collection) {
  const result = await collection.insertMany([...recipe]);
  console.log(
    `${result.insertedCount} new dishes created with the following id(s):`
  );
  console.log(result.insertedIds);
}
