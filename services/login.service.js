const usersRepo = require("../repositories/users.repo")
const bcrypt = require("bcryptjs");

module.exports.validateLoginFields = async function(data) {
    const { username, email, password } = data;
    let errors = [];
    if (username && password) {
        let userByUsername = await usersRepo.searchUserByUsername(username);
        if (userByUsername.length != 1) {
            errors.push({ message: "Invalid User" });
            return errors;
        }
        let userPassword = userByUsername[0].password;
        //checkear contraseña valida 
        const passwordVerify = await bcrypt.compare(password, userPassword);

        if (!passwordVerify) {
            errors.push({ message: "The password is incorrect" });
        }
    } else {
        // busca usuario por mail
        let userByEmail = await usersRepo.searchUserByEmail(email);
        if (userByEmail.length != 1) {
            errors.push({ message: "Invalid email" });
            return errors;
        }
        let userPassword = userByEmail[0].password;
        //checkear contraseña valida 
        const passwordVerify = await bcrypt.compare(password, userPassword);

        if (!passwordVerify) {
            errors.push({ message: "The password is incorrect" });
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