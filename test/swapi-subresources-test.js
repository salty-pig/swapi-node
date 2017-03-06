'use strict';

const nock = require('nock');
const swapi = require('../lib/swapi-node.js');
const version = require('../package.json').version;
const test = require('tape');

nock.disableNetConnect();

test('property with link should have a corresponding getter', (t) => {
  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {
        name: 'Luke Skywalker',
        'homeworld': 'http://swapi.co/api/planets/1/',
    });

  swapi.getPerson(1).then((result) => {
    t.equal((typeof result.getHomeworld === 'function'), true, 'should be a function');

    nock('http://swapi.co/api/')
      .matchHeader('User-Agent', 'swapi-node')
      .matchHeader('SWAPI-Node-Version', version)
      .get('/planets/1/')
      .reply(200, {
        'name': 'Tatooine'
      });

    return result.getHomeworld();
  }).then((result) => {
    t.ok('succes returned');
    t.end();
  });
});

test('property with out link should have a corresponding getter anyway', (t) => {

  nock('http://swapi.co/api/')
    .matchHeader('User-Agent', 'swapi-node')
    .matchHeader('SWAPI-Node-Version', version)
    .get('/people/1')
    .reply(200, {
      name: 'Luke Skywalker',
      'homeworld': 'http://swapi.co/api/planets/1/',
    });

  swapi.getPerson(1).then((result) => {
    t.equal((typeof result.getName === 'function'), true, 'should be a function');

    return result.getName();
  }).then((result) => {
      t.equal(result, 'Luke Skywalker', 'should equal');
      t.end();
  });
});
