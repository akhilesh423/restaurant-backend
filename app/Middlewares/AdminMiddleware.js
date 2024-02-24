const jwt = require("jsonwebtoken");

const AdminMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    const bearerToken = token.split(" ")[1];

    try {
        const decoded = jwt.verify(bearerToken, 'admin_dashboard_bling');
        console.log(decoded);
        if (decoded.email) {
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized access.' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = AdminMiddleware;
