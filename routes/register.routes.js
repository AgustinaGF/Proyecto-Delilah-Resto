const express = require("express");
const router = express.Router();
const registerService = require("../services/register.service");
const { validateUserRegister } = require("../middlewares/register");

// post que realizar registro de usuario
router.post("/", validateUserRegister, async(req, res) => {
    let user = req.body;
    try {
        let validation = await registerService.validateUserFields(user);
        console.log(validation, "q es esto");
        if (validation.length > 0) {
            return res.status(400).json({ success: false, data: validation });
        } else {
            //encriptar password
            const encryptedPassword = await registerService.encryptedPassword(user);
            user.password = encryptedPassword;
            let newUser = await registerService.createUserService(user);
            if (newUser) {
                return res
                    .status(200)
                    .json({ success: true, message: "User was created successfully" });
            }
        }
    } catch (error) {
        res.status(500).json({ Error: error.message });
    }
});

module.exports = router;