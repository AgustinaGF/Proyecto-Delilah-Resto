const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const loginService = require("../services/login.service")
const { validateUserLogin } = require("../middlewares/login")

// post de login
router.post("/", validateUserLogin, async(req, res) => {
    let user = req.body; // user o mail email, password
    try {
        //checkeo email y contraseña valida
        let validation = await loginService.validateLoginFields(user);

        if (validation.length > 0) {
            res.status(400).json({ success: false, message: validation });
            return;
        }
        //buscar id del usuario
        console.log(req.body.email);
        const email = req.body.email
        const username = req.body.username
        if (email) {
            let userData = await loginService.searchUserEmail(
                email
            );
            userData = userData[0];

            //generar Token si se logea con email
            var token = jwt.sign({
                    id: userData.id,
                    fullname: userData
                },
                process.env.SECRET_JWT
            );
        } else {
            let userData = await loginService.searchUserByUsername(
                username
            );
            userData = userData[0];

            //generar Token si se logea con username
            var token = jwt.sign({
                    id: userData.id,
                    fullname: userData
                },
                process.env.SECRET_JWT
            );
        }
        res.status(200).json({ success: true, message: "Login ok", token: `${token}` })

    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

module.exports = router