const jwt = require("jsonwebtoken");

module.exports = {

    authUser: async(req, res, next) => {
        try {
            const token = req.header("Authorization").split(" ")[1];
            console.log(token, "hola")
            if (token) {
                let verifyToken = jwt.verify(token, process.env.SECRET_JWT);
                req.user_id = verifyToken.fullname.user_id
                req.user_admin = verifyToken.fullname.user_admin
                return next();
            } else {
                res.status(401).send("You need to be logged in to access the content")
            }
        } catch (error) {
            res.status(401).json(error)
        }
    },
    authUserAdmin: async(req, res, next) => {
        try {
            const token = req.header("Authorization").split(" ")[1];
            console.log(token)
            let verifyToken = jwt.verify(token, process.env.SECRET_JWT);
            const rolUser = verifyToken.fullname.user_admin
            console.log(rolUser)
            if (rolUser == "admin") {
                return next();
            } else {
                res.status(403).send("You need to be an Administrator to access the content")
            }
        } catch (error) {
            res.status(401).json(error)
        }
    }
}