const express = require("express");
const router = express.Router();
const usersRepo = require("../repositories/users.repo")
const registerService = require("../services/register.service")
const { validateUserRegister } = require("../middlewares/register")

// post que realiza registro de usuario
router.post("/", validateUserRegister, async(req, res) => {
    try {
        let user = req.body;
        let validation = await registerService.validateUserFields(user);
        if (validation.length > 0) {
            return res.status(400).json({ exito: false, data: validation });
        }
        //encriptar password
        const encryptedPassword = await registerService.encryptedPassword(user);
        user.password = encryptedPassword;
        // aca hacerme otra funcion en services register 
        let newUser = usersRepo.createUser(user);
        return res.status(201).json({ exito: true, data: newUser });
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

module.exports = router