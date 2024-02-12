const express = require('express');
const app = express();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const cors = require("cors"); // Import cors middleware

const port = 4000;
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const AdminSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5),
    name: zod.string()
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post("/signup", (req, res) => {
    const userBody = req.body;
    const response = AdminSchema.safeParse(userBody);
    if (response.success) {
        const token = jwt.sign({ email: userBody.email }, "admin_dashboard_bling");
        res.send({ token }); // Send back the token in the response
    } else {
        res.status(401).send({ msg: response.error.issues });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
