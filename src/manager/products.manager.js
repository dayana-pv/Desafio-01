import FileManager from "./file.manager.js";

export default class ProductsManager extends FileManager {
  constructor() {
    super("./products.json");
  }

  create = async (data) => {
    const result = await this.addProduct(data);
    return result;
  };

  idProduct = async (id) => {
    const result = await this.getProduct();
    const productId = result.find((item) => item.id === id);
    return productId;
  };

  list = async () => {
    const result = await this.getProduct();
    return result;
  };

  update = async (id, data) => {
    const result = await this.updateProduct(id, data);
    return result;
  };
}
