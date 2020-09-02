const repoUsers = require("../repositories/users.repo")

module.exports.getAllUsers = async function() {
    let users = await repoUsers.getUsers()
    if (users) {
        return users
    } else {
        throw new Error("Can't get users information")
    }
}

module.exports.getUser = async function(userId) {
    let user = await repoUsers.getUserById(userId)
    if (user) {
        return user
    } else {
        throw new Error("Can't get user information")
    }
}
module.exports.getDataUserId = async function(userId) {
    let user = await repoUsers.getUserById(userId)
    if (user) {
        return user
    } else {
        throw new Error("Unable to get user information by id")
    }
}

module.exports.modifyUser = async function(idUser, newData) {
    let user = await repoUsers.modifyUserById(idUser, newData)
    if (user) {
        return user
    } else {
        throw new Error("User could not be modified")
    }
}

module.exports.deleteUser = async function(userId) {
    let user = await repoUsers.deleteUserById(userId)
    console.log(user)
    if (!user) {
        return user
    } else {
        throw new Error("User could not be remove")
    }
}