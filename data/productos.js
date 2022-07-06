const fs = require("fs")
const { format } = require("path")

class Contenedor {
    constructor(nombreArchivo) {
        this.nombre = nombreArchivo

    }

    async create(obje) {
        const lista = await this.getAll()
        let id = 0

        if (lista.length > 0) {
            //obtener el ultimo Id          
            id = Math.max(...lista.map(p => p.id))
        }
        id++
        obje.id = id
        obje.timestamp = Date.now()
        lista.push(obje)

        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify(lista))
            return obje.id
        } catch (err) {
            console.log(`Error al escribir el archivo: ${err}`)
        }
    }

    async update(id, obje) {
        const producto = await this.getById(id)

        if (producto === null) {
            return null
        }
        else {
            const lista = await this.getAll()
            let indice = lista.findIndex(p => p.id === producto.id)
            obje.id = id
            obje.timestamp = Date.now()
            lista[indice] = obje

            try {
                await fs.promises.writeFile(this.nombre, JSON.stringify(lista))
                return obje
            } catch (err) {
                console.log(`Error al escribir el archivo: ${err}`)
            }

       
        }

    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.nombre, "utf-8")
            const lista = JSON.parse(contenido)
            return lista
        }
        catch (err) {
            console.log(`Error al leer el archivo: ${err}`)
        }


    }

    async getById(id) {
        const lista = await this.getAll()
        const producto = lista.find(p => p.id == id)

        if (producto === undefined) {
            return null
        }
        else {
            return producto
        }

    }

    async delete(id) {
        let lista = await this.getAll()
        if (lista === null) {
            return null
        }
        else {
            lista = lista.filter(p => p.id != id)
            try {
                await fs.promises.writeFile(this.nombre, JSON.stringify(lista))
                return id
            } catch (err) {
                console.log(`Error al escribir el archivo: ${err}`)
            }

        }
    }

}


module.exports = Contenedor