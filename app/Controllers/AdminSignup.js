const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModel.js');
const { adminSignupSchema } = require("../validations/validation.js");


const adminSignup = async (req, res) => {
    try {
        const userBody = req.body;
        const response = adminSignupSchema.safeParse(userBody);
        if (response.success) {
            const existingUser = await adminModel.findOne({ email: userBody.email });
            if (existingUser) {
                return res.status(400).send({ msg: 'User with this email already exists' });
            }
            const hashedPassword = await bcrypt.hash(userBody.password, 10);
            const newUser = new adminModel({
                email: userBody.email,
                password: hashedPassword,
                name: userBody.name,
            });
            await newUser.save();
            const token = jwt.sign({ email: userBody.email }, 'admin_dashboard_bling');
            res.send({ token });
        } else {
            res.status(401).send({ msg: response.error.issues });
        }
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send({ msg: 'Error saving user' });
    }
};

module.exports = adminSignup;
