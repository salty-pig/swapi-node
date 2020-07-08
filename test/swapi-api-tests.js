'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const { version } = require('../package.json');
const test = require('tape');

const BASE_URL = 'https://swapi.dev/api';

nock.disableNetConnect();

test('GET a resource', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {});

  await swapi.get(`${BASE_URL}/people/?page=2`);
  t.pass('return success');
  t.end();
});

test('GET People - Return a Promise', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  const request = swapi.getPerson(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET People - Return a Promise', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  const request = swapi.people(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET People - using options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {});

  await swapi.getPerson({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET People - error returned', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(400, {});
  try {
    await swapi.getPerson({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});

test('GET films', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  const request = swapi.getFilm(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET films', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  const request = swapi.films(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET films - with options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(200, {});

  await swapi.getFilm({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET films - with error', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/films/1')
    .reply(400, {});

  try {
    await swapi.getFilm({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});

test('GET starship', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  const request = swapi.getStarship(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET starship', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  const request = swapi.starships(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET starship - with options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(200, {});

  await swapi.getStarship({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET starship - with error', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/starships/1')
    .reply(400, {});
  try {
    await swapi.getStarship({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});

test('GET vehicles', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  const request = swapi.getVehicle(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET vehicles', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  const request = swapi.vehicles(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET vehicles - with options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(200, {});

  await swapi.getVehicle({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET vehicles - with error', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/vehicles/1')
    .reply(400, {});

  try {
    await swapi.getVehicle({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});

test('GET species', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  const request = swapi.getSpecies(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET species', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  const request = swapi.species(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET species - with options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(200, {});

  await swapi.getSpecies({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET species - with error', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/species/1')
    .reply(400, {});

  try {
    await swapi.getSpecies({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});

test('GET planets', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(200, {});

  const request = swapi.getPlanets(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET planets', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(200, {});

  const request = swapi.planets(1);

  t.equal(request instanceof Promise, true, 'should return a Promise');
  t.end();
});

test('GET planets - with options', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(200, {});

  await swapi.getPlanets({ id: 1 });
  t.pass('success return');
  t.end();
});

test('GET planets - with error', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/planets/1')
    .reply(400, {});

  try {
    await swapi.getPlanets({ id: 1 });
  } catch {
    t.pass('error return');
    t.end();
  }
});
