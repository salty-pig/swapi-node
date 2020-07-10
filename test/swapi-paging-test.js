'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const { version } = require('../package.json');
const test = require('tape');

const BASE_URL = 'https://swapi.dev/api';
const BASE_HTTP_URL = 'http://swapi.dev/api';

nock.disableNetConnect();

test('returned value should have a nextPage added', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      next: `${BASE_URL}/people/?page=2`,
      previous: null
    });

  const result = await swapi.get(`${BASE_URL}/people/`);
  t.equal(typeof result.nextPage, 'function', 'should be a next function');

  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      next: `${BASE_URL}/people/?page=3`,
      previous: null
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});

test('returned value should have a nextPage added using http', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      next: `${BASE_HTTP_URL}/people/?page=2`,
      previous: null
    });

  const result = await swapi.get(`${BASE_URL}/people/`);
  t.equal(typeof result.nextPage, 'function', 'should be a next function');

  nock(`${BASE_HTTP_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      next: `${BASE_URL}/people/?page=3`,
      previous: null
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});

test('returned value should have a previousPage added', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      previous: `${BASE_URL}/people/?page=2`
    });

  const result = await swapi.get(`${BASE_URL}/people/`);
  t.equal(typeof result.previousPage, 'function', 'should be a next function');

  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      previous: `${BASE_URL}/people/?page=1`
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});

test('returned value should have a previousPage added http', async t => {
  nock(`${BASE_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      previous: `${BASE_HTTP_URL}/people/?page=2`
    });

  const result = await swapi.get(`${BASE_URL}/people/`);
  t.equal(typeof result.previousPage, 'function', 'should be a next function');

  nock(`${BASE_HTTP_URL}/`)
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      previous: `${BASE_URL}/people/?page=1`
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});
