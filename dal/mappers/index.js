module.exports = {
    toDbEntity(user) {
        const { id, usuario, password, nombre, activo, email, foto, google } = user;
        return { id, password, usuario, nombre, activo, email, foto, google };
    }

};