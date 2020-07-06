'use strict';

const swapi = require('./lib/swapi-node');

swapi.getPerson(4).then(result => {
  return result.getStarships();
}).then(result => {
  return result[0].getFilms();
}).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});

