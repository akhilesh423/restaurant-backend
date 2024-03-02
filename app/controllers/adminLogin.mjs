import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AdminModel from '../models/adminModel.mjs';
import { adminSigninSchema } from "../validations/validation.mjs";

const adminLogin = async (req, res) => {
    try {
        const userBody = req.body;
        const response = adminSigninSchema.safeParse(userBody);
        if (response.success) {
            const user = await AdminModel.findOne({ email: userBody.email });
            if (!user) {
                return res.status(404).send({ msg: 'User not found' });
            }
            const passwordMatch = await bcrypt.compare(userBody.password, user.password);
            if (!passwordMatch) {
                return res.status(401).send({ msg: 'Invalid email or password' });
            }
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

export default adminLogin;
