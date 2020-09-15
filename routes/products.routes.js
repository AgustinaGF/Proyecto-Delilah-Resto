const express = require("express");
const router = express.Router();
const serviceProducts = require("../services/products.service")
const { validateProductRegister } = require("../middlewares/product.register")
const { authUser, authUserAdmin } = require("../middlewares/auth")

// get que traiga todos los productos
router.get("/", authUser, async(req, res) => {
        try {
            let result = await serviceProducts.getAllProducts()
            res.status(200).send(result)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    })
    // get para traer Producto por ID
router.get("/:productId", authUserAdmin, async(req, res) => {
    try {
        let productId = req.params.productId
        let result = await serviceProducts.getProduct(productId);
        res.status(200).send(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
})

// post que registre producto solo user admin puede hacerlo
router.post("/", validateProductRegister, authUserAdmin, async(req, res) => {
    try {
        let product = req.body;
        let validation = await serviceProducts.validateProductFields(product);
        if (validation.length > 0) {
            return res.status(400).json({ exito: false, data: validation });
        } else {
            return res.status(201).send("The product was created successfully");
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

// put que modifique el productsRepo, solo user admin puede hacerlo
router.put("/:productId", authUserAdmin, async(req, res) => {
    try {
        let productId = req.params.productId
        let newData = req.body
        let result = await serviceProducts.modifyProduct(productId, newData)
        res.status(200).send("Product has been successfully modified")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

// delete solo user admin puede hacerlo
router.delete("/:productId", authUserAdmin, async(req, res) => {
    try {
        let productId = req.params.productId
        let result = await serviceProducts.deleteProduct(productId)
        res.status(200).send("Product has been successfully removed ")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})



module.exports = router