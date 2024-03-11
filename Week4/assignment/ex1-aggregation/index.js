import { MongoClient } from 'mongodb';
import { configDotenv } from 'dotenv';

configDotenv();

const uri = process.env.MONGODB_URI;

async function main() {
  const client = new MongoClient(uri);
  const database = client.db('databaseWeek4');
  const collection = database.collection('populationPryamid');
  const Country = 'Netherlands';

  try {
    await client.connect();
    console.log('Connected correctly to server');

    await getPopulationByYear(Country, collection);
    await getPopulationByContinent(2020, '100+', collection);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

main();

/* Question 1 

Solution: 
1. I have manually created database and collection using MongoDB Atlas.
2. I have uploaded the csv file to the collection using in-app feature of MongoDB Atlas.
  */

/* Question 2
Write a function that will return the array of the total population (M + F over all age groups) for a given Country per year. The result should look something like this, these are the values for Netherlands:
*/

async function getPopulationByYear(Country, collection) {
  console.log('country', Country);
  try {
    const results = await collection.aggregate(
      [
        { $match: { Country: Country } },
        {
          $group: {
            _id: '$Year',
            totalPopulation: {
              $sum: { $add: ['$M', '$F'] },
            },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            Year: '$_id',
            totalPopulation: 1,
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );
    console.log(`Population By Year of ${Country} `, await results.toArray());
  } catch (err) {
    console.log(err.stack);
  }
}

/* Question 3
Write a function that will return all the information of each continent for a given Year and Age field but add a new field TotalPopulation that will be the addition of M and F. For example, if I would give 2020 for the Year and 100+ for the Age it should return something like this:
*/

async function getPopulationByContinent(Year, Age, collection) {
  console.log('Year', Year);
  console.log('Age', Age);
  try {
    const results = await collection.aggregate(
      [
        {
          $match: {
            $and: [
              { Age: Age },
              { Year: Year },
              {
                Country: {
                  $in: [
                    'AFRICA',
                    'ASIA',
                    'EUROPE',
                    'LATIN AMERICA AND THE CARIBBEAN',
                    'NORTHERN AMERICA',
                    'OCEANIA',
                  ],
                },
              },
            ],
          },
        },
        {
          $addFields: {
            _id: null,
            totalPopulation: {
              $sum: { $add: ['$M', '$F'] },
            },
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true }
    );

    console.log(
      `Population By Continent of ${Year} and ${Age} `,
      await results.toArray()
    );
  } catch (err) {
    console.log(err.stack);
  }
}

/* Disclaimer:
1. I have used aggregate generator in Atlas to create the aggregation pipeline.
*/
