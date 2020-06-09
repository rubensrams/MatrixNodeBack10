const { Router } = require("express");
const validateUploadMD = require('../midlewares/uploadsMidleware').validateUploadPhotoProfile;

module.exports = function({ UploadsController }) {

    const router = Router();

    // El bind es para usar la misma instancia
    router.put("/usuario/uploadFotoProfile/:id", validateUploadMD, UploadsController.uploadFotoUsuario.bind(UploadsController));
    router.get("/usuario/getFotoProfile/:foto", UploadsController.getFotoUsuario.bind(UploadsController));
    return router;
};