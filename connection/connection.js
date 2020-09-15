const Sequelize = require("sequelize")
const dotenv = require("dotenv")
dotenv.config()

const sequelize = new Sequelize(process.env.CONNECTION_DB)

sequelize.authenticate().then(() => {
    console.log("We connect to the Database")
}).catch(error => {
    console.log("An error has occurred", error)
})




module.exports = sequelize