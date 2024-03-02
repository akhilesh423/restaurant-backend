import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.mjs';
import { adminSignupSchema } from "../validations/validation.mjs";

const adminSignup = async (req, res) => {
    try {
        const userBody = req.body;
        const response = adminSignupSchema.safeParse(userBody);
        if (response.success) {
            const existingUser = await Admin.findOne({ email: userBody.email });
            if (existingUser) {
                return res.status(400).send({ msg: 'User with this email already exists' });
            }
            const hashedPassword = await bcrypt.hash(userBody.password, 10);
            const newUser = new Admin({
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

export default adminSignup;
