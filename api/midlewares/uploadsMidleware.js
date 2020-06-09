exports.validateUploadPhotoProfile = async function(req, resp, next) {
    if (!req.files) {
        return resp.status(400).json({
            error: '100',
            mensaje: 'Debe seleccionar un archivo de imagen'
        });
    }
    //Validar que solo sea una imagen
    var archivo = req.files.imagen;
    var nombreCorto = archivo.name.split('.');
    var extension = nombreCorto[nombreCorto.length - 1];

    //Extensiones validas
    var imagenes = ['png', 'jpg', 'gif', 'jpeg','PNG', 'JPG', 'GIF', 'JPEG'];

    if (imagenes.indexOf(extension) < 0) {
        return resp.status(400).json({
            error: '100',
            mensaje: 'Extension no valida',
            descripcion: { message: "Las extensiones validas son: " + imagenes.join(', ') }
        });

    }
    next();

}