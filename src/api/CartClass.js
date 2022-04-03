const fs = require("fs");
const moment = require('moment')

class CartClass {
    constructor() {
        this.path = "./src/api/carrito.txt"
        this.timestamp = Date.now()
        this.date = moment().format('LLLL')
        this.name = "";
        this.description = "";
        this.code = "";
        this.img = "";
        this.price = 0;
        this.stock = 0;
    }

    async cartList() {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8");
            if (data) {
                this.product = JSON.parse(data);
                return this.product;
            } else {
                return [{ message: "No hay productos en el Carrito" }];
            }
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.promises.writeFile(this.path, JSON.stringify([]));
                return [{ message: "Aún no hay productos en el Carrito" }];
            }
            throw new Error(
                "Se produjo un error en cartList: " + error.message
            );
        }
    }

    async addtoCart(product) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8");
            if (data) {
                this.cart = JSON.parse(data);
                product = {
                    id: this.cart.length + 1,
                    timestamp: this.timestamp,
                    date: this.date,
                    name: this.name,
                    description: this.description,
                    code: this.code,
                    img: this.img,
                    price: this.price,
                    stock: this.stock,
                }
                this.cart.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(this.cart));
                return product;
            } else {
                this.product = [{
                    id: 1,
                    timestamp: this.timestamp,
                    date: this.date,
                    ...product,
                }]
                await fs.promises.writeFile(this.path, JSON.stringify(this.product));
                return product.CartClass;
            }
        } catch (error) {
            throw new Error(
                "Se produjo un error en save!: " + error.message
            );
        }
    }

    async deleteCart(id) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8");
            if (data) {
                let cart = JSON.parse(data);
                let deletedProduct = cart.find(product => product.id == id);
                cart = cart.filter(product => product.id != id);
                await fs.promises.writeFile(this.path, JSON.stringify(cart));
                return { message: "Producto borrado" };
            } else {
                return [{ message: "No hay productos en el Carrito" }];
            }
        } catch (error) {
            throw new Error(
                "Se produjo un error en deleteCart!: " + error.message
            );
        }
    }

    async getProducts(id) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8");
            if (data) {
                let cart = JSON.parse(data);
                let product = cart.find(product => product.id == id);
                return product;
            } else {
                return [{ message: "No hay productos en el Carrito" }];
            }
        } catch (error) {
            throw new Error(
                "Se produjo un error en getProducts!: " + error.message
            );
        }
    }

    async deleteProduct(id, id_prod) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8");
            if (data) {
                let cart = JSON.parse(data);
                let product = cart.find(product => product.id == id);
                let deletedProduct = product.products.find(product => product.id == id_prod);
                product.products = product.products.filter(product => product.id != id_prod);
                await fs.promises.writeFile(this.path, JSON.stringify(cart));
                return { message: "Producto borrado" };
            } else {
                return [{ message: "No hay productos en el Carrito" }];
            }
        } catch (error) {
            throw new Error(
                "Se produjo un error en deleteProduct!: " + error.message
            );
        }
    }

}

module.exports = CartClass;