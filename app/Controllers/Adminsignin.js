const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../Models/Admin.js');
const { AdminSigninSchema } = require("../Validations/Validation.js");

const AdminSignin = async (req, res) => {
    try {
        const userBody = req.body;
        const response = AdminSigninSchema.safeParse(userBody);
        if (response.success) {
            const user = await adminModel.findOne({ email: userBody.email });
            if (!user) {
                return res.status(404).send({ msg: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(userBody.password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({ msg: 'Invalid email or password' });
            }
            const jwt = require('jsonwebtoken');
            const token = jwt.sign({ email: user.email }, 'admin_dashboard_bling');
            res.send({ token });
        } else {
            res.status(401).send({ msg: response.error.issues });
        }
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send({ msg: 'Error signing in' });
    }
};

module.exports = AdminSignin;
