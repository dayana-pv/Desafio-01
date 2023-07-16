import FileManager from "./file.manager.js";

export default class CartsManager extends FileManager {
  constructor() {
    super("./carts.json");
  }

  create = async () => {
    const data = {
      products: [],
    };

    return await this.addCart(data);
  };

  idCart = async (id) => {
    const result = await this.getProduct();
    const cartId = result.find((item) => item.id === id);
    return cartId;
  };

  addCarts = async (idc, data) => {
    const cart = await this.getById(idc);
    const idProduct = cart.products.find((item) => item.id === data.id);

    if (idProduct) {
      idProduct.quantity = idProduct.quantity + data.quantity;
    } else {
      cart.products.push(data);
    }

    return await this.updateProduct(idc, cart);
  };

  list = async () => {
    const result = await this.getProduct();
    return result;
  };
}
