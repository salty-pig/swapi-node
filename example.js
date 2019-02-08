const swapi = require('./dist/swapi-node');

swapi.getPerson().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

