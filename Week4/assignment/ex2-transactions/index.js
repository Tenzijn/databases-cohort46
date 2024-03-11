import { MongoClient } from 'mongodb';
import { configDotenv } from 'dotenv';

configDotenv();

const uri = process.env.MONGODB_URI;

async function main() {
  const client = new MongoClient(uri);
  const database = client.db('databaseWeek4');
  const collection = database.collection('populationPryamid');

  try {
    await client.connect();
    console.log('Connected correctly to server');
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

main();

/* Note:
 I did not understood the concept of transactions in MongoDB. so I was not able to complete the assignment.
 I will try to understand the concept of transactions in MongoDB and complete the assignment in coming days.
  */
