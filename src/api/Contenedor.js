const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    async createIfNotExist() {
        let file;
        try {
            file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            return file;
        } catch (error) {
            if (error.code === "ENOENT") {
                //si no existe el archivo, lo crea con array vacío
                await fs.promises.writeFile(this.nombreArchivo, "[]");
                //se lee el archivo para retornarlo
                file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            } else {
                console.log(error);
            }
        }
        console.log(file);
        return file;
    }
    //1. métódo save: Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(object) {
        let id = 1;
        const file = await this.createIfNotExist();
        const parsedFile = JSON.parse(file);
        if (parsedFile.length > 0) {
            id = parsedFile[parsedFile.length - 1].id + 1;
        }
        object.id = id;
        parsedFile.push(object);
        try {
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(parsedFile, null, 2)
            );
            console.log(`Se guardó producto con id ${object.id}`);
            return object.id;
        } catch (error) {
            throw new Error(
                `Error en ${this.nombreArchivo} dentro de catch en método save, ${err}`
            );
        }
    }

    //2. método getById(): Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const data = await this.createIfNotExist();
            const product = JSON.parse(data);
            const productId = product.find((p) => p.id === id);
            if (productId) {
                console.log(`Se encontró el producto con id ${id}`);
                return productId;
            } else {
                console.log("no existe el producto con id: " + id);
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //3. getAll(): Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            const txt = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            return JSON.parse(txt);
        } catch (error) {
            throw new Error(
                `Error al leer archivo ${this.nombreArchivo} en catch método getAll, ${error}`
            );
        }
    }

    //4. deleteById(): Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try {
            const txt = await fs.promises.readFile(this.nombreArchivo, "utf-8");
            const parsedFile = JSON.parse(txt);
            const result = parsedFile.filter((p) => p.id !== id);
            await fs.promises.writeFile(
                this.nombreArchivo,
                JSON.stringify(result, null, 2)
            );
            console.log(`Se eliminó el producto con id ${id}`);
        } catch (error) {
            throw new Error(
                `Error al eliminar el producto con id ${id} en catch método deleteById, ${error}`
            );
        }
    }

    //5. deleteAll(): Elimina todos los objetos del archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, "[]");
            console.log("Se eliminaron todos los productos");
            return "[]";
        } catch (error) {
            throw new Error(
                `Error al eliminar todos los productos en catch método deleteAll, ${error}`
            );
        }
    }
}

const contenedor = new Contenedor("productos.txt");
module.exports = contenedor;