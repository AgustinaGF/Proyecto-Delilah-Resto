const express = require("express");
const router = express.Router();
const ordersService = require("../services/orders.service")
const { authUser, authUserAdmin } = require("../middlewares/auth")
const { validateOrderRegister } = require("../middlewares/register")


// get de todos los pedidos accesibles solo para admin, si no es admin solo le devuelve sus pedidos
router.get("/", authUser, async(req, res) => {
        try {
            const userId = req.user_id
            const rolUser = req.user_admin
            let result = await ordersService.getAllOrders(rolUser, userId)
            if (result.length <= 0) {
                res.status(404).send("There aren't orders")
            } else {
                res.status(200).send(result)
            }
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    })
    // get para traer orders por id, solo  admin puede hacerlo
router.get("/:orderid", authUserAdmin, async(req, res) => {
    try {
        let orderId = req.params.orderid
        let result = await ordersService.getOrderById(orderId);
        if (result.length <= 0) {
            res.status(404).send("No order found")
        } else {
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
})

// post para crear un pedido user y admin 
router.post("/", authUser, validateOrderRegister, async(req, res) => {
    try {
        const userId = req.user_id
        const dataOrder = req.body
        let createOrder = await ordersService.createOrder(userId, dataOrder);
        return res.status(201).send("Your order was successfully created");
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});
// put para modificar el estado del pedido solo admin
router.put("/:orderid", authUserAdmin, async(req, res) => {
        try {
            let orderId = req.params.orderid
            let newStatus = req.body
            let result = await ordersService.modifyStatusOrder(orderId, newStatus)
            res.status(200).send(`Order status ${orderId} has been successfully modified`)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
    // delete solo para admin
router.delete("/:orderid", authUserAdmin, async(req, res) => {
    try {
        let orderId = req.params.orderid
        let result = await ordersService.deleteOrder(orderId)
        res.status(200).send(`Order ${orderId} was canceled`)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})




module.exports = router