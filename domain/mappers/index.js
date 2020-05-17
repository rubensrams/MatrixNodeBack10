const UsuarioDomain = require("../usuario.domain");

module.exports = {

    toDomainEntity(user) {
        const { id, usuario, password, nombre, activo, email, foto, google } = user;
        return new UsuarioDomain({ id, password, usuario, nombre, activo, email, foto, google });
    }

};