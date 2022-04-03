const fs = require("fs");
const moment = require("moment");
moment.locale("es");

class ProductClass {
  constructor() {
    this.path = "./src/api/productos.txt";
    //this.product = [];
    this.productId = 0;
    this.timestamp = Date.now();
    this.date = moment().format("LLLL");
    this.name = "";
    this.description = "";
    this.code = "";
    this.img = "";
    this.price = 0;
    this.stock = 0;
  }

  //traigo todos los productos
  async getAll() {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        return this.product;
      } else {
        return [{ message: "No hay productos", }];
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.promises.writeFile(this.path, JSON.stringify([]));
        return [{ message: "Aún no hay productos en la base de datos" }];
      } 
      throw new Error(
        "Se produjo un error en getAllProducts: " + error.message
      );
    }
  }
  //agrego un producto
  async save(addedProduct) {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        this.productId = this.product.length;
      }
      const newProduct = {
        id: this.productId + 1,
        timestamp: this.timestamp,
        date: this.date, 
        name: this.name,
        description: this.description,
        code: this.code,
        img: this.img,
        price: this.price,
        stock: this.stock,
      };
      this.product.push(newProduct);
      fs.promises.writeFile(this.path, JSON.stringify(this.product, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error("Se produjo un error en save: " + error.message);
    }
  }
  //obtengo por id
  async getById(id) {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        let product = this.product.find((product) => product.id == id);
        return product;
      } else {
        return [{ message: "No hay productos con id: " + id, }];
      }
    } catch (error) {
      throw new Error("Se produjo un error en getById: " + error.message);
    }
  }
  //actualizo un producto
  async update(id, product) {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        let products = JSON.parse(data);
        let index = products.findIndex((product) => product.id == id);
        let updatedProduct = {
          id: products[index].id,
          timestamp: products[index].timestamp,
          date: products[index].date,
          name: products[index].name,
          description: products[index].description,
          code: products[index].code,
          img: products[index].img,
          price: products[index].price,
          stock: products[index].stock,
          ...product,
        };
        products[index] = updatedProduct;
        fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return updatedProduct;
      } else {
        return [{ message: "No hay productos con id: " + id }];
      }
    } catch (error) {
      throw new Error("Se produjo un error en update: " + error.message);
    }
  }
  //borro un producto
  async delete(id) {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        let index = this.product.findIndex(
          (product) => product.id == id
        );
        if (index != -1) {
          this.product.splice(index, 1);
          fs.promises.writeFile(
            this.path,
            JSON.stringify(this.product, null, 2)
          );
          return { message: "Producto borrado" };
        } else {
          return [{ message: "No hay productos con id: " + id, }];
        }
      } else {
        return [{ message: "No hay productos" }];
      }
    } catch (error) {
      throw new Error("Se produjo un error en delete: " + error.message);
    }
  }
  //borro todos los productos
  async deleteAll() {
    try {
      let data = await fs.promises.readFile(this.path, "utf-8");
      if (data) {
        this.product = JSON.parse(data);
        this.product = [];
        fs.promises.writeFile(this.path, JSON.stringify(this.product, null, 2));
        return { message: "Productos borrados" };
      } else {
        return [{ message: "No hay productos", }];
      }
    } catch (error) {
      throw new Error("Se produjo un error en deleteAll: " + error.message);
    }
  }
}

module.exports = ProductClass;



