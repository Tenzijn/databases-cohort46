import db from '../util/world_dbConnection.js';

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function getCountryWithPopulationGreaterThan8Million() {
  return executeQuery('SELECT name FROM country WHERE population > 8000000');
}

function getCountryWithLandInName() {
  return executeQuery('SELECT name FROM country WHERE name LIKE "%land%"');
}

function getCitiesWithPopulationBetween500kAnd1M() {
  return executeQuery(
    'SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000'
  );
}

function getCountriesInEurope() {
  return executeQuery('SELECT name FROM country WHERE continent = "Europe"');
}

function getCountriesBySurfaceArea() {
  return executeQuery('SELECT name FROM country ORDER BY surfacearea DESC');
}

function getCitiesInNetherlands() {
  return executeQuery('SELECT name FROM city WHERE countrycode = "NLD"');
}

function getPopulationOfRotterdam() {
  return executeQuery('SELECT population FROM city WHERE name = "Rotterdam"');
}

function getTop10CountriesBySurfaceArea() {
  return executeQuery(
    'SELECT name FROM country ORDER BY surfacearea DESC LIMIT 10'
  );
}

function getTop10MostPopulatedCities() {
  return executeQuery(
    'SELECT name FROM city ORDER BY population DESC LIMIT 10'
  );
}

function getPopulationOfTheWorld() {
  return executeQuery('SELECT SUM(population) FROM country');
}

export {
  getCountryWithPopulationGreaterThan8Million,
  getCountryWithLandInName,
  getCitiesWithPopulationBetween500kAnd1M,
  getCountriesInEurope,
  getCountriesBySurfaceArea,
  getCitiesInNetherlands,
  getPopulationOfRotterdam,
  getTop10CountriesBySurfaceArea,
  getTop10MostPopulatedCities,
  getPopulationOfTheWorld,
};
