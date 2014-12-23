require('should');
var nock = require('nock');
var swapi = require('../index.js');
var version = require('../package.json').version;
var Promise = require('es6-promise').Promise;

nock.disableNetConnect();

describe('API Tests', function () {
    describe('Get a resource', function () {
        it('should call the get api with a url', function (done) {
            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/?page=2')
            .reply(200, {});

            swapi.get('http://swapi.co/api/people/?page=2', function (err, result) {
                if (!err) {
                    done();
                }
            });
        });
    });

    describe('Get People', function () {
        it('should call the people api', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/1')
            .reply(200, {});

            swapi.getPerson(1, function (err, result) {
                if (!err) {
                    done();
                }
            });
        });

        it('should call the people api with an error', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/1')
            .reply(400, {});

            swapi.getPerson(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });

        it('should call the people api and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/1')
            .reply(200, {});

            var request = swapi.getPerson(1).then(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });


        it('should call the people api with an error and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/1')
            .reply(400, {});

            var request = swapi.getPerson(1).catch(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });
    });

    describe('Get Films', function () {
        it('should call the films api', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/films/1')
            .reply(200, {});

            swapi.getFilm(1, function (err, result) {
                if (!err) {
                    done();
                }
            });
        });

        it('should call the films api with an error', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/films/1')
            .reply(400, {});

            swapi.getFilm(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });

        it('should call the films api and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/films/1')
            .reply(200, {});

            var request = swapi.getFilm(1).then(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });


        it('should call the films api with an error and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/films/1')
            .reply(400, {});

            var request = swapi.getFilm(1).catch(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });
    });

    describe('Get Vehicles', function () {
        it('should call the vehicles api', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/vehicles/1')
            .reply(200, {});

            swapi.getVehicle(1, function (err, result) {
                if (!err) {
                    done();
                }
            });
        });

        it('should call the vehicles api with an error', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/vehicles/1')
            .reply(400, {});

            swapi.getVehicle(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });

        it('should call the vehicles api and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/vehicles/1')
            .reply(200, {});

            var request = swapi.getVehicle(1).then(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });


        it('should call the vehicles api with an error and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/vehicles/1')
            .reply(400, {});

            var request = swapi.getVehicle(1).catch(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });
    });

    describe('Get Species', function () {
        it('should call the species api', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/species/1')
            .reply(200, {});

            swapi.getSpecies(1, function (err, result) {
                if (!err) {
                    done();
                }
            });
        });

        it('should call the species api with an error', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/species/1')
            .reply(400, {});

            swapi.getSpecies(1, function (err, result) {
                if (err) {
                    return done();
                }
            });
        });

        it('should call the species api and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/species/1')
            .reply(200, {});

            var request = swapi.getSpecies(1).then(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });


        it('should call the species api with an error and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/species/1')
            .reply(400, {});

            var request = swapi.getSpecies(1).catch(function (result) {
                done();
            });

            request.should.be.an.instanceof(Promise);
        });
    });
});
