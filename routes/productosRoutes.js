const express = require("express")
const { Router } = express
const router = Router()

const Contenedor = require("../data/productos")
const { esAdmin } = require("../validarPerfil")

const data = new Contenedor("./data/productos.json")


//devuelve un producto según su id.
//Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
router.get('/:id?', async (req, res) => {

    if (req.params.id) {
        let id = req.params.id
        let producto = await data.getById(id)

        if (producto != null) {
            res.status(200).json(producto)
        } else {
            res.status(400).json({ error: 'producto no encontrado' })

        }
    } else {
        //devuelve todos los productos
        let productos = await data.getAll()
        res.status(200).json(productos)
    }

});

//recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/',esAdmin, async (req, res) => {
    let mensaje = req.body
    let id = await data.create(mensaje)

    if (id != null) {
        res.status(201).json({id})
    }
});
//recibe y actualiza un producto según su id.
router.put('/:id',esAdmin, async (req, res) => {
    let id = req.params.id
    let mensaje = req.body
    let producto = await data.update(id, mensaje)

    if (producto != null) {
        res.status(200).json(producto.id)
    } else {
        res.status(400).json({ error: 'producto no encontrado' })

    }
});


//elimina un producto según su id.
router.delete('/:id',esAdmin, async (req, res) => {  
    let id = req.params.id
    let idBorrado = await data.delete(id)
    if (idBorrado != null) {
        res.status(200).json({ idBorrado })
    } else {
        res.status(400).json({ error: 'producto no encontrado' })
    }
});



module.exports = router;


