const sql = require("../connection/connection")

module.exports.getOrders = async function() {
    return new Promise((res, rej) => {
        sql.query(`SELECT orders.order_id,order_status.status,orders.createdDate,orders_detail.product_id,products.product_title, 
        order_description,orders_detail.product_price,orders_detail.product_amount,method_of_payment,
        (orders_detail.product_price*orders_detail.product_amount)AS total, users.user_id, users.username, users.address FROM orders_detail INNER JOIN orders ON 
        orders_detail.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id INNER JOIN products ON orders_detail.product_id = 
        products.product_id INNER JOIN order_status ON orders.status = order_status.status_id`)
            .then(result => {
                res(result[0])
            }).catch(error => {
                console.log(error)
                rej(error)
            })
    })
}

module.exports.getOderByUser = async(user_id) => {
    return new Promise((res, rej) => {
        sql.query(`SELECT users.user_id,orders.order_id,order_status.status,products.product_title,orders_detail.product_price,orders_detail.product_amount,method_of_payment,
        (orders_detail.product_price*orders_detail.product_amount)AS total,users.address FROM orders_detail INNER JOIN orders ON 
        orders_detail.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id INNER JOIN products ON orders_detail.product_id = 
        products.product_id INNER JOIN order_status ON orders.status = order_status.status_id WHERE orders.user_id = :userId`, {
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
        sql.query(`SELECT orders.order_id,order_status.status,products.product_title,orders_detail.product_price,orders_detail.product_amount,method_of_payment,
        (orders_detail.product_price*orders_detail.product_amount)AS total,users.user_id,users.username,users.address FROM orders_detail INNER JOIN orders ON 
        orders_detail.order_id = orders.order_id INNER JOIN users ON orders.user_id = users.user_id INNER JOIN products ON orders_detail.product_id = 
        products.product_id INNER JOIN order_status ON orders.status = order_status.status_id WHERE orders.order_id= :orderId`, {
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
        }).then(result => {
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.deleteOrderById = async(orderId) => {
    return new Promise((res, rej) => {
        sql.query('UPDATE orders SET status = 6 WHERE order_id=?', {
            replacements: [orderId],
        }).then(result => {
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}