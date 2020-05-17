const { mtz_usuario, mtz_rol } = require('../models');
class UsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    getUsuarios() {
        return this._db.mtz_usuario.findAll({
            include: {
                model: mtz_rol,
                as: 'roles',
                through: {
                    attributes: []
                }
            }
        });
    }

    async getUsuarioEmail(email) {
        const usuario = await mtz_usuario.findOne({
            where: { email: email },
            include: {
                model: mtz_rol,
                as: 'roles',
                through: {
                    attributes: []
                }
            }
        });
        return usuario;
    }

    async createUsuario(body) {
        const usr = await this._db.mtz_usuario.create(body);
        await usr.setRoles([2]);
        const usuario = await mtz_usuario.findOne({
            where: { email: usr.email },
            include: {
                model: mtz_rol,
                as: 'roles',
                through: {
                    attributes: []
                }
            }
        });
        return usuario;
    }
}

module.exports = UsuarioRepository;