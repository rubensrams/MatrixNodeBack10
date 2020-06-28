const { Router } = require("express");
const validateUploadMD = require('../midlewares/uploadsMidleware').validateUploadPhotoProfile;
module.exports = function({ UploadsAnunciosController }) {

    const router = Router();
    router.post("/imagenes/:id", UploadsAnunciosController.uploadFotoAnuncios.bind(UploadsAnunciosController));
    router.get("/imagenes/getPreviewAnuncio/:foto", UploadsAnunciosController.getPreviewFotoAnunc.bind(UploadsAnunciosController));
    router.get("/imagenes/getGaleriaAnuncio/:foto", UploadsAnunciosController.getGaleriaAnunc.bind(UploadsAnunciosController));
    router.put("/imagenes/uploadPreviewAnuncio/:id", UploadsAnunciosController.uploadPreviewAnuncio.bind(UploadsAnunciosController));
    return router;
};