const sql = require("../connection/connection")

module.exports.getOrders = async function() {
    return new Promise((res, rej) => {
        sql.query("SELECT * FROM orders")
            .then(result => {
                console.log(result)
                res(result[0])
            }).catch(error => {
                console.log(error)
                rej(error)
            })
    })
}

module.exports.getOderByUser = async(user_id) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM orders WHERE user_id = :userId', {
            replacements: { userId: user_id },
            type: sql.QueryTypes.SELECT
        }).then(result => {
            res(result);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.getOrderById = async(order_id) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM orders WHERE order_id= :orderId', {
            replacements: { orderId: order_id },
            type: sql.QueryTypes.SELECT
        }).then(result => {
            res(result);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}

module.exports.createOrder = async(method, userId) => {
    return new Promise((res, rej) => {
        sql.query('INSERT INTO orders (method_of_payment,user_id)VALUES (?,?)', {
            replacements: [method, userId],
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
module.exports.createOrderDetail = async(orderId, productId, descriptionOrder, productPrice, produAmount) => {
    return new Promise((res, rej) => {
        sql.query('INSERT INTO orders_detail (order_id,product_id,order_description,product_price, product_amount)VALUES (?,?,?,?,?)', {
            replacements: [orderId, productId, descriptionOrder, productPrice, produAmount],
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

module.exports.modifyStatusOrderById = async(orderId, status) => {
    return new Promise((res, rej) => {
        sql.query('UPDATE orders SET status =? WHERE order_id=?', {
            replacements: [status, orderId],
            type: sql.QueryTypes.UPDATE
        }).then(result => {
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.deleteOrderById = async(orderId) => {
        console.log(orderId)
        return new Promise((res, rej) => {
            sql.query('UPDATE orders SET status = 6 WHERE order_id=?', {
                replacements: [orderId],
                type: sql.QueryTypes.UPDATE
            }).then(result => {
                res(result)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    }
    // module.exports.deleteOrderById = async(orderId) => {
    //     console.log(orderId)
    //     return new Promise((res, rej) => {
    //         sql.query('DELETE FROM orders WHERE order_id=?', {
    //             replacements: [orderId],
    //             type: sql.QueryTypes.DELETE
    //         }).then(result => {
    //             res(result)
    //         }).catch(error => {
    //             console.log(error)
    //             rej(error)
    //         })
    //     })
    // }