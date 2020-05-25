var SEED = require('../../services/config/config').SEED;
class UsuarioController {

    constructor({ UsuarioService, jwt }) {

        this._usuarioSerice = UsuarioService;
        this._jwt = jwt;

    }

    async getUsuarios(req, resp) {

        let usuarios = await this._usuarioSerice.getUsuarios();
        try {
            return resp.send({
                error: '00',
                mensaje: 'Resultado exitoso',
                usuarios: usuarios
            });
        } catch (e) {
            return resp.status(500).send({
                error: true,
                mensaje: 'Ocurrio un error ' + e
            });
        }
    }


    async createUsuario(req, resp) {
        var usrGoogle = req.body.emailgoogle;
        try {
            const create = await this._usuarioSerice.createUsuario(usrGoogle, 'GOOGLE');
            var token = this._jwt.sign({ usuario: create }, SEED, { expiresIn: 500 })
            return resp.status(200).send({
                usuario: create,
                token: token
            });
        } catch (e) {
            return resp.status(500).send({
                error: "100",
                error_description: e.message
            });
        }
    }

    async createUsuarioFB(req, resp) {
        var usrFacebook = {
            nombre: req.body.nombre,
            img: req.body.img,
            email: req.body.email
        }
        try {
            const create = await this._usuarioSerice.createUsuario(usrFacebook, 'FACEBOOK');
            var token = this._jwt.sign({ usuario: create }, SEED, { expiresIn: 500 })
            return resp.status(200).send({
                usuario: create,
                token: token
            });
        } catch (e) {
            return resp.status(500).send({
                error: "100",
                error_description: e.message
            });
        }
    }
}

module.exports = UsuarioController;