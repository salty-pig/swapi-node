'use strict';

import request from 'request';
import { capitaliseFirstLetter } from './util';

const BASE_URL = 'https://swapi.co/api/';

function sendRequest(options: any) {
  return new Promise((resolve, reject) => {
    request(options, (error: any, response: request.Response, body: any) => {
      if (error || response.statusCode > 399) {
        return reject({ error: response.statusCode });
      }

      let jsonBody: any;

      try {
        jsonBody = JSON.parse(body);
      } catch (e) {
        return reject({ error: 'JSON parse error' });
      }

      ['nextPage', 'previousPage'].forEach((value) => {
        jsonBody[value] = (() => {
          return () => {
            const url = jsonBody[(value.indexOf('next') > -1) ? 'next' : 'previous'];
            if (url) {
              return makeRequest(url);
            }

            return Promise.resolve(null);
          };
        })();
      });

      Object.keys(jsonBody).forEach((value) => {
        if (typeof jsonBody[value] !== 'function') {
          jsonBody['get' + capitaliseFirstLetter(value)] = (() => {
            return () => {
              if (!Array.isArray(jsonBody[value])) {
                if (jsonBody[value].indexOf(BASE_URL) > -1) {
                  return makeRequest(jsonBody[value]);
                }

                return Promise.resolve(jsonBody[value]);
              }

              const p = jsonBody[value].map((val: string) => {
                if (val.indexOf(BASE_URL) > -1) {
                  return makeRequest(val);
                }
                return Promise.resolve(val);
              });

              return Promise.all(p).then((v) => {
                return v;
              });
            };
          })();
        }
      });

      return resolve(jsonBody);
    });
  });
}

function makeRequest(url: string): Promise<any> {
  const options = {
    headers: {
      'SWAPI-Node-Version': require('../package.json').version,
      'User-Agent': 'swapi-node'
    },
    url: (url.indexOf(BASE_URL) > -1) ? url : BASE_URL + url
  };

  return sendRequest(options);
}

function parseOptions(options: number | object) {
  const opts = options || {};

  if (typeof opts === 'object') {
    return opts;
  } else {
    return {
      id: opts
    };
  }
}

export function get(url: string): Promise<any> {
  return makeRequest(url);
}

export function getPerson(options: number | object) {
  const opts: any = parseOptions(options);
  return makeRequest('people' + (opts.id ? '/' + opts.id : '/'));
}

export function getStarship(options: number | object) {
  const opts: any = parseOptions(options);
  return makeRequest('starships' + (opts.id ? '/' + opts.id : '/'));
}

export function getVehicle(options: number | object) {
  const opts: any = parseOptions(options);
  return makeRequest('vehicles' + (opts.id ? '/' + opts.id : '/'));
}
export function getFilm(options: number | object) {
  const opts: any = parseOptions(options);
  return makeRequest('films' + (opts.id ? '/' + opts.id : '/'));
}

export function getSpecies(options: number | object) {
  const opts: any = parseOptions(options);
  return makeRequest('species' + (opts.id ? '/' + opts.id : '/'));
}
