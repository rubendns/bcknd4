import express from "express";
import expressHandlebars from "express-handlebars";
import postRouter from "./routes/product.routes.js";
import { logger } from "./utils/logger.js";
import { Server } from "socket.io";
import { __dirname } from "./dirname.js";
import path from "path";
import viewsRouter from "./routes/views.routes.js";
import { ManagerProduct, Product } from "./manager/ManagerProduct.js";

const app = express();
const httpServer = app.listen(8080, () =>
  console.log("Server listening on port 8080 - Go to http://localhost:8080/")
);

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebars = expressHandlebars.create({
  extname: ".hbs",
  defaultLayout: "main",
  layoutsDir: `${__dirname}/views/layouts`,
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(logger);

// Rutas
app.use("/api", postRouter);
app.use("/", viewsRouter);

const manager = new ManagerProduct(path.join(__dirname, "../data/product.json"));

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("product_send", async (data) => {
    console.log(data);
    try {
      const product = new Product(
        Number(data.id),
        data.title,
        data.description,
        data.price,
        data.stock,
        data.status
      );
      await manager.saveProduct(product);
      io.emit("products", manager.getProducts());
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("delete_product", async (productId) => {
    try {
      await manager.deleteProduct(Number(productId));
      io.emit("products", manager.getProducts());
    } catch (e) {
      console.error(e);
    }
  });

  socket.emit("products", manager.getProducts());
});
