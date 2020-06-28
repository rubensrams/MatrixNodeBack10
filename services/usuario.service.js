const usurioHelper = require('./helpers/usuario.helper')
class UsuarioService {

    constructor({ UsuarioRepository, bcrypt, querystring, http }) {
        this._usuarioRepositorio = UsuarioRepository;
        this._bcrypt = bcrypt;
        this._querystring = querystring;
        this._http = http;
    }

    async getUsuarios() {
        return await this._usuarioRepositorio.getUsuarios();
    }

    async createUsuario(usuario, redsocial) {
        const usuarioDB = await this._usuarioRepositorio.getUsuarioEmail(usuario.email);

        if (usuarioDB) {
            if (redsocial === usuarioDB.social) {
                return usuarioDB;
            } else {
                throw new Error('El email de la cuenta ya está registrado en el sistema');
            }
        } else {
            usuario.img = usurioHelper.omiteCaracter(usuario.img, redsocial).foto;
            const nuevoUsrMatrix = usurioHelper.usuarioNuevoRedSocial(usuario, redsocial, this._bcrypt);
            return await this._usuarioRepositorio.createUsuario(nuevoUsrMatrix);;
        }

    }

    async getToken(user, password) {
        console.log(user)
        console.log(password)
        let userCredencials = usurioHelper.getUserData(user, password, this._querystring);
        let options = usurioHelper.getOptions(userCredencials);

        return new Promise((resolve, reject) => {

            var req = this._http.request(options, (res) => {
                res.on('data', (d) => {
                    process.stdout.write(d);
                    resolve(d);

                });
            });
            req.on('error', (e) => {
                console.error(e);
                reject(e);
            });

            req.on('end', () => {
                console.log('Entro');

            });
            req.write(userCredencials);
            req.end();

        });


    }

}


module.exports = UsuarioService;