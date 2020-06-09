var PATH_UPLOAD_PROFILES = require('../../services/config/config').PATH_UPLOAD_PROFILES;

module.exports = {
    usuarioNuevoRedSocial: function(usuarioRedSocial, redsocial) {
        return {
            "usuario": usuarioRedSocial.email,
            "password": 'xxxxx',
            "nombre": usuarioRedSocial.nombre,
            "activo": 1,
            "email": usuarioRedSocial.email,
            "foto": usuarioRedSocial.img,
            "social": redsocial
        }
    },

    omiteCaracter: function(foto, redsocial) {
        if (redsocial === 'FACEBOOK') {
            var parameter_Start_index = foto.indexOf('?');
            var foto = foto.substring(0, parameter_Start_index);
        }
        return {
            foto
        }
    },

    subeArchivoHelp: function(archivo, usuarioDB, id, _fs) {

        let nombreCorto = archivo.name.split('.');
        let extension = nombreCorto[nombreCorto.length - 1];
        let nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extension}`;

        if (!usuarioDB) {
            throw new Error('El usuario no está registrado en el sistema');
        }
        //Mover el archivo a un path
        var path = PATH_UPLOAD_PROFILES + nombreArchivo;
        var pathViejo = PATH_UPLOAD_PROFILES + usuarioDB.foto;

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
    },

    getArchivoHelp: function(foto, _fs, _path) {

        let pathImagen = _path.resolve(__dirname, PATH_UPLOAD_PROFILES + foto);
        if (_fs.existsSync(pathImagen)) {
            return pathImagen;
        } else {
            return _path.resolve(__dirname, '../../api/assets/noimage.png');

        }
    }
}