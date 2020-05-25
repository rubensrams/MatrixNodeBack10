const { mtz_usuario, mtz_rol } = require('../models');
class UsuarioRepository {

    constructor({ db }) {
        this._db = db;
    }

    getUsuarios() {
        return this._db.mtz_usuario.findAll({
            attributes: [
                ['usuario', 'username'],
            ],
            include: {
                model: mtz_rol,
                as: 'authorities',
                through: {
                    attributes: []
                }
            }
        });
    }

    async getUsuarioEmail(email) {
        const usuario = await mtz_usuario.findOne({
            attributes: [
                'id', ['usuario', 'user_name'],
                'nombre',
                'activo',
                'email',
                'foto',
                'social'
            ],
            where: { email: email },
            include: {
                model: mtz_rol,
                as: 'authorities',
                through: {
                    attributes: []
                }
            }
        });
        return usuario;
    }

    async createUsuario(body) {
        const usr = await this._db.mtz_usuario.create(body);
        await usr.setAuthorities([2]);
        const usuario = await mtz_usuario.findOne({
            attributes: [
                'id', ['usuario', 'user_name'],
                'nombre',
                'activo',
                'email',
                'foto',
                'social'
            ],
            where: { email: usr.email },
            include: {
                model: mtz_rol,
                as: 'authorities',
                through: {
                    attributes: []
                }
            }
        });
        return usuario;
    }
}

module.exports = UsuarioRepository;