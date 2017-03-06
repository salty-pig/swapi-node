'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const version = require('../package.json').version;
const test = require('tape');

nock.disableNetConnect();

test('returned value should have a nextPage added', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      next: 'http://swapi.co/api/people/?page=2',
      previous: null
    });

  swapi.get('http://swapi.co/api/people/').then((result) => {
    t.equal(typeof result.nextPage, 'function', 'should be a next function');

    nock('http://swapi.co/api/')
      .matchHeader('User-Agent', 'swapi-node')
      .matchHeader('SWAPI-Node-Version', version)
      .get('/people/?page=2')
      .reply(200, {
        count: 82,
        next: 'http://swapi.co/api/people/?page=3',
        previous: null
    });

    result.nextPage().then((result) => {
      t.pass('success returned');
      t.end();
    });
  });
});

test('returned value should have a previousPage added', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/')
    .reply(200, {
      count: 82,
      previous: 'http://swapi.co/api/people/?page=2'
    });

  swapi.get('http://swapi.co/api/people/').then((result) => {
    t.equal(typeof result.previousPage, 'function', 'should be a next function');

    nock('http://swapi.co/api/')
      .matchHeader('User-Agent', 'swapi-node')
      .matchHeader('SWAPI-Node-Version', version)
      .get('/people/?page=2')
      .reply(200, {
        count: 82,
        previous: 'http://swapi.co/api/people/?page=1'
    });

    result.nextPage().then((result) => {
      t.pass('success returned');
      t.end();
    });
  });
});
