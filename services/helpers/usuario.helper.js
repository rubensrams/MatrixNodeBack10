module.exports = {
    usuarioNuevoGoogle: function(googleUser) {
        return {
            "usuario": googleUser.email,
            "password": 'xxxxx',
            "nombre": googleUser.nombre,
            "activo": 1,
            "email": googleUser.email,
            "foto": googleUser.img,
            "google": 1
        }
    },
}