import fs from "fs";

class FileManager {
  constructor(filename) {
    this.filename = filename;
  }

  getNextId = (list) => {
    return list.length == 0 ? 1 : list[list.length - 1].id + 1;
  };

  getProduct = async () => {
    if (fs.existsSync(this.filename)) {
      const data = await fs.promises.readFile(this.filename, "utf-8");
      if (data.length > 0) {
        const dataObj = JSON.parse(data);
        return dataObj;
      }
    } else return [];
  };

  addProduct = async (data) => {
    const list = await this.getProduct();

    data.status = true;
    data.id = this.getNextId(list);

    if (
      data.title === undefined ||
      data.description === undefined ||
      data.code === undefined ||
      data.price === undefined ||
      data.stock === undefined ||
      data.category === undefined
    ) {
      console.log("Falta ingresar campos en el producto");
    } else {
      const products = list.some((d) => d.code.includes(data.code));
      products ? console.log("ERROR, el codigo es repetido") : list.push(data);
      await fs.promises.writeFile(this.filename, JSON.stringify(list));
    }
  };

  updateProduct = async (id, data) => {
    const list = await this.getProduct();
    const productIdx = list.findIndex((u) => u.id === id);

    console.log(list);
    list[productIdx] = data;
    await fs.promises.writeFile(this.filename, JSON.stringify(list));
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

export default FileManager;
