## swapi-node [![Node.js CI](https://github.com/salty-pig/swapi-node/actions/workflows/nodejs-ci-action.yml/badge.svg)](https://github.com/salty-pig/swapi-node/actions/workflows/nodejs-ci-action.yml)[![Dependency Status](https://david-dm.org/salty-pig/swapi-node.png)](https://david-dm.org/salty-pig/swapi-node) [![Coverage Status](https://coveralls.io/repos/salty-pig/swapi-node/badge.svg?branch=master&service=github)](https://coveralls.io/github/salty-pig/swapi-node?branch=master)



A Node.js helper library for http://swapi.dev/ - the Star Wars API


## Requirements

* node.js - 0.12.0+ (Uses Native Promises)
* love of Star Wars


## Installation

    npm install swapi-node


## Usage

    const swapi = require('swapi-node');

    swapi.people({ id: 1 }).then((result) => {
        console.log(result);
    });


There is a general `get` method that takes a `url`.  So this is also possible:

    swapi.get('https://swapi.dev/api/people/?page=2').then((result) => {
        console.log(result);
    });

When you call a "Base URL", like https://swapi.dev/api/people/, it will include a `next` and `previous` parameter.  These will be the link to the next/previous page of data.

There are helper methods to get results from the next/previous page called `nextPage` and `previousPage`.  Each of these returns a Promise

Here is an example

    swapi.get('https://swapi.dev/api/people/').then((result) => {
        console.log(result);
        return result.nextPage();
    }).then((result) => {
        console.log(result);
        return result.previousPage();
    }).then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });


#### Sub Resources

There are some values that return a link.  To make it easier to deal with these, there are corresponding getters for those properties.

For example,  a call to `people({id: 1})` might return this json:

    {
        "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.dev/api/planets/1/",
        "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
        ],
        "species": [],
        "vehicles": [
            "https://swapi.dev/api/vehicles/14/",
            "https://swapi.dev/api/vehicles/30/"
        ],
        "starships": [
            "https://swapi.dev/api/starships/12/",
            "https://swapi.dev/api/starships/22/"
        ],
        "created": "2014-12-09T13:50:51.644000Z",
        "edited": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.dev/api/people/1/"
    }

taking "homeworld" as an example,  you can now call `getHomeworld()`, which will return a Promise

    getHomeworld().then((result) => {
        console.log(result);
    });

This might produce some json like this:


    {
        "name": "Tatooine",
        "rotation_period": "23",
        "orbital_period": "304",
        "diameter": "10465",
        "climate": "arid",
        "gravity": "1 standard",
        "terrain": "desert",
        "surface_water": "1",
        "population": "200000",
        "residents": [
            "https://swapi.dev/api/people/1/",
            "https://swapi.dev/api/people/2/",
            "https://swapi.dev/api/people/4/",
            "https://swapi.dev/api/people/6/",
            "https://swapi.dev/api/people/7/",
            "https://swapi.dev/api/people/8/",
            "https://swapi.dev/api/people/9/",
            "https://swapi.dev/api/people/11/",
            "https://swapi.dev/api/people/43/",
            "https://swapi.dev/api/people/62/"
        ],
        "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/4/",
            "https://swapi.dev/api/films/5/",
            "https://swapi.dev/api/films/6/"
        ],
        "created": "2014-12-09T13:50:49.641000Z",
        "edited": "2014-12-21T20:48:04.175778Z",
        "url": "https://swapi.dev/api/planets/1/"
    }

### Note

This API tries to follow the API for the Python helper lib here: https://github.com/phalt/swapi-python

For documentation on the Star Wars API, check out their docs:  http://swapi.dev/documentation

## Breaking Changes

- 0.3.0 - Usage of Native Promises, Node 0.12+ or greater needed
