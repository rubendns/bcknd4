import fs from "fs";

class ManagerProduct {
  constructor(path) {
    this.path = path;
    try {
      let products = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
    } catch {
      this.products = [];
    }
  }

  async saveProduct(product) {
    if (!product) {
      return console.log("El producto está vacío");
    }

    const existsProduct = this.products.find((p) => p.id === product.id);

    if (existsProduct) {
      console.log("El producto ya existe");
      throw Error(`Product with id ${product.id} already exists`);
    }

    try {
      this.products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      throw Error("Hubo un error al crear el producto: " + error);
    }
  }

  async deleteProduct(id) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      console.log("El producto no existe");
      throw Error("El producto no existe");
    }

    const index = this.products.findIndex((p) => p.id === id);

    try {
      this.products.splice(index, 1);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Hubo un error al guardar los datos: ${error}`);
      return;
    }
  }

  getProducts() {
    return this.products;
  }
}
class Product {
  constructor(id, title, description, price, stock, status) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.price = price;
      this.stock = stock;
      this.status = status;
  }
}

export { ManagerProduct, Product };
