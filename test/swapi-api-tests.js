'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const version = require('../package.json').version;
const test = require('tape');

nock.disableNetConnect();

test('GET a resource', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {});

  swapi.get('http://swapi.co/api/people/?page=2').then((result) => {
    t.pass('return success');
    t.end();
  });
});

test('GET People - Return a Promise', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  const request = swapi.getPerson(1).then((result) => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET People - using options', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  const request = swapi.getPerson({id: 1}).then((result) => {
    t.pass('success return');
    t.end();
  });
});

test('GET People - error returned', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(400, {});

  const request = swapi.getPerson({id: 1}).then(null, (result) => {
    t.pass('error return');
    t.end();
  });
});

test('GET films', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  const request = swapi.getFilm(1).then((result) => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET films - with options', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  const request = swapi.getFilm({id: 1}).then((result) => {
    t.pass('success return');
    t.end();
  });
});

test('GET films - with error', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(400, {});

  const request = swapi.getFilm({id: 1}).then(null, (result) => {
    t.pass('error return');
    t.end();
  });
});

test('GET starship', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  const request = swapi.getStarship(1).then((result) => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET starship - with options', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  const request = swapi.getStarship({id: 1}).then((result) => {
    t.pass('success return');
    t.end();
  });
});

test('GET starship - with error', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(400, {});

  const request = swapi.getStarship({id: 1}).then(null, (result) => {
    t.pass('error return');
    t.end();
  });
});

test('GET vehicles', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  const request = swapi.getVehicle(1).then((result) => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET vehicles - with options', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  const request = swapi.getVehicle({id: 1}).then((result) => {
    t.pass('success return');
    t.end();
  });
});

test('GET vehicles - with error', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(400, {});

  const request = swapi.getVehicle({id: 1}).then(null, (result) => {
    t.pass('error return');
    t.end();
  });
});

test('GET species', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  const request = swapi.getSpecies(1).then((result) => {
    t.pass('success return');
    t.end();
  });

  t.equal(request instanceof Promise, true, 'should return a Promise');
});

test('GET species - with options', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  const request = swapi.getSpecies({id: 1}).then((result) => {
    t.pass('success return');
    t.end();
  });
});

test('GET species - with error', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(400, {});

  const request = swapi.getSpecies({id: 1}).then(null, (result) => {
    t.pass('error return');
    t.end();
  });
});
