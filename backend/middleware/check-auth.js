const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret_code');
        next();
    } catch (error) {
        res.status(401).json({
            error: 'Authorization failed'
        })
    }

}
