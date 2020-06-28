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

            const usuario = await this._usuarioSerice.createUsuario(usrGoogle, 'GOOGLE');
            //  console.log(usuario)
            let token = await this._usuarioSerice.getToken(usrGoogle.email, 'GOOGLE');
            var jsonObject = JSON.parse(token);
            //console.log(jsonObject);
            // let jsonObject = JSON.parse(create);
            //Para efectos el token en ves de hacerlo en node se usa la api de spring
            //var token = this._jwt.sign({ usuario: create }, SEED, { expiresIn: 500 })
            return resp.send(jsonObject);
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
            const usuario = await this._usuarioSerice.createUsuario(usrFacebook, 'FACEBOOK');
            let token = await this._usuarioSerice.getToken(usrFacebook.email, 'FACEBOOK');
            let jsonObject = JSON.parse(token);
            //console.log(jsonObject);
            //var token = this._jwt.sign({ usuario: create }, SEED, { expiresIn: 500 })
            return resp.send(jsonObject);
        } catch (e) {
            return resp.status(500).send({
                error: "100",
                error_description: e.message
            });
        }
    }
}

module.exports = UsuarioController;