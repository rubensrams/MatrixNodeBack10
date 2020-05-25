const { Router } = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

module.exports = function({ UsuarioRutas }) {
    const router = Router();
    const apiRoute = Router();
    //Registrando midlewaren
    apiRoute
    //Permitir peticiones de otro dominio
        .use(cors())
        // midleware sirve para parsear las respuestas del body a un json
        .use(bodyParser.json())
        //Me permitio enviar parametros application/x-www-form-urlencoded como body si no no funciona
        //el req.body.parametro 
        .use(bodyParser.urlencoded({ extended: false }))
        //comprime las peticiones http
        .use(compression());

    apiRoute.use("/seguridad", UsuarioRutas);
    router.use("/matrix", apiRoute);

    return router;
};