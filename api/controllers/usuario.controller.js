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
        //Este email se obtiene del midleware de la revision del token de google
        var usrGoogle = req.body.emailgoogle;
        try {
            const create = await this._usuarioSerice.createUsuario(usrGoogle);
            var token = this._jwt.sign({ usuario: create }, SEED, { expiresIn: 500 })
            return resp.status(200).send({
                error: '00',
                mensaje: 'Resultado exitoso',
                usuario: create,
                token: token
            });
        } catch (e) {
            return resp.status(500).send({
                error: "100",
                mensaje: e.message
            });
        }
    }
}

module.exports = UsuarioController;