var request = require('request');

var baseUrl = 'http://swapi.co/api/';

function makeRequest(url, callback) {
    var options;

    callback = callback || function () {};

    options = {
        url: baseUrl + url,
        headers: {
            'User-Agent': 'swapi-node',
            'SWAPI-Node-Version': require('./package.json').version,
        }
    };

    request(options, function (error, response, body) {
        if (error || response.statusCode > 399) {
            return callback({error: response.statusCode});
        }

        var jsonBody;

        try {
            jsonBody = JSON.parse(body);
        } catch (e) {
            jsonBody = {};
        }

        return callback(null, jsonBody);
    });
}

module.exports = {
    // getAll: function () {
    //     makeRequest(baseUrl + 'people/' + id, callback);
    // },
    getPerson: function (id, callback) {
        makeRequest('people/' + id, callback);
    },
    getStarship: function (id, callback) {
        makeRequest('starship/' + id, callback);
    },
    getVehicle: function (id, callback) {
        makeRequest('vehicles/' + id, callback);
    },
    getFilm: function (id, callback) {
        makeRequest('films/' + id, callback);
    },
    getSpecies: function (id, callback) {
        makeRequest('species/' + id, callback);
    }
};
