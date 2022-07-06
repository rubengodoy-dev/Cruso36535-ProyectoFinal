const fs = require("fs")
const { format } = require("path")
const Contenedor = require("./productos")

const dataProductos = new Contenedor("./data/productos.json")

class ContenedorCarrito {
    constructor(nombreArchivo) {
        this.nombre = nombreArchivo
    }


    async create(carrito) {
        const listaCarritos = await this.getAll()
        let id = 0

        if (listaCarritos.length > 0) {
            //obtener el ultimo Id          
            id = Math.max(...listaCarritos.map(c => c.id))
        }
        id++
        carrito.id = id
        listaCarritos.push(carrito)

        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(listaCarritos))
            return carrito.id
        } catch (err) {
            console.log(`Error al escribir el archivo: ${err}`)
        }

    }

    async updateProductos(id, listaIdsProductos) {
        let carrito = await this.getById(id)
        if (carrito === null) {
            return null
        }
        else {
            let listaCarritos = await this.getAll()
            let indice = listaCarritos.findIndex(c => c.id === carrito.id)

            for (const pId of listaIdsProductos) {
                console.log(`pId ${pId.id}`)
                let producto= await dataProductos.getById(pId.id)//TODO: buscar el producto
                listaCarritos[indice].productos.push(producto)
            }

            try {
                await fs.promises.writeFile(this.nombre, JSON.stringify(listaCarritos))
                return id
            } catch (err) {
                console.log(`Error al escribir el archivo: ${err}`)
            }
        }
    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.nombre, "utf-8")
            const listaCarritos = JSON.parse(contenido)
            return listaCarritos
        }
        catch (err) {
            console.log(`Error al leer el archivo: ${err}`)
        }


    }

    async getById(id) {
        const listaCarritos = await this.getAll()
        const carrito = listaCarritos.find(c => c.id == id)

        if (carrito === undefined) {
            return null
        }
        else {
            return carrito
        }

    }

    async delete(id) {
        let listaCarritos = await this.getAll()
        if (listaCarritos === null) {
            return null
        }
        else {
            listaCarritos = listaCarritos.filter(c => c.id != id)
            try {
                await fs.promises.writeFile(this.nombre, JSON.stringify(listaCarritos))
                return id
            } catch (err) {
                console.log(`Error al escribir el archivo: ${err}`)
            }

        }
    }

    async deleteProducto(id, productoId) {
        let carrito = await this.getById(id)
        if (carrito === null) {
            return null
        }
        else {
            let listaCarritos = await this.getAll()
            let indice = listaCarritos.findIndex(c => c.id === carrito.id)
            
            listaCarritos[indice].productos=listaCarritos[indice].productos.filter(p=>p.id!=productoId)
           

            try {
                await fs.promises.writeFile(this.nombre, JSON.stringify(listaCarritos))
                return id
            } catch (err) {
                console.log(`Error al escribir el archivo: ${err}`)
            }
        }
    }



}


module.exports = ContenedorCarrito