## swapi-node

A Node.js helper library for http://swapi.co/ - the Star Wars API


## Requirements

* node.js
* love of Star Wars


## Installation

    npm install swapi-node


## Usage

    var swapi = require('swapi-node');

    // To get just 1 person
    swapi.getPerson(1, function (err, result) {
        console.log(result);
    });


### Note

This API tries to follow the API for the Python helper lib here: https://github.com/phalt/swapi-python

For documentation on the Star Wars API, check out their docs:  http://swapi.co/documentation
