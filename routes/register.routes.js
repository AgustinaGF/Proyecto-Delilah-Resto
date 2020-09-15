const express = require("express");
const router = express.Router();
const registerService = require("../services/register.service")
const { validateUserRegister } = require("../middlewares/register")

// post que realizar registro de usuario
router.post("/", validateUserRegister, async(req, res) => {
    try {
        let user = req.body;
        let validation = await registerService.validateUserFields(user);
        console.log(validation)
        if (validation.length > 0) {
            return res.status(400).json({ exito: false, data: validation });
        }
        //encriptar password
        const encryptedPassword = await registerService.encryptedPassword(user);
        user.password = encryptedPassword;
        let newUser = registerService.createUserService(user);
        return res.status(201).send("User was created successfully");
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

module.exports = router