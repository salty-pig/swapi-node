var http = require('http');

var baseUrl = 'http://swapi.co/api/';

function makeRequest(url, callback) {
    callback = callback || function () {};

    http.get(url, function (result) {
        if (result.statusCode > 399) {
            return callback({status: result.statusCode});
        }

        return callback(null, result);
    }).on('error', function (err) {
        return callback(err);
    });
}

module.exports = {
    // getAll: function () {
    //     makeRequest(baseUrl + 'people/' + id, callback);
    // },
    getPerson: function (id, callback) {
        makeRequest(baseUrl + 'people/' + id, callback);
    },
    getStarship: function (id, callback) {
        makeRequest(baseUrl + 'starship/' + id, callback);
    },
    getVehicle: function (id, callback) {
        makeRequest(baseUrl + 'vehicles/' + id, callback);
    },
    getFilm: function (id, callback) {
        makeRequest(baseUrl + 'films/' + id, callback);
    },
    getSpecies: function (id, callback) {
        makeRequest(baseUrl + 'species/' + id, callback);
    }
};
