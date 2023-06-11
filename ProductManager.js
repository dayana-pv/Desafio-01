const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  /*
  read = () => {
    if (fs.existsSync(this.path)) {
      console.log("Ingreso aqui");
      return fs.promises
        .readFile(this.path, "utf-8")
        .then((r) => JSON.parse(r));
    } else return [];
  };
  */

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

    if (
      product.title == undefined ||
      product.description == undefined ||
      product.price == undefined ||
      product.thumbnail == undefined ||
      product.code == undefined ||
      product.stock == undefined
    ) {
      console.log("Falta ingresar campos en el producto");
    } else {
      let resultado = 0;
      this.products.forEach((element) => {
        if (product.code.includes(element.code)) {
          resultado += 1;
          console.log("ERROR, Codigo repetido");
        }
      });

      if (resultado < 1) {
        this.products.push(product);
      }
    }
  };

  getProductById = (id) => {
    let resultado = 0;

    this.products.forEach((product) => {
      if (product.id == id) {
        resultado += 1;
        console.log("Se encontro el producto: ");
        console.log(product);
      }
    });

    if (resultado < 1) {
      console.log("No se encuentra el producto");
    }
  };

  updateProduct = (id, campo, valor) => {
    this.products.forEach((product) => {
      if (product.id == id) {
        switch (campo) {
          case "title":
            product.title = valor;
            break;
          case "description":
            product.description = valor;
            break;
          case "price":
            product.price = valor;
            break;
          case "thumbnail":
            product.thumbnail = valor;
            break;
          case "code":
            product.code = valor;
            break;
          case "stock":
            product.stock = valor;
            break;
          default:
            console.log(`El campo ${campo} no existe.`);
        }
        console.log(product);
      }
    });
  };

  deleteProduct = (id) => {
    if (product.id == id) {
      this.product = this.product.filter((item) => item !== id);
    }
    console.log(product);
  };
}

const totalProducts = new ProductManager();

/*
totalProducts.addProduct("producto prueba", "Este es un producto prueba", 200);

totalProducts.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
*/
totalProducts.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

totalProducts.addProduct(
  "producto",
  "Este es un producto prueba",
  500,
  "Sin imagen",
  "abc124",
  30
);

//console.log("=============================");
//totalProducts.getProductById(1);

//totalProducts.updateProduct(2, "price", 400);

totalProducts.deleteProduct(2);
//const totalProducts = new ProductManager("db.json");
