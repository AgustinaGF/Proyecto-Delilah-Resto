const productsRepo = require("../repositories/products.repo")

module.exports.getAllProducts = async function() {
    let products = await productsRepo.getProducts()
    if (products) {
        return products
    } else {
        throw new Error("Can't get Products")
    }
}

module.exports.getProduct = async function(productId) {
    let product = await productsRepo.getProductById(productId)
    if (product) {
        return product
    } else {
        throw new Error("Can't get Product information")
    }
}
module.exports.validateProductFields = async function(data) {
    const { product_title, product_price, product_image, description } = data
    let errors = []
    try {
        if (!/^[ a-zA-Z\s]+$/i.test(product_title)) {
            errors.push({ mensaje: "Product Title only accepts letters" });
            return errors
        }
        if (!/^[ a-zA-Z\s]+$/i.test(description)) {
            errors.push({ mensaje: "Description only accepts letters" });
            return errors
        } else {
            let newProduct = await productsRepo.createProduct(data);
            return errors
        }
    } catch (error) {
        console.log(error)
        return null
    }

}

module.exports.modifyProduct = async function(productId, newData) {
    let product = await productsRepo.modifyProductById(productId, newData)
    if (product[0].affectedRows == 0) {
        throw new Error("Product could not be modified")
    } else {
        return product
    }
}


module.exports.deleteProduct = async function(productId) {
    let product = await productsRepo.deleteProductById(productId)
    if (product[0].affectedRows == 0) {
        throw new Error("Product could not be remove")
    } else {
        return product
    }
}