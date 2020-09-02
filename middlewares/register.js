module.exports.validateUserRegister = function(req, res, next) {
    const { username, password, full_name, email, phone_number, address } = req.body;
    let errors = [];
    if (!username || !password || !full_name || !email || !phone_number || !address) {
        errors.push({
            mensaje: "Required fields are missing ",
        });
        return res.status(400).json({ error: errors })
    } else {
        return next();
    }
}