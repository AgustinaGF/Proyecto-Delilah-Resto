const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const sequelize = new Sequelize(process.env.CONNECTION_DB)

sequelize.authenticate().then(() => {
    console.log("Nos Conectamos a la Base de Datos")
}).catch(error => {
    console.log("Se Ha Producido un error", error)
})




module.exports = sequelize