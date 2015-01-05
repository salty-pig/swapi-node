var swapi = require('./index.js');

swapi.getPerson().then(function (result) {
    console.log(result);
}).catch(function (err) {
    console.log(err);
});

