const express = require("express")
const { Router } = express
const router = Router()

const ContenedorCarrito = require("../data/carrito")
const data = new ContenedorCarrito("./data/carrito.json")


router.get('/:id/productos', async (req, res) => {
    let id = req.params.id
    let carritoBuscado = await data.getById(id)
    console.log(carritoBuscado)
    res.status(200).json(carritoBuscado.productos)
})


router.post('/', async (req, res) => {
    let id = await data.create({ id: 0, timestamp: Date.now(), productos: [] })

    if (id != null) {
        res.status(201).json({ id })
    }
});

router.post('/:id/productos', async (req, res) => {
    let id = req.params.id
    let mensaje = req.body
    console.log("post");
    console.log(mensaje);
    await data.updateProductos(id, mensaje)

    res.status(200).json(id)
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let idBorrado = await data.delete(id)

    if (idBorrado != null) {
        res.status(200).json({ idBorrado })
    } else {
        res.status(400).json({ error: 'carrito no encontrado' })
    }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
    let id = req.params.id
    let id_prod = req.params.id_prod
    let idBorrado = await data.deleteProducto(id,id_prod)

    if (idBorrado != null) {
        res.status(200).json({ idBorrado })
    } else {
        res.status(400).json({ error: 'carrito o producto no encontrado' })
    }
});

module.exports = router;

