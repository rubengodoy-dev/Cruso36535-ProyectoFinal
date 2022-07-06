const express= require("express")
const app= express()
const port = 8080
//Variable administrador definida temporamente
global.ADMINISTRADOR = true;

const productosRouter= require("./routes/productosRoutes")
const carritoRouter= require("./routes/carritoRoutes")
const path = require('path')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


app.use("/api/productos",productosRouter)
app.use("/api/carrito",carritoRouter)

app.use(function(req, res, next) {
    res.status(404);
    res.json({error:-2,descripcion:`ruta ${req.originalUrl} metodo ${req.method} no implementado` });
    next();
   });

const server = app.listen( process.env.PORT || 8080, () => {
    console.log(`conectado http escuchando en ${server.address().port}`);
})

server.on("error", error => console.error(`Error en servidor  ${error}`))