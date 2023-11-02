import express from "express";
import ProductManager from "./components/productManager.js";

//Creando Server Express
const app = express();
app.use(express.urlencoded({ extended: true }));

//Creamos Manero de Archvos por FileSystem
const productos = new ProductManager();
const books = productos.readProducts();

//Ruta a productos y Query Limit
app.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await books);
    let allBooks = await books;
    let bookFilter = allBooks.slice(0, limit);
    res.send(bookFilter);
  } catch (error) {
    console.log(error);
  }
});
app.get("/products/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let allBooks = await books;
    let bookById = allBooks.find((book) => book.id === id);
    if (!bookById)
      return res.send({ error: "El Producto solicitado no existe" });
    res.send(bookById);
  } catch (error) {
    console.log(error);
  }
});

//Creando Servidor 8080
const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`Express por local host ${server.address().port}`)
);
server.on("error", (error) => console.log(`Error en servidor ${error}`));
