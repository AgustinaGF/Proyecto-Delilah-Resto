const express = require("express")
const server = express();
const usersRoute = require("./routes/users.routes")
const userRegister = require("./routes/register.routes")
const userLogin = require("./routes/login.routes")
const productsRoute = require("./routes/products.routes")

server.use(express.json())

// routes usuarios
server.use("/users", usersRoute)
server.use("/register", userRegister)
server.use("/login", userLogin)
    // routes products
server.use("/products", productsRoute)

server.listen(3000, () => {
    console.log("Server Init.")
})