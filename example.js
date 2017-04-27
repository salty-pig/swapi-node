const swapi = require('./index.js');

swapi.getPerson().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});

