const upload = require("../midlewares/uploadMultiMidleware");
const uploadSingle = require("../midlewares/uploadSingleMidleware");
class UploadsAnunciosController {

    constructor({ UploadService }) {
        this._uploadService = UploadService;
    }

    async uploadFotoAnuncios(req, res) {
        try {
            //Se suben los archivos, se utiliza el midleware
            await upload(req, res);
            //Una vez que ya estan en el request se obtienen
            if (req.files.length <= 0) {
                return res.send({
                    error: '01',
                    mensaje: 'Debe seleccionar un archivo' //,
                        //usuarios: usuarios
                });
            }
            //Se guarda la referencia de los archivos en la galeria
            //Si todo es correcto se avisa al usuario
            await this._uploadService.guardaGaleriaAnuncio(req.files, req.params.id);
            return res.send({
                error: '00',
                mensaje: 'Resultado carga exitoso'
            });
        } catch (error) {
            if (error.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send({
                    error: '01',
                    mensaje: 'Se ha excedido el máximo de archivos a subir' //,
                });
            }
            return res.send({
                error: '02',
                mensaje: `Error al tratar de subir los archivos: ${error}` //,
            });

        }
    }

    async getPreviewFotoAnunc(req, resp) {
        let foto = req.params.foto;
        try {
            let fotoRes = await this._uploadService.getFotoPreviewAnuncio(foto);
            return resp.sendFile(fotoRes);
        } catch (e) {
            return resp.status(500).send({
                error: true,
                mensaje: 'Ocurrio un error ' + e
            });
        }
    }


    async getGaleriaAnunc(req, resp) {
        let foto = req.params.foto;
        try {
            let fotoRes = await this._uploadService.getArchivoGaleria(foto);
            return resp.sendFile(fotoRes);
        } catch (e) {
            return resp.status(500).send({
                error: true,
                mensaje: 'Ocurrio un error ' + e
            });
        }
    }



    async uploadPreviewAnuncio(req, res) {
        try {
            //Se suben los archivos, se utiliza el midleware
            await uploadSingle(req, res);
            //Una vez que ya estan en el request se obtienen
            if (req.file.length <= 0) {
                return res.send({
                    error: '01',
                    mensaje: 'Debe seleccionar un archivo' //,
                        //usuarios: usuarios
                });
            }
            //Se guarda la referencia de los archivos en la galeria
            //Si todo es correcto se avisa al usuario
            await this._uploadService.guardaPreviewAnuncio(req.file, req.params.id);
            return res.send({
                error: '00',
                mensaje: 'Resultado carga exitoso'
            });
        } catch (error) {
            return res.send({
                error: '02',
                mensaje: `Error al tratar de subir el preview: ${error}` //,
            });

        }
    }

}

module.exports = UploadsAnunciosController;