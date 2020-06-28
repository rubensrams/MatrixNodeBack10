const PATH_UPLOAD_PREVIEW_ANUNCIO = require('../config/config').PATH_UPLOAD_PREVIEW_ANUNCIO;
const PATH_UPLOAD_IMAGES_ANUNCIOS = require('../config/config').PATH_UPLOAD_IMAGES_ANUNCIOS;

const { API_SPRING } = require("../../config/enviroments");
module.exports = {





    getArchivoPreviewAnuHelp: function(foto, _fs, _path) {

        let pathImagen = _path.resolve(__dirname, PATH_UPLOAD_PREVIEW_ANUNCIO + foto);
        if (_fs.existsSync(pathImagen)) {
            return pathImagen;
        } else {
            return _path.resolve(__dirname, '../../api/assets/noimage.png');

        }
    },

    getArchivoGaleriaAnuHelp: function(foto, _fs, _path) {

        let pathImagen = _path.resolve(__dirname, PATH_UPLOAD_IMAGES_ANUNCIOS + foto);
        if (_fs.existsSync(pathImagen)) {
            return pathImagen;
        } else {
            return _path.resolve(__dirname, '../../api/assets/noimage.png');

        }
    },

    subePreviewHelp: function(archivo, anuncioDB, id, _fs) {

        let nombreCorto = archivo.name.split('.');
        let extension = nombreCorto[nombreCorto.length - 1];
        let nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extension}`;

        //Mover el archivo a un path
        var path = PATH_UPLOAD_PREVIEW_ANUNCIO + nombreArchivo;
        var pathViejo = PATH_UPLOAD_PREVIEW_ANUNCIO + anuncioDB.foto;

        //Si existe eliminala imagen anterior
        if (_fs.existsSync(pathViejo)) {
            _fs.unlinkSync(pathViejo);
        }
        archivo.mv(path, err => {
            if (err) {
                throw new Error('Error al subir la foto de perfil');
            }
        });

        return nombreArchivo;
    }

}