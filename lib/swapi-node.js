'use strict';

const request = require('request');
const { deprecate, capitaliseFirstLetter } = require('./util');

const BASE_URL = 'https://swapi.dev/api/';

function sendRequest (options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error || response.statusCode > 399) {
        return reject(new Error(response.statusCode));
      }

      let jsonBody;

      try {
        jsonBody = JSON.parse(body);
      } catch {
        return reject(new Error('JSON parse error'));
      }

      ['nextPage', 'previousPage'].forEach(value => {
        jsonBody[value] = (() => {
          return () => {
            const url = jsonBody[value.includes('next') ? 'next' : 'previous'];
            if (url) {
              return makeRequest(url);
            }

            return Promise.resolve(null);
          };
        })();
      });

      Object.keys(jsonBody).forEach(value => {
        if (typeof jsonBody[value] !== 'function') {
          jsonBody['get' + capitaliseFirstLetter(value)] = (() => {
            return () => {
              if (!Array.isArray(jsonBody[value])) {
                if (jsonBody[value].includes(BASE_URL)) {
                  return makeRequest(jsonBody[value]);
                }

                return Promise.resolve(jsonBody[value]);
              }

              const p = jsonBody[value].map(value_ => {
                if (value_.includes(BASE_URL)) {
                  return makeRequest(value_);
                }

                return Promise.resolve(value_);
              });

              return Promise.all(p);
            };
          })();
        }
      });

      return resolve(jsonBody);
    });
  });
}

function makeRequest (url) {
  const parsedBaseUrl = new URL(BASE_URL);
  const options = {
    url: (url.includes(parsedBaseUrl.hostname)) ? url : BASE_URL + url,
    headers: {
      'User-Agent': 'swapi-node',
      'SWAPI-Node-Version': require('../package.json').version
    }
  };

  return sendRequest(options);
}

function parseOptions (options = {}) {
  if (typeof options === 'object') {
    return options;
  }

  deprecate('Passing just an ID is deprecated.  Use object form { id }');

  return {
    id: options
  };
}

const funcs = ['people', 'starships', 'vehicles', 'films', 'species', 'planets'].map((name => {
  return { name, func: options => {
    const options_ = parseOptions(options);
    return makeRequest(name + (options_.id ? '/' + options_.id : '/'));
  } };
})).reduce((map, object) => {
  map[object.name] = object.func;
  return map;
}, {});

module.exports = {
  ...funcs,
  get (url) {
    return makeRequest(url);
  },
  getPerson (options) {
    deprecate('getPerson is deprecated.  Use people instead');
    const options_ = parseOptions(options);
    return makeRequest('people' + (options_.id ? '/' + options_.id : '/'));
  },
  getStarship (options) {
    deprecate('getStarship is deprecated.  Use starships instead');
    const options_ = parseOptions(options);
    return makeRequest('starships' + (options_.id ? '/' + options_.id : '/'));
  },
  getVehicle (options) {
    deprecate('getVehicle is deprecated.  Use vehicles instead');
    const options_ = parseOptions(options);
    return makeRequest('vehicles' + (options_.id ? '/' + options_.id : '/'));
  },
  getFilm (options) {
    deprecate('getFilm is deprecated.  Use films instead');
    const options_ = parseOptions(options);
    return makeRequest('films' + (options_.id ? '/' + options_.id : '/'));
  },
  getSpecies (options) {
    deprecate('getSpecies is deprecated.  Use species instead');
    const options_ = parseOptions(options);
    return makeRequest('species' + (options_.id ? '/' + options_.id : '/'));
  },
  getPlanets (options) {
    deprecate('getPlanets is deprecated.  Use planets instead');
    const options_ = parseOptions(options);
    return makeRequest('planets' + (options_.id ? '/' + options_.id : '/'));
  }
};
