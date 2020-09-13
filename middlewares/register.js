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
module.exports.validateModifyUser = function(req, res, next) {
    const { password, full_name, phone_number, address } = req.body;
    let errors = [];
    if (!password || !full_name || !phone_number || !address) {
        errors.push({
            mensaje: "Required fields are missing ",
        });
        return res.status(400).json({ error: errors })
    } else {
        return next();
    }
}
module.exports.validateOrderRegister = function(req, res, next) {
    const { method_of_payment } = req.body;
    let errors = [];
    if (!method_of_payment) {
        errors.push({
            mensaje: "Required fields are missing ",
        })
    }
    if ((method_of_payment !== "cash") && (method_of_payment !== "credit card")) {
        errors.push({
            mensaje: "The payment method must be credit card or cash",
        });
        return res.status(400).json({ error: errors })

    } else {
        return next();
    }
}