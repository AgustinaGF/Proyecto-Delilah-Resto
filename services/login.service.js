const usersRepo = require("../repositories/users.repo")
    // const loginRoute = require("../routes/login.routes");
const bcrypt = require("bcryptjs");

module.exports.validateLoginFields = async function(data) {
    const { username, email, password } = data;
    console.log({ username, email, password });
    let errors = [];
    if (username && password) {
        let userByUsername = await usersRepo.searchUserByUsername(username);
        console.log(userByUsername)
        if (userByUsername.length != 1) {
            errors.push({ mensaje: "El Usuario ingresado no es valido" });
            return errors;
        }
        let userPassword = userByUsername[0].password;
        console.log(userPassword)
            //checkear contraseña valida 
        const passwordVerify = await bcrypt.compare(password, userPassword);
        console.log(passwordVerify);

        if (!passwordVerify) {
            errors.push({ mensaje: "La contraseña ingresada es incorrecta" });
        }
    } else {
        // busca usuario por mail
        let userByEmail = await usersRepo.searchUserByEmail(email);
        if (userByEmail.length != 1) {
            errors.push({ mensaje: "El email ingresado no es valido" });
            return errors;
        }
        let userPassword = userByEmail[0].password;
        //checkear contraseña valida 
        const passwordVerify = await bcrypt.compare(password, userPassword);
        console.log(passwordVerify);

        if (!passwordVerify) {
            errors.push({ mensaje: "La contraseña ingresada es incorrecta" });
        }
    }
    return errors;
};

module.exports.searchUserEmail = async function(email) {
    let searchUserEmail = await usersRepo.searchUserByEmail(email);
    return searchUserEmail;
};
module.exports.searchUserByUsername = async function(username) {
    let searchUsername = await usersRepo.searchUserByUsername(username);
    return searchUsername;
};