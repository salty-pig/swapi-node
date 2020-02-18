'use strict';

const swapi = require('swapi-node');

swapi.getPerson().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});

