const sql = require("../connection/connection")

module.exports.getUsers = async function() {
    return new Promise((res, rej) => {
        sql.query("SELECT * FROM users")
            .then(result => {
                console.log(result)
                res(result[0])
            }).catch(error => {
                console.log(error)
                rej(error)
            })
    })
}



module.exports.createUser = async(user) => {
    return new Promise((res, rej) => {
        sql.query('INSERT INTO users (username, password, full_name, email, phone_number, address )VALUES (?,?,?,?,?,?)', {
            replacements: [user.username, user.password, user.full_name, user.email, user.phone_number, user.address],
            type: sql.QueryTypes.INSERT
        }).then(result => {
            console.log(result);
            res(result)
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}



module.exports.searchUserByEmail = async(email) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM users WHERE email = :userEmail', {
            replacements: { userEmail: email },
            type: sql.QueryTypes.SELECT
        }).then(resultado => {
            res(resultado[0]);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.searchUserByUsername = async(username) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM users WHERE username = :userName', {
            replacements: { userName: username },
        }).then(resultado => {
            res(resultado[0]);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}
module.exports.getUserById = async(user_id) => {
    return new Promise((res, rej) => {
        sql.query('SELECT * FROM users WHERE user_id = :userId', {
            replacements: { userId: user_id },
            type: sql.QueryTypes.SELECT
        }).then(result => {
            res(result);
        }).catch(error => {
            console.log(error)
            rej(error)
        })
    })
}

module.exports.modifyUserById = async(userId, newData) => {
        return new Promise((res, rej) => {
            console.log(userId)
            console.log(newData)
            sql.query('UPDATE users SET username=?, password=?, full_name =?, email=?, phone_number=?, address=? WHERE user_id=?', {
                replacements: [newData.username, newData.password, newData.full_name, newData.email, newData.phone_number, newData.address, userId],
                type: sql.QueryTypes.UPDATE
            }).then(result => {
                res(result)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    }
    // elimina cancion por Id
module.exports.deleteUserById = async(userId) => {
        console.log(userId)
        return new Promise((res, rej) => {
            sql.query('DELETE FROM users WHERE user_id=?', {
                replacements: [userId],
                type: sql.QueryTypes.DELETE
            }).then(result => {
                res(result)
            }).catch(error => {
                console.log(error)
                rej(error)
            })
        })
    }
    // module.exports.searchUserByPassword = async(password) => {
    //     return new Promise((res, rej) => {
    //         sql.query('SELECT * FROM users WHERE password = :userPassword', {
    //             replacements: { userPassword: password },
    //         }).then(resultado => {
    //             res(resultado[0]);
    //         })
    //     })
    // }