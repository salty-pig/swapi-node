'use strict';

const fetch = require('node-fetch');
const util = require('./util');

const PROTOCOL = 'https';
const HOST = 'swapi.dev';
const BASE_URL = `${PROTOCOL}://${HOST}/api/`;
const BASE_URL_REGEX = new RegExp(`http[s]?://${HOST}/api`);

function sendRequest (options) {
  let {url, ...otherOptions} = options;
  return fetch(url, otherOptions)
    .then(response => response.json())
    .then(jsonBody => {
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
                if (!!jsonBody[value].match(BASE_URL_REGEX)) {
                  return makeRequest(jsonBody[value]);
                }

                return Promise.resolve(jsonBody[value]);
              }

              const p = jsonBody[value].map(value_ => {
                if (!!value_.match(BASE_URL_REGEX)) {
                  return makeRequest(value_);
                }

                return Promise.resolve(value_);
              });

              return Promise.all(p);
            };
          })();
        }
      });

      return jsonBody;
    });
}

function makeRequest (url) {
  const options = {
    url: (!!url.match(BASE_URL_REGEX)) ? url : `${BASE_URL}${url}`,
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
    const options_ = parseOptions(options);
    return makeRequest('people' + (options_.id ? '/' + options_.id : '/'));
  },
  getStarship (options) {
    const options_ = parseOptions(options);
    return makeRequest('starships' + (options_.id ? '/' + options_.id : '/'));
  },
  getVehicle (options) {
    const options_ = parseOptions(options);
    return makeRequest('vehicles' + (options_.id ? '/' + options_.id : '/'));
  },
  getFilm (options) {
    const options_ = parseOptions(options);
    return makeRequest('films' + (options_.id ? '/' + options_.id : '/'));
  },
  getSpecies (options) {
    const options_ = parseOptions(options);
    return makeRequest('species' + (options_.id ? '/' + options_.id : '/'));
  },
  getPlanets (options) {
    const options_ = parseOptions(options);
    return makeRequest('planets' + (options_.id ? '/' + options_.id : '/'));
  }
};
