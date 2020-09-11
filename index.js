const express = require("express")
const server = express();
const usersRoute = require("./routes/users.routes")
const userRegister = require("./routes/register.routes")
const userLogin = require("./routes/login.routes")
const productsRoute = require("./routes/products.routes")
const ordersRoute = require("./routes/orders.routes")

server.use(express.json())

// routes usuarios
server.use("/api/users", usersRoute)
server.use("/api/auth/register", userRegister)
server.use("/api/auth/login", userLogin)
    // routes products
server.use("/api/products", productsRoute)
    //  routes orders
server.use("/api/auth/orders", ordersRoute)

server.listen(3000, () => {
    console.log("Server Init.")
})