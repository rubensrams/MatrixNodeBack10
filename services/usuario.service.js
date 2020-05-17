const usurioHelper = require('./helpers/usuario.helper')
class UsuarioService {

    constructor({ UsuarioRepository }) {
        this._usuarioRepositorio = UsuarioRepository;
    }

    async getUsuarios() {
        return await this._usuarioRepositorio.getUsuarios();
    }

    async createUsuario(googleUser) {
        const usuarioDB = await this._usuarioRepositorio.getUsuarioEmail(googleUser.email);

        if (usuarioDB) {
            if (usuarioDB.google === 0) {
                throw new Error('El email de la cuenta ya está registrado en el sistema');
            } else {
                return usuarioDB;
            }
        } else {
            const nuevoUsrMatrizGoogle = usurioHelper.usuarioNuevoGoogle(googleUser);
            return await this._usuarioRepositorio.createUsuario(nuevoUsrMatrizGoogle);
        }

    }
}

module.exports = UsuarioService;