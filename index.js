const express = require("express");
const server = express();
const usersRoute = require("./routes/users.routes");
const userRegister = require("./routes/register.routes");
const userLogin = require("./routes/login.routes");
const productsRoute = require("./routes/products.routes");
const ordersRoute = require("./routes/orders.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

server.use(express.json());
server.use(cors());
// configuracion para que use cookieParser
server.use(cookieParser());

// routes usuarios
server.use("/api/users", usersRoute);
server.use("/api/auth/register", userRegister);
server.use("/api/auth/login", userLogin);
// routes products
server.use("/api/products", productsRoute);
//  routes orders
server.use("/api/orders", ordersRoute);

server.listen(3000, () => {
    console.log("Server Init.");
});