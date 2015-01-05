var request = require('request'),
    Promise = require('es6-promise').Promise,
    util = require('./util');

var baseUrl = 'http://swapi.co/api/';

function sendRequest(options) {
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error || response.statusCode > 399) {
                return reject({error: response.statusCode});
            }

            var jsonBody;

            try {
                jsonBody = JSON.parse(body);
            } catch (e) {
                return reject({error: 'JSON parse error'});
            }

            ['nextPage', 'previousPage'].forEach(function (value) {
                jsonBody[value] = (function () {
                    return function () {
                        var url = jsonBody[(value.indexOf('next') > -1) ? 'next' : 'previous'];
                        if (url) {
                            return makeRequest(url);
                        }

                        return Promise.resolve(null);
                    };
                })();
            });

            Object.keys(jsonBody).forEach(function (value) {
                if (typeof jsonBody[value] !== 'function') {
                    jsonBody['get' + util.capitaliseFirstLetter(value)] = (function () {
                        return function () {
                            if (!Array.isArray(jsonBody[value])) {
                                if (jsonBody[value].indexOf(baseUrl) > -1) {
                                    return makeRequest(jsonBody[value]);
                                }

                                return Promise.resolve(jsonBody[value]);
                            }

                            var p = jsonBody[value].map(function (val) {
                                if (val.indexOf(baseUrl) > -1) {
                                    return makeRequest(val);
                                }
                                return Promise.resolve(val);
                            });

                            return Promise.all(p).then(function (v) {
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
        url: (url.indexOf(baseUrl) > -1) ? url : baseUrl + url,
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
    get: function (url) {
        return makeRequest(url);
    },
    getPerson: function (options) {
        var opts = parseOptions(options);
        return makeRequest('people' + (opts.id ? '/' + opts.id : '/'));
    },
    getStarship: function (options) {
        var opts = parseOptions(options);
        return makeRequest('starship' + (opts.id ? '/' + opts.id : '/'));
    },
    getVehicle: function (options) {
        var opts = parseOptions(options);
        return makeRequest('vehicles' + (opts.id ? '/' + opts.id : '/'));
    },
    getFilm: function (options) {
        var opts = parseOptions(options);
        return makeRequest('films' + (opts.id ? '/' + opts.id : '/'));
    },
    getSpecies: function (options) {
        var opts = parseOptions(options);
        return makeRequest('species' + (opts.id ? '/' + opts.id : '/'));
    }
};
