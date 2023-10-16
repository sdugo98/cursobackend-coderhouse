class ProductManager{
    constructor(){
        this.products = [];
    }

    static id = 0;

    // Metodo para agregar un producto al array "products", cada vez que se agregue un nuevo producto, el id aumentara en 1.
    addProduct(title,description,price,thumbnail,code,stock){
        for(let i=0; i<this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`The code ${code} already exists.`)
                break;
            }
        };

        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        // Metodo para que los campos del producto nuevo no esten incompletos.
        if(!Object.values(newProduct).includes(undefined)){
        ProductManager.id++
        this.products.push({
            ...newProduct,
            id:ProductManager.id,
        });
    } else {
        console.log("Product fields can't be incomplete.")
        } 
    }

    // Metodo para retornar los productos del array "products".
    getProduct(){
        return this.products;
    }

    // Metodo para consultar si un producto existe pasando como parametro el id.
    productExist(id){
        return this.products.find((producto)=> producto.id === id)
    }

    //Metodo para retornar un producto por id si es que existe, sino retorna un mensaje de error.
    getProductById(id){
        !this.productExist(id) ? console.log(`The product with the id ${id} doesn't exist.`) : console.log(this.productExist(id));  
    }
}

const productos = new ProductManager

// Verificar que se inicialice con un array vacio.
console.log(productos.getProduct());

// Agregar un producto satisfactoriamente y verificar el autoincremento del id.
productos.addProduct("Producto Prueba","Este es un producto prueba",200,"sin imagen","abc123",25);

// Agregar un segundo producto y verificar el autoincremento del id.

productos.addProduct("Producto Prueba2","Este es un producto prueba2",300,"sin imagen2","abc124",30);

console.log(productos.getProduct());

// Verificar manejo de error si es que el "CODE" se repite.

productos.addProduct("Producto Prueba2","Este es un producto prueba2",300,"sin imagen2","abc124",30);

console.log(productos.getProduct());


// Devolver el producto existente.
console.log(productos.getProductById(2));

// Manejo de error por si producto solicitado no existe.
console.log(productos.getProductById(4));