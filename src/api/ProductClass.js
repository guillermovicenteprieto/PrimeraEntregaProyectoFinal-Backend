class ProductClass {
  constructor() {
    this.product = [];
    this.productId = 0;
    this.timestamp = Date.now();
  }

  get allProducts() {
    try {
      return this.product;
    } catch (error) {
      throw new Error("Se produjo un error en allProducts: " + error.message);
    }
  }

  getById(idProduct) {
    try {
      return this.product.find((product) => product.id === parseInt(idProduct));
    } catch (error) {
      throw new Error("Hubo un error en getById " + error.message);
    }
  }

  saveProduct(product, idProduct) {
    try {
      this.productId++;
      const addNewProduct = {
        // title: product.title,
        // price: product.price,
        // url: product.url,
        // id: this.productId,
        // timestamp: this.timestamp
        title: `product ${this.productId}`,
        price: this.productId * 10,
        url: 'https://via.placeholder.com/200',
        id: this.productId,
        timestamp: this.timestamp
      };
      this.product.push(addNewProduct);
      return addNewProduct;
    } catch (error) {
      throw new Error(
        "Se produjo un error al guardar el producto : " + error.message
      );
    }
  }

  updateProduct(idProduct, product) {
    try {
      const updateProduct = {
        title: `product ${idProduct}`,
        price: idProduct * 10,
        url: 'https://via.placeholder.com/200',
        id: idProduct,
        timestamp: this.timestamp
      };
      const findIndex = this.product.findIndex((product) => product.id === idProduct);
      this.product[findIndex] = updateProduct;
      return updateProduct;
    } catch (error) {
      throw new Error(
        "Se produjo un error al actualizar el producto : " + error.message
      );
    }
  }

//return this.product.find((product) => product.id == parseInt(idProduct));

  deleteProduct(idProduct) {
    try {
      this.product = this.product.filter((product) => product.id !== idProduct);
    } catch (error) {
      throw new Error("Hubo un error al eliminar " + error.message);
    }
  }

  deleteAllProducts() {
    try {
      this.product = [];
    } catch (error) {
      throw new Error("Hubo un error al eliminar todos los productos " + error.message);
    }
  }

}

module.exports = ProductClass;
