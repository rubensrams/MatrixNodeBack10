var CLIENT_ID = require('../../services/config/config').CLIENT_ID;
//Importaciones para google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);




async function verifyTokenGoogle(token) {
    //asi se recibe el token
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        payload: payload,
        google: true,
    }

}

exports.verifyTokenGoogleRes = async function(req, resp, next) {
    //asi se recibe el token
    var token = req.body.token;

    //Para usar el await es necesario que la funcion sea async
    var googleUser = await verifyTokenGoogle(token)
        .catch(e => {
            return resp.status(500).send({
                error: '100',
                mensaje: 'Token invalido',
                descripcion: "" + e
            });
        });

    if (googleUser === undefined) {
        return resp.status(400).send({
            error: '100',
            mensaje: 'USuario de google indefinido'
        });
    }
    console.log('Token de google valido');
    req.body.emailgoogle = googleUser;
    next();

}