const usurioHelper = require('./helpers/usuario.helper');
const uploadMultiHelper = require('./helpers/uploadMulti.helper');
class UploadService {

    constructor({ UsuarioRepository, fs, path, GaleriaRepository }) {

        this._usuarioRepositorio = UsuarioRepository;
        this._galeriaRepository = GaleriaRepository
        this._fs = fs;
        this._path = path;
    }

    async subeFotoUsuario(id, archivo) {
        const usuarioDB = await this._usuarioRepositorio.getUsuarioId(id);
        if (!usuarioDB) {
            throw new Error('El usuario no está registrado en el sistema');
        }
        let nombreArchivo = usurioHelper.subeArchivoHelp(archivo, usuarioDB, id, this._fs);
        await this._usuarioRepositorio.subeFoto(id, nombreArchivo);
        return await this._usuarioRepositorio.getUsuarioId(id);
    }


    async getFotoUsuario(foto) {
        return usurioHelper.getArchivoHelp(foto, this._fs, this._path);
    }


    async guardaGaleriaAnuncio(archivos, id) {
        try {
            let galeriaNueva = uploadMultiHelper.getNewGaleria(id, archivos);
            return await this._galeriaRepository.creaGaleria(galeriaNueva);
        } catch (e) {
            throw new Error('Error al cargar la galeria en base de datos: ' + e);
        }
    }
}

module.exports = UploadService;