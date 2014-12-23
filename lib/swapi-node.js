var request = require('request'),
    Promise = require('es6-promise').Promise;

var baseUrl = 'http://swapi.co/api/';

function sendRequest(options, callback) {
    return new Promise(function (resolve, reject) {
        callback = callback || function () {};

        request(options, function (error, response, body) {
            if (error || response.statusCode > 399) {
                // TODO: create an error creator
                // TODO: Possibly remove callbacks
                callback({error: response.statusCode});

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

            callback(null, jsonBody);
            return resolve(jsonBody);
        });
    });
}

function makeRequest(url, callback) {
    var options = {
        url: (url.indexOf(baseUrl) > -1) ? url : baseUrl + url,
        headers: {
            'User-Agent': 'swapi-node',
            'SWAPI-Node-Version': require('../package.json').version,
        }
    };

    return sendRequest(options, callback);
}

module.exports = {
    // getAll: function () {
    //     makeRequest(baseUrl + 'people/' + id, callback);
    // },
    get: function (url, callback) {
        return makeRequest(url, callback);
    },
    getPerson: function (id, callback) {
        return makeRequest('people/' + id, callback);
    },
    getStarship: function (id, callback) {
        return makeRequest('starship/' + id, callback);
    },
    getVehicle: function (id, callback) {
        return makeRequest('vehicles/' + id, callback);
    },
    getFilm: function (id, callback) {
        return makeRequest('films/' + id, callback);
    },
    getSpecies: function (id, callback) {
        return makeRequest('species/' + id, callback);
    }
};
