module.exports.validateProductRegister = function(req, res, next) {
    const { product_title, product_price, product_image, description } = req.body;
    let errors = [];
    if (!product_title || !product_price || !product_image || !description) {
        errors.push({
            mensaje: "Required fields are missing ",
        });
        return res.status(400).json({ error: errors })
    } else {
        return next();
    }
}