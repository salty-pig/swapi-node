'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const {version} = require('../package.json');
const test = require('tape');

nock.disableNetConnect();

test('returned value should have a nextPage added', async t => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      next: 'https://swapi.co/api/people/?page=2',
      previous: null
    });

  const result = await swapi.get('https://swapi.co/api/people/');
  t.equal(typeof result.nextPage, 'function', 'should be a next function');

  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      next: 'https://swapi.co/api/people/?page=3',
      previous: null
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});

test('returned value should have a previousPage added', async t => {
  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      previous: 'https://swapi.co/api/people/?page=2'
    });

  const result = await swapi.get('https://swapi.co/api/people/');
  t.equal(typeof result.previousPage, 'function', 'should be a next function');

  nock('https://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/?page=2')
    .reply(200, {
      count: 82,
      previous: 'https://swapi.co/api/people/?page=1'
    });

  await result.nextPage();
  t.pass('success returned');
  t.end();
});
