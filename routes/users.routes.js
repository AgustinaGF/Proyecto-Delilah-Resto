const express = require("express");
const jwt = require("jsonwebtoken")
const router = express.Router();
const userService = require("../services/users.service")
const registerService = require("../services/register.service")
const { authUser, authUserAdmin } = require("../middlewares/auth")
const { validateModifyUser } = require("../middlewares/register")

// Get que me trae todos los usuarios, esto solo podria hacerlo el admin.
router.get("/", authUserAdmin, async(req, res) => {
    try {
        let result = await userService.getAllUsers()
        res.status(200).send(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
})


// get que devuelve los datos del usuario logueado, es la unica info que puede ver el usuario que no es admin
router.get("/getuser", authUser, async(req, res) => {
        try {
            const userId = req.user_id
            let result = await userService.getUser(userId)
            res.status(200).send(result)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    })
    // solo el admin puede solicitar info de un usuario por su id
router.get("/:userId", authUserAdmin, async(req, res) => {
        try {
            let userId = req.params.userId
            let result = await userService.getDataUserId(userId);
            res.status(200).send(result)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: error.message });
        }
    })
    // el usuario logueado va a poder modificar sus datos.
router.patch("/", authUser, validateModifyUser, async(req, res) => {
        try {
            let idUser = req.user_id
            let newData = req.body
            let validation = await registerService.validateModifyUser(newData);
            if (validation.length > 0) {
                return res.status(400).json({ exito: false, data: validation });
            }
            //encriptar password
            const encryptedPassword = await registerService.encryptedPassword(newData);
            newData.password = encryptedPassword;
            let result = await userService.modifyUser(idUser, newData)
            res.status(200).send("User has been successfully modified")
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
    // user admin va a ser el unico que va a poder eliminar un usuario
router.delete("/:userId", authUserAdmin, async(req, res) => {
    try {
        let userId = req.params.userId
        let result = await userService.deleteUser(userId)
        res.status(200).send("User has been successfully removed ")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

module.exports = router