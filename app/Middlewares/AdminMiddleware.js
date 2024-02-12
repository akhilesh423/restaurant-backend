const jwt = require("jsonwebtoken");

const AdminMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'admin_dashboard_bling', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {

                if (decoded.isAdmin) {
                    next();
                } else {
                    return res.status(403).json({ message: 'Unauthorized access.' });
                }
            }
        });
    } else {
        return res.status(403).send({
            message: 'No token provided.'
        });
    }
};

module.exports = AdminMiddleware;
