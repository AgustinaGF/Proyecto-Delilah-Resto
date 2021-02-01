const sql = require("../connection/connection");

module.exports.getUsers = async function() {
    return new Promise((res, rej) => {
        sql
            .query("SELECT * FROM users")
            .then((result) => {
                res(result[0]);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};

module.exports.createUser = async(user) => {
    return new Promise((res, rej) => {
        sql
            .query(
                "INSERT INTO users (username, password, full_name, email, phone_number, address )VALUES (?,?,?,?,?,?)", {
                    replacements: [
                        user.username,
                        user.password,
                        user.full_name,
                        user.email,
                        user.phone_number,
                        user.address,
                    ],
                    type: sql.QueryTypes.INSERT,
                }
            )
            .then((result) => {
                res(result);
            })
            .catch((error) => {
                console.log(error, "error");
                rej(error);
            });
    });
};

module.exports.searchUserByEmail = async(email) => {
    return new Promise((res, rej) => {
        sql
            .query("SELECT * FROM users WHERE email = :userEmail", {
                replacements: { userEmail: email },
                type: sql.QueryTypes.SELECT,
            })
            .then((resultado) => {
                res(resultado);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};
module.exports.searchUserByUsername = async(username) => {
    return new Promise((res, rej) => {
        sql
            .query("SELECT * FROM users WHERE username = :userName", {
                replacements: { userName: username },
            })
            .then((resultado) => {
                res(resultado[0]);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};
module.exports.getUserById = async(user_id) => {
    return new Promise((res, rej) => {
        sql
            .query("SELECT * FROM users WHERE user_id = :userId", {
                replacements: { userId: user_id },
                type: sql.QueryTypes.SELECT,
            })
            .then((result) => {
                res(result);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};

module.exports.modifyUserById = async(userId, newData) => {
    return new Promise((res, rej) => {
        sql
            .query(
                "UPDATE users SET password=?, full_name =?, phone_number=?, address=? WHERE user_id=?", {
                    replacements: [
                        newData.password,
                        newData.full_name,
                        newData.phone_number,
                        newData.address,
                        userId,
                    ],
                    type: sql.QueryTypes.UPDATE,
                }
            )
            .then((result) => {
                res(result);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};
// elimina user por Id
module.exports.deleteUserById = async(user_id) => {
    return new Promise((res, rej) => {
        sql
            .query("DELETE FROM users WHERE user_id =?", {
                replacements: [user_id],
            })
            .then((result) => {
                res(result);
            })
            .catch((error) => {
                console.log(error);
                rej(error);
            });
    });
};