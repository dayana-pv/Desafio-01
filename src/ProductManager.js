//const fs = require("fs");
import fs from "fs";

export default class Product {
  constructor(path) {
    this.path = path;
  }

  getProduct = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      if (data.length > 0) {
        const dataObj = JSON.parse(data);
        return dataObj;
      }
    } else return [];
  };

  getNextID = async () => {
    const list = await this.getProduct();
    const count = list.length;

    return count > 0 ? list[count - 1].id + 1 : 1;
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: await this.getNextID(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const list = await this.getProduct();

    if (
      product.title === undefined ||
      product.description === undefined ||
      product.price === undefined ||
      product.thumbnail === undefined ||
      product.code === undefined ||
      product.stock === undefined
    ) {
      console.log("Falta ingresar campos en el producto");
    } else {
      const products = list.some((product) => product.code.includes(code));
      products
        ? console.log(`ERROR, el codigo es repetido`)
        : list.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(list));
    }
  };

  getProductById = async (id) => {
    const list = await this.getProduct();

    const productExist = list.some((product) => product.id === id);

    productExist
      ? console.log("Se encontro el producto")
      : console.log("No se encuentra el producto");

    console.log(list.filter((product) => product.id === id));
  };

  updateProduct = async (id, campo, valor) => {
    let resultado = true;
    const list = await this.getProduct();
    list.forEach((product) => {
      if (product.id === id) {
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
          case "stock":
            product.stock = valor;
            break;
          default:
            resultado = false;
            console.log(`El campo ${campo} no existe.`);
            break;
        }

        if (resultado) {
          console.log("Se realizo la actualizacion del producto: ");
        }

        console.log(product);
      }
    });
    await fs.promises.writeFile(this.path, JSON.stringify(list));
  };

  deleteProduct = async (id) => {
    const list = await this.getProduct();
    const products = list.some((product) => product.id === id);
    products
      ? console.log(`Se elimino el producto con id: ${id}`)
      : console.log(`No se encontro el producto`);

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(list.filter((item) => item.id !== id))
    );
  };
}

async function run() {
  const totalProducts = new Product("products.json");

  await totalProducts.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200
  );

  await totalProducts.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );

  await totalProducts.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );

  await totalProducts.addProduct(
    "producto",
    "Este es un producto prueba",
    500,
    "Sin imagen",
    "abc124",
    30
  );
  /*
  console.log("=============================");
  console.log("Productos:");
  console.log(await totalProducts.getProduct());

  console.log("=============================");
  await totalProducts.getProductById(2);

  console.log("=============================");
  await totalProducts.updateProduct(2, "price", 400);

  console.log("=============================");
  await totalProducts.deleteProduct(2);

  */
}

//run();
