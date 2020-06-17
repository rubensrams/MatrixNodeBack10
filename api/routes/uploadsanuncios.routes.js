const { Router } = require("express");
module.exports = function({ UploadsAnunciosController }) {

    const router = Router();
    router.post("/imagenes/:id", UploadsAnunciosController.uploadFotoAnuncios.bind(UploadsAnunciosController));
    return router;
};