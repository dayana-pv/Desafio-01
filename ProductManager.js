class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  getNextID = () => {
    const count = this.products.length;

    if (count > 0) {
      return this.products[count - 1].id + 1;
    } else {
      return 1;
    }
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: this.getNextID(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (product.id >= 2 && product.code.includes("abc123")) {
      console.log("ERROR, Codigo repetido");
    } else {
      this.products.push(product);
    }
  };

  getProductById = (id) => {
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].id == id) {
        let resultado = true;
      }
    }
    if (resultado) {
      console.log("ingresa al if");
      console.log(this.products[index]);
    } else {
      console.log("No se encuentra el producto");
    }
  };
}

const product09 = new ProductManager();

product09.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

product09.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);

product09.getProductById(2);
