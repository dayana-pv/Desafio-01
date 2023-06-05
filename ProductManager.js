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
}

const totalProducts = new ProductManager();

totalProducts.addProduct("producto prueba", "Este es un producto prueba", 200);

totalProducts.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

totalProducts.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

console.log("=============================");
totalProducts.getProductById(1);
