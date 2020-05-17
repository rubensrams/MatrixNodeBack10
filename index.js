const container = require('./api/container');

//solicita una instancia de app del container.js
const applicacion = container.resolve("app");

applicacion.start().catch(err => {

    console.log(err);
    process.exit();
})