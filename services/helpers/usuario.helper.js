module.exports = {
    usuarioNuevoRedSocial: function(usuarioRedSocial, redsocial) {
        return {
            "usuario": usuarioRedSocial.email,
            "password": 'xxxxx',
            "nombre": usuarioRedSocial.nombre,
            "activo": 1,
            "email": usuarioRedSocial.email,
            "foto": usuarioRedSocial.img,
            "social": redsocial
        }
    },

    omiteCaracter: function(foto, redsocial) {
        if (redsocial === 'FACEBOOK') {
            var parameter_Start_index = foto.indexOf('?');
            var foto = foto.substring(0, parameter_Start_index);
        }
        return {
            foto
        }
    },
}