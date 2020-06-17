const upload = require("../midlewares/uploadMultiMidleware");
class UploadsController {

    constructor({ UploadService }) {
        this._uploadService = UploadService;
    }

    async uploadFotoUsuario(req, resp) {
        var archivo = req.files.imagen;
        let id = req.params.id;
        try {
            let usuarios = await this._uploadService.subeFotoUsuario(id, archivo);
            return resp.send({
                error: '00',
                mensaje: 'Resultado exitoso',
                usuarios: usuarios
            });
        } catch (e) {
            return resp.status(500).send({
                error: true,
                mensaje: 'Ocurrio un error ' + e
            });
        }
    }


    async getFotoUsuario(req, resp) {
        let foto = req.params.foto;
        try {
            let fotoRes = await this._uploadService.getFotoUsuario(foto);
            return resp.sendFile(fotoRes);
        } catch (e) {
            return resp.status(500).send({
                error: true,
                mensaje: 'Ocurrio un error ' + e
            });
        }
    }

}

module.exports = UploadsController;