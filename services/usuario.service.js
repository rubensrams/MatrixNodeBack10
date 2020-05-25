const usurioHelper = require('./helpers/usuario.helper')
class UsuarioService {

    constructor({ UsuarioRepository }) {
        this._usuarioRepositorio = UsuarioRepository;
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
            const nuevoUsrMatrix = usurioHelper.usuarioNuevoRedSocial(usuario, redsocial);
            return await this._usuarioRepositorio.createUsuario(nuevoUsrMatrix);
        }

    }
}

module.exports = UsuarioService;