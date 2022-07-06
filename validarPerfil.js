const { response } = require('express')


const esAdmin = ( req, res = response, next ) => {
    console.log("esAdmin")
    console.log(ADMINISTRADOR)
    if (ADMINISTRADOR !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${req.originalUrl} método ${req.method} no autorizado`
        });
    }

    next();
}

module.exports = {
    esAdmin
}