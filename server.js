const express = require('express');
const app = express();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const mongoose = require('mongoose'); // Import mongoose

const port = 4000;
app.use(express.json());
app.use(cors());

const AdminSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    name: zod.string()
});



const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});


const UserModel = mongoose.model('User', UserSchema);


mongoose.connect("mongodb+srv://akhil23:akhil00$%40@cluster0.6ft1lt8.mongodb.net/blingandbliss", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ msg: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ msg: "Invalid email or password" });
        }
        const token = jwt.sign({ email }, "admin_dashboard_bling");
        res.send({ token });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).send({ msg: "Error signing in" });
    }
});


app.post("/signup", async (req, res) => {
    const userBody = req.body;
    const response = AdminSchema.safeParse(userBody);
    console.log(response)
    if (response.success) {
        try {

            const existingUser = await UserModel.findOne({ email: userBody.email });
            if (existingUser) {
                return res.status(400).send({ msg: "User with this email already exists" });
            }

            const hashedPassword = await bcrypt.hash(userBody.password, 10);

            const newUser = new UserModel({
                email: userBody.email,
                password: hashedPassword,
                name: userBody.name
            });

            await newUser.save();
            const token = jwt.sign({ email: userBody.email }, "admin_dashboard_bling");
            res.send({ token });
        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).send({ msg: "Error saving user" });
        }
    } else {
        res.status(401).send({ msg: response.error.issues });
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
