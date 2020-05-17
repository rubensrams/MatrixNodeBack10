const { attributes } = require("structure");

const Usuario = attributes({

    id: {
        type: Number,
        required: true

    },
    usuario: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    nombre: {
        type: String,
        required: true

    },
    activo: {
        type: Number,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    foto: {
        type: String,
        required: true
    },
    google: {
        type: Number,
        required: true
    }

})(class Usuario {

    getNombreCompleto() {

        return this.nombre
    }
});

module.exports = Usuario;