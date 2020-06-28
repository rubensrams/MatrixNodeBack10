const usurioHelper = require('./helpers/usuario.helper');
const anuncioHelper = require('./helpers/anuncio.helper');
const uploadMultiHelper = require('./helpers/uploadMulti.helper');
class UploadService {

    constructor({ UsuarioRepository, fs, path, GaleriaRepository, AnuncioRepository }) {

        this._usuarioRepositorio = UsuarioRepository;
        this._galeriaRepository = GaleriaRepository;
        this._anuncioRepository = AnuncioRepository
        this._fs = fs;
        this._path = path;
    }

    async subeFotoUsuario(id, archivo) {
        const anuncioDB = await this._usuarioRepositorio.getAnuncioId(id);
        if (!anuncioDB) {
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

    async getFotoUsuario(foto) {
        return usurioHelper.getArchivoHelp(foto, this._fs, this._path);
    }

    async getFotoPreviewAnuncio(foto) {
        return anuncioHelper.getArchivoPreviewAnuHelp(foto, this._fs, this._path);
    }

    async getArchivoGaleria(foto) {
        return anuncioHelper.getArchivoGaleriaAnuHelp(foto, this._fs, this._path);
    }

    async guardaPreviewAnuncio(archivo, id) {
        try {
            const anuncioDB = await this._anuncioRepository.getAnuncioId(id);
            if (!anuncioDB) {
                throw new Error('El anuncio no está registrado en el sistema');
            }
            console.log(archivo);
            await this._anuncioRepository.subePreview(id, archivo.filename);
        } catch (e) {
            throw new Error(e);
        }
    }

}

module.exports = UploadService;