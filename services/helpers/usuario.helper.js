var PATH_UPLOAD_PROFILES = require('../../services/config/config').PATH_UPLOAD_PROFILES;
var PATH_UPLOAD_PREVIEW_ANUNCIO = require('../../services/config/config').PATH_UPLOAD_PREVIEW_ANUNCIO;
var PATH_UPLOAD_IMAGES_ANUNCIOS = require('../../services/config/config').PATH_UPLOAD_IMAGES_ANUNCIOS;

const { API_SPRING } = require("../../config/enviroments/");
module.exports = {
    usuarioNuevoRedSocial: function(usuarioRedSocial, redsocial, _bcrypt) {
        return {
            "usuario": usuarioRedSocial.email,
            "password": _bcrypt.hashSync(redsocial, 10),
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
    },


    getOptions: function(postData) {
        var options = {
            host: API_SPRING,
            port: 8090,
            path: '/matrix/seguridad/oauth/token',
            method: 'POST',
            // authentication headers
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + new Buffer.from('matrix-app-angular' + ':' + '12345').toString('base64'),
                'Content-Length': postData.length
            }
        };
        return options;
    },
    getUserData: function(username, password, _querystring) {

        var postData = _querystring.stringify({
            'username': username,
            'password': password,
            'grant_type': 'password'
        });
        return postData;
    }
}