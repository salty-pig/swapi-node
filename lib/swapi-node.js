var request = require('request'),
    util = require('./util');

const BASE_URL = 'http://swapi.co/api/';

function sendRequest(options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error || response.statusCode > 399) {
                return reject({error: response.statusCode});
            }

            var jsonBody;

            try {
                jsonBody = JSON.parse(body);
            } catch (e) {
                return reject({error: 'JSON parse error'});
            }

            ['nextPage', 'previousPage'].forEach((value) => {
                jsonBody[value] = (() => {
                    return () => {
                        var url = jsonBody[(value.indexOf('next') > -1) ? 'next' : 'previous'];
                        if (url) {
                            return makeRequest(url);
                        }

                        return Promise.resolve(null);
                    };
                })();
            });

            Object.keys(jsonBody).forEach((value) => {
                if (typeof jsonBody[value] !== 'function') {
                    jsonBody['get' + util.capitaliseFirstLetter(value)] = (() => {
                        return () => {
                            if (!Array.isArray(jsonBody[value])) {
                                if (jsonBody[value].indexOf(BASE_URL) > -1) {
                                    return makeRequest(jsonBody[value]);
                                }

                                return Promise.resolve(jsonBody[value]);
                            }

                            var p = jsonBody[value].map((val) => {
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

function makeRequest(url) {
    var options = {
        url: (url.indexOf(BASE_URL) > -1) ? url : BASE_URL + url,
        headers: {
            'User-Agent': 'swapi-node',
            'SWAPI-Node-Version': require('../package.json').version,
        }
    };

    return sendRequest(options);
}

function parseOptions(options) {
    var id, opts;

    opts = options || {};

    if (typeof opts === 'object') {
        return opts;
    } else {
        return {
            id: opts
        };
    }


}

module.exports = {
    get (url) {
        return makeRequest(url);
    },
    getPerson (options) {
        var opts = parseOptions(options);
        return makeRequest('people' + (opts.id ? '/' + opts.id : '/'));
    },
    getStarship (options) {
        var opts = parseOptions(options);
        return makeRequest('starships' + (opts.id ? '/' + opts.id : '/'));
    },
    getVehicle (options) {
        var opts = parseOptions(options);
        return makeRequest('vehicles' + (opts.id ? '/' + opts.id : '/'));
    },
    getFilm (options) {
        var opts = parseOptions(options);
        return makeRequest('films' + (opts.id ? '/' + opts.id : '/'));
    },
    getSpecies (options) {
        var opts = parseOptions(options);
        return makeRequest('species' + (opts.id ? '/' + opts.id : '/'));
    }
};
