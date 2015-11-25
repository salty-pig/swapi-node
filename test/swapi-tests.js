require('should');
var nock = require('nock');
var swapi = require('../index.js');
var version = require('../package.json').version;

nock.disableNetConnect();

describe('API Tests', function () {
    describe('Get a resource', function () {
        it('should call the get api with a url', function (done) {
            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/?page=2')
            .reply(200, {});

            swapi.get('http://swapi.co/api/people/?page=2').then(function (result) {
                done();
            });
        });
    });

    describe('Get People', function () {
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

        it('should call the people api with options and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/1')
            .reply(200, {});

            var request = swapi.getPerson({id: 1}).then(function (result) {
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

        it('should call the films api with options and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/films/1')
            .reply(200, {});

            var request = swapi.getFilm({id: 1}).then(function (result) {
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

        it('should call the vehicles api and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/vehicles/1')
            .reply(200, {});

            var request = swapi.getVehicle({id: 1}).then(function (result) {
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

        it('should call the species api with options and return a Promise', function (done) {

            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/species/1')
            .reply(200, {});

            var request = swapi.getSpecies({id: 1}).then(function (result) {
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

describe('Sub Resource Tests', function () {
    describe('getProperty', function () {
        it('property with link should have a corresponding getter', function (done) {
            nock('http://swapi.co/api/')
                .matchHeader('User-Agent', 'swapi-node')
                .matchHeader('SWAPI-Node-Version', version)
                .get('/people/1')
                .reply(200, {
                    name: 'Luke Skywalker',
                    'homeworld': 'http://swapi.co/api/planets/1/',
                });

            swapi.getPerson(1).then(function (result) {
                (typeof result.getHomeworld === 'function').should.equal(true);

                nock('http://swapi.co/api/')
                .matchHeader('User-Agent', 'swapi-node')
                .matchHeader('SWAPI-Node-Version', version)
                .get('/planets/1/')
                .reply(200, {
                    'name': 'Tatooine'
                });

                return result.getHomeworld();
            }).then(function (result) {
                done();
            });
        });

        it('property with out link should have a corresponding getter anyway', function (done) {
            nock('http://swapi.co/api/')
                .matchHeader('User-Agent', 'swapi-node')
                .matchHeader('SWAPI-Node-Version', version)
                .get('/people/1')
                .reply(200, {
                    name: 'Luke Skywalker',
                    'homeworld': 'http://swapi.co/api/planets/1/',
                });

            swapi.getPerson(1).then(function (result) {
                (typeof result.getName === 'function').should.equal(true);

                return result.getName();
            }).then(function (result) {
                result.should.equal('Luke Skywalker');
                done();
            });
        });
    });
});

describe('Paging tests', function () {
    describe('nextPage', function () {
        it('returned value should have a nextPage function added', function (done) {
            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/')
            .reply(200, {
                count: 82,
                next: 'http://swapi.co/api/people/?page=2',
                previous: null
            });

            swapi.get('http://swapi.co/api/people/').then(function (result) {
                result.nextPage.should.be.type('function');

                nock('http://swapi.co/api/')
                .matchHeader('User-Agent', 'swapi-node')
                .matchHeader('SWAPI-Node-Version', version)
                .get('/people/?page=2')
                .reply(200, {
                    count: 82,
                    next: 'http://swapi.co/api/people/?page=3',
                    previous: null
                });

                result.nextPage().then(function (result) {
                    done();
                });
            });
        });
    });

    describe('previousPage', function () {
        it('returned value should have a previousPage function added', function (done) {
            nock('http://swapi.co/api/')
            .matchHeader('User-Agent', 'swapi-node')
            .matchHeader('SWAPI-Node-Version', version)
            .get('/people/')
            .reply(200, {
                count: 82,
                previous: 'http://swapi.co/api/people/?page=2'
            });

            swapi.get('http://swapi.co/api/people/').then(function (result) {
                result.previousPage.should.be.type('function');

                nock('http://swapi.co/api/')
                .matchHeader('User-Agent', 'swapi-node')
                .matchHeader('SWAPI-Node-Version', version)
                .get('/people/?page=2')
                .reply(200, {
                    count: 82,
                    previous: 'http://swapi.co/api/people/?page=1',
                });

                result.previousPage().then(function (result) {
                    done();
                });
            });
        });
    });
});
