const sql = require("../connection/connection")

module.exports.getProducts = async function() {
    return new Promise((res, rej) => {
        sql.query("SELECT * FROM products")
            .then(result => {
                console.log(result)
                res(result[0])
            }).catch(error => {
                console.log(error)
                rej(error)
            })
    })
}
module.exports.createProduct = async(product) => {
    return new Promise((res, rej) => {
        sql.query('INSERT INTO products (product_title, product_price, product_image, description)VALUES (?,?,?,?)', {
            replacements: [product.product_title, product.product_price, product.product_image, product.description],
            type: sql.QueryTypes.INSERT
        }).then(result => {
            console.log(result);
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.getProductById = async(product_id) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM products WHERE product_id= :productId', {
            replacements: { productId: product_id },
            type: sql.QueryTypes.SELECT
        }).then(result => {
            res(result);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.modifyProductById = async(productId, newData) => {
    return new Promise((res, rej) => {
        console.log(productId)
        console.log(newData)
        sql.query('UPDATE products SET product_title=?, product_price=?, product_image=?, description=? WHERE product_id=?', {
            replacements: [newData.product_title, newData.product_price, newData.product_image, newData.description, productId],
        }).then(result => {
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.deleteProductById = async(productId) => {
    return new Promise((res, rej) => {
        sql.query('DELETE FROM products WHERE product_id=?', {
            replacements: [productId],
        }).then(result => {
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}