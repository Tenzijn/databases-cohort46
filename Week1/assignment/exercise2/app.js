import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const executeQuery = async (query) => {
  try {
    const result = await db.query(query);
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
};

function getCountryWithPopulationGreaterThan8Million() {
  executeQuery('SELECT name FROM country WHERE population > 8000000');
}

function getCountryWithLandInName() {
  executeQuery('SELECT name FROM country WHERE name LIKE "%land%"');
}

function getCitiesWithPopulationBetween500kAnd1M() {
  executeQuery(
    'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000'
  );
}

function getCountriesInEurope() {
  executeQuery('SELECT name FROM country WHERE continent = "Europe"');
}

function getCountriesBySurfaceArea() {
  executeQuery('SELECT name FROM country ORDER BY surfacearea DESC');
}

function getCitiesInNetherlands() {
  executeQuery('SELECT name FROM city WHERE countrycode = "NLD"');
}

function getPopulationOfRotterdam() {
  executeQuery('SELECT population FROM city WHERE name = "Rotterdam"');
}

function getTop10CountriesBySurfaceArea() {
  executeQuery('SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10');
}

function getTop10MostPopulatedCities() {
  executeQuery('SELECT name FROM city ORDER BY population DESC LIMIT 10');
}

function getPopulationOfTheWorld() {
  executeQuery('SELECT SUM(population) FROM country');
}

try {
  await getCountryWithPopulationGreaterThan8Million();
  await getCountryWithLandInName();
  await getCitiesWithPopulationBetween500kAnd1M();
  await getCountriesInEurope();
  await getCountriesBySurfaceArea();
  await getCitiesInNetherlands();
} catch (err) {
  console.log(err);
}
