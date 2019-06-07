'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const version = require('../package.json').version;
const test = require('tape');

nock.disableNetConnect();

test('GET a resource', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {});

  swapi.get('https://swapi.co/api/people/?page=2').then(() => {
    t.pass('return success');
    t.end();
  });
});

test('GET People - Return a Promise', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  const request = swapi.getPerson(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET People - using options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

});

test('GET People - error returned', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(400, {});

});

test('GET films', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  const request = swapi.getFilm(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET films - with options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

});

test('GET films - with error', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(400, {});

});

test('GET starship', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  const request = swapi.getStarship(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET starship - with options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

});

test('GET starship - with error', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(400, {});

});

test('GET vehicles', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  const request = swapi.getVehicle(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET vehicles - with options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

});

test('GET vehicles - with error', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(400, {});

});

test('GET species', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  const request = swapi.getSpecies(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET species - with options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

});

test('GET species - with error', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(400, {});

});

test('GET planets', (t) => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(200, {});

  const request = swapi.getPlanets(1).then(() => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET planets - with options', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(200, {});

});

test('GET planets - with error', () => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(400, {});

});
