require('should');
var nock = require('nock');
var swapi = require('../index.js');

nock.disableNetConnect();

describe('API Tests', function () {
    describe('Get People', function () {
        it('should call the people api', function (done) {

            nock('http://swapi.co/api/')
                .get('/people/1')
                .reply(200);

            swapi.getPerson(1, function (err, result) {
               if (!err) {
                    done();
                }
            });
        });

        it('should call the people api with an error', function (done) {

            nock('http://swapi.co/api/')
                .get('/people/1')
                .reply(400, {});

            swapi.getPerson(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });
    });

    describe('Get Films', function () {
        it('should call the films api', function (done) {

            nock('http://swapi.co/api/')
                .get('/films/1')
                .reply(200);

            swapi.getFilm(1, function (err, result) {
               if (!err) {
                    done();
                }
            });
        });

        it('should call the films api with an error', function (done) {

            nock('http://swapi.co/api/')
                .get('/films/1')
                .reply(400, {});

            swapi.getFilm(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });
    });

    describe('Get Vehicles', function () {
        it('should call the vehicles api', function (done) {

            nock('http://swapi.co/api/')
                .get('/vehicles/1')
                .reply(200);

            swapi.getVehicle(1, function (err, result) {
               if (!err) {
                    done();
                }
            });
        });

        it('should call the vehicles api with an error', function (done) {

            nock('http://swapi.co/api/')
                .get('/vehicles/1')
                .reply(400, {});

            swapi.getVehicle(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });
    });

    describe('Get Species', function () {
        it('should call the species api', function (done) {

            nock('http://swapi.co/api/')
                .get('/species/1')
                .reply(200);

            swapi.getSpecies(1, function (err, result) {
                if (!err) {
                    done();
                }
            });
        });

        it('should call the species api with an error', function (done) {

            nock('http://swapi.co/api/')
                .get('/species/1')
                .reply(400, {});

            swapi.getSpecies(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });
    });
});
