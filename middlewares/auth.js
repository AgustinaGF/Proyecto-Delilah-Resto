const jwt = require("jsonwebtoken");
const { getUserById } = require("../repositories/users.repo")
    //middelware de autorizacion mediante token para hacer gets?

module.exports = {

        authUser: async(req, res, next) => {
            try {
                const token = req.header("Authorization").split(" ")[1];
                console.log(token, "hola")
                if (token) {
                    let verifyToken = jwt.verify(token, process.env.SECRET_JWT);
                    req.user_id = verifyToken.fullname.user_id
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
                    console.log(token, "hola")

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
            //         if (!token) {
            //             return res
            //                 .status(401)
            //                 .send("Tenes que iniciar sesion para acceder a este contenido");
            //         }
            //         if (verifyToken) {
            //             console.log(verifyToken)
            //             req.user = verificarToken;
            //             req.userId = verifyToken.id
            //             return next();
            //         }
            //     } catch (error) {
            //         res.status(400).send("tenes un error")
            //     }
            // };


    }
    //     try {
    //         let token = req.header("Authorization").split(" ")[1];
    //         console.log(token, "hola")
    //         if (!token) {
    //             return res
    //                 .status(401)
    //                 .send("Tenes que iniciar sesion para acceder a este contenido");
    //         }
    //         let verifyToken = jwt.verify(token, process.env.SECRET_JWT);
    //         if (verifyToken) {
    //             console.log(verifyToken)
    //             req.user = verificarToken;
    //             req.userId = verifyToken.id
    //             return next();
    //         }
    //     } catch (error) {
    //         res.status(400).send("tenes un error")
    //     }
    // };

// let token = req.headers["autorizacion"].split(" ")[1]
// console.log(token)
// let user = null;
// try {
//     user = jwt.verify(token, SECRET_JWT)
//     console.log(user)
// } catch (er) {
//     res.status(401).send("No tenes el acceso permitido")
//     return
// }