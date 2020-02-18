'use strict';

const request = require('request');
const util = require('./util');

const BASE_URL = 'https://swapi.co/api/';

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
          jsonBody['get' + util.capitaliseFirstLetter(value)] = (() => {
            return () => {
              if (!Array.isArray(jsonBody[value])) {
                if (jsonBody[value].includes(BASE_URL)) {
                  return makeRequest(jsonBody[value]);
                }

                return Promise.resolve(jsonBody[value]);
              }

              const p = jsonBody[value].map(val => {
                if (val.includes(BASE_URL)) {
                  return makeRequest(val);
                }

                return Promise.resolve(val);
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
  const options = {
    url: (url.includes(BASE_URL)) ? url : BASE_URL + url,
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

  return {
    id: options
  };
}

module.exports = {
  get (url) {
    return makeRequest(url);
  },
  getPerson (options) {
    const opts = parseOptions(options);
    return makeRequest('people' + (opts.id ? '/' + opts.id : '/'));
  },
  getStarship (options) {
    const opts = parseOptions(options);
    return makeRequest('starships' + (opts.id ? '/' + opts.id : '/'));
  },
  getVehicle (options) {
    const opts = parseOptions(options);
    return makeRequest('vehicles' + (opts.id ? '/' + opts.id : '/'));
  },
  getFilm (options) {
    const opts = parseOptions(options);
    return makeRequest('films' + (opts.id ? '/' + opts.id : '/'));
  },
  getSpecies (options) {
    const opts = parseOptions(options);
    return makeRequest('species' + (opts.id ? '/' + opts.id : '/'));
  },
  getPlanets (options) {
    const opts = parseOptions(options);
    return makeRequest('planets' + (opts.id ? '/' + opts.id : '/'));
  }
};
