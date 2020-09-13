const bcrypt = require("bcryptjs");
const repoUsers = require("../repositories/users.repo")

// valida los campos del registro de usuario
module.exports.validateUserFields = async function(data) {
        const { username, password, full_name, email, phone_number, address } = data;
        let errors = [];
        //check full_name only letters
        if (!/^[a-z/s]+$/i.test(username)) {
            errors.push({ mensaje: "Username only accepts letters without spaces" });
        }
        if (!/^[ a-zA-Z\s]+$/i.test(full_name)) {
            errors.push({ mensaje: "Full name only accepts letters" });
        }
        //validar un email real
        if (!email.includes(".com")) {
            errors.push({
                mensaje: "Didn't enter validate mail",
            });
        }
        // check if the email entered is already registered    
        let searchUserByEmail = await repoUsers.searchUserByEmail(email);
        if (searchUserByEmail.length > 0) {
            errors.push({
                mensaje: "There is already a user with that email",
            });
            return errors;
        }
        // check if the username entered is already registered   
        let searchUserByUserName = await repoUsers.searchUserByUsername(username);
        if (searchUserByUserName.length > 0) {
            errors.push({
                mensaje: "There is already a user with that username",
            });
            return errors;
        }
        //validar password minimo 6 caracteres
        if (password.length < 6) {
            errors.push({
                mensaje: "The password must be at least 6 characters",
            });
            return errors
        }
        console.log(errors)
        return errors;
    }
    // encripta la contraseña
module.exports.encryptedPassword = async function(user) {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user.password, salt);
    return encryptedPassword;
};
// valida los datos a modificar del usuario
module.exports.validateModifyUser = async function(data) {
    const { password, full_name, phone_number, address } = data;
    let errors = [];
    if (!/^[ a-zA-Z\s]+$/i.test(full_name)) {
        errors.push({ mensaje: "Full name only accepts letters" });
    }
    //validar password minimo 6 caracteres
    if (password.length < 6) {
        errors.push({
            mensaje: "The password must be at least 6 characters",
        });
        return errors
    }
    return errors;
}
module.exports.createUserService = async function(user) {
    let createUser = await repoUsers.createUser(user)
    if (createUser) {
        return createUser
    } else {
        throw new Error("Couldn't create user")
    }
}