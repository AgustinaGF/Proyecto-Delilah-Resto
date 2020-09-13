const ordersRepo = require("../repositories/orders.repo")
const productsRepo = require("../repositories/products.repo")
const repoUsers = require("../repositories/users.repo")

module.exports.getAllOrders = async function(rolUser, userId) {
    console.log(rolUser)
    if (rolUser == "admin") {
        let orders = await ordersRepo.getOrders()
        return orders
    }
    if (rolUser == "user") {
        // si no es admin solo me va a devolver sus pedidos
        console.log(userId)
        let orderByUser = await ordersRepo.getOderByUser(userId)
        return orderByUser
    } else {
        throw new Error("Can't get Orders")
    }
}
module.exports.getOrderById = async function(orderId) {
    let orderById = await ordersRepo.getOrderById(orderId)
    if (orderById) {
        return orderById
    } else {
        throw new Error("the order was not found")
    }
}

module.exports.createOrder = async function(userId, dataOrder) {
        const method = dataOrder.method_of_payment
        var arrayProduct = []
        for (let i = 0; i < dataOrder.detail.length; i++) {
            const element = dataOrder.detail[i];
            const productId = element.productId
            const produAmount = element.product_amount
            var user = await repoUsers.getUserById(userId)
            var product = await productsRepo.getProductById(productId)
                // pusheo al array de productos, la cantidad para despues utilizarlo
            product.push({ cantidad: produAmount })
                // aca me hago un push a un nuevo array de toda la info que necesito para crear tabla de order Details
            arrayProduct.push(product)
        }
        if (user && product) {
            var createOrder = await ordersRepo.createOrder(method, userId)
            let orderId = createOrder[0]
            for (let i = 0; i < arrayProduct.length; i++) {
                const product = arrayProduct[i]
                const productPrice = product[0].product_price
                const productId = product[0].product_id
                const descriptionOrder = product[0].description
                    // aca paso la cantidad de cada producto 
                const productAmount = product[1].cantidad
                var createOrderDetail = await ordersRepo.createOrderDetail(orderId, productId, descriptionOrder, productPrice, productAmount)
            }
        } else {
            throw new Error("Can't create Orders")
        }
        return createOrderDetail
    }
    // me falta probarlo
module.exports.modifyStatusOrder = async function(orderId, newStatus) {
    let status = newStatus.status
    if ((status !== "1") && (status !== "2") && (status !== "3") && (status !== "4") && (status !== "5") && (status !== "6")) {
        console.log(status)
        throw new Error("The order status is incorrect you must enter a number from 1 to 6 ");
    } else {
        let changeStatus = await ordersRepo.modifyStatusOrderById(orderId, status)
        return changeStatus;
    }
}

// module.exports.modifyStatusOrder = async function(orderId, newStatus) {
//     let status = newStatus.status
//     if ((status !== "confirmed") && (status !== "canceled") && (status !== "delivered") && (status !== "new") && (status !== "preparing")) {
//         console.log(status)
//         throw new Error("The status orders must be confirmed or preparing or shipping or canceled or delivered or new");
//     } else {
//         let changeStatus = await ordersRepo.modifyStatusOrderById(orderId, status)
//         return changeStatus;
//     }
// }
module.exports.deleteOrder = async function(orderId) {
    let deleteOrder = await ordersRepo.deleteOrderById(orderId)
    if (!deleteOrder) {
        return deleteOrder
    } else {
        throw new Error("Order could not be remove")
    }
}