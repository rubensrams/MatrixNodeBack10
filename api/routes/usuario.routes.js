const { Router } = require("express");

const tokenGoogle = require('../midlewares/tokenGoogleMidleware').verifyTokenGoogleRes;

module.exports = function({ UsuarioController }) {

    const router = Router();

    // El bind es para usar la misma instancia
    router.get("/getUsuarios", UsuarioController.getUsuarios.bind(UsuarioController));
    router.post("/login/google", tokenGoogle, UsuarioController.createUsuario.bind(UsuarioController));
    router.post("/login/facebook", UsuarioController.createUsuarioFB.bind(UsuarioController));

    return router;
};