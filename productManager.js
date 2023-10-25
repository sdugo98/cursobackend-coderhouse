import { promises as fs } from "fs";

class ProductManager {
    constructor() {
        this.patch = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, codigo, stock) => {
        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            thumbnail,
            codigo,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products));
    };


    // Metodo reutilizable lectura productos para aplicar en diferentes lugares.
    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)) {
            console.log("Producto no encontrado.")
        } else {
            console.log(respuesta3.find((product)=>product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts();
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log(`El producto con el id ${id} ha sido eliminado.`)
    }

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProductsById(id)
        let productOld = await this.readProducts()
        let productsModified = [{ ...producto, id }, ...productOld];
        await fs.writeFile(this.patch, JSON.stringify(productsModified));
    }
};

const productos = new ProductManager();

/*productos.addProduct("title1", "desciption1", 13, "imagen", "abc23", 5);
productos.addProduct("title2", "desciption1", 13, "imagen", "abc23", 5);
productos.addProduct("title3", "desciption1", 13, "imagen", "abc23", 5);*/

//productos.getProductsById(4)

productos.updateProducts({
    title: "Titulo3",
    description: "Description3",
    price :8000,
    imagen:  "ImagenNueva3",
    code:"newcode975",
    stock: 15,
    id: 3,
});