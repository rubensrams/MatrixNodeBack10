const util = require("util");
const multer = require("multer");
var PATH_UPLOAD_IMAGES_ANUNCIOS = require('../../services/config/config').PATH_UPLOAD_IMAGES_ANUNCIOS;

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, PATH_UPLOAD_IMAGES_ANUNCIOS);
    },
    filename: (req, file, callback) => {
        const match = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
        let id = req.params.id;
        if (match.indexOf(file.mimetype) === -1) {

            var message = `${file.originalname}`;
            return callback(new Error('Solo imagenes son permitidas: ' + message), null);
        }

        let nombreCorto = file.originalname.split('.');
        let extension = nombreCorto[nombreCorto.length - 1];
        let nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extension}`;
        callback(null, nombreArchivo);
    }
});

var uploadFiles = multer({ storage: storage }).array("imagen", 6);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;