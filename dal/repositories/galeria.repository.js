const { mtz_usuario, mtz_rol } = require('../models');
class UsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    async creaGaleria(dataGaleria) {
        const usr = await this._db.mtz_galeria.bulkCreate(dataGaleria);
        return usr;
    }

}

module.exports = UsuarioRepository;