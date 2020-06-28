const { mtz_anuncio } = require('../models');
class AnuncioRepository {

    constructor({ db }) {
        this._db = db;
    }

    async getAnuncioId(id) {
        const anuncio = await mtz_anuncio.findOne({
            attributes: [
                'id',
                'titulo',
                'fecha',
                'activo',
                'precio',
                'preview',
                'descripcion',
                'id_usuario',
                'id_estado',
                'id_categoria'
            ],
            where: { id: id }
        });
        return anuncio;
    }

    async subePreview(id, preview) {
        const anuncio = await mtz_anuncio.update({ preview: preview }, {
            where: {
                id: id
            }
        })
        return anuncio;
    }
}

module.exports = AnuncioRepository;