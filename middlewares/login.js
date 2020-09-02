module.exports.validateUserLogin = function(req, res, next) {
    const { username, email, password } = req.body;
    let errors = []
    if (!email && !username || !password) {
        errors.push({
            mensaje: "Required fields are missing ",
        });
        return res.status(400).json({ error: errors })
    } else {
        return next();
    }
}