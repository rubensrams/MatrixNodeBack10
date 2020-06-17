module.exports = {
    getNewGaleria: function(id, archivos) {
        var reformattedArray = archivos.map(obj => {
            var galeriaFin = {};
            galeriaFin['nombre'] = obj.filename;
            galeriaFin['id_anuncio'] = id;
            return galeriaFin;
        });
        return reformattedArray;

    }
}