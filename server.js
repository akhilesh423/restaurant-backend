const express = require('express');
const app = express();
const zod = require("zod")
const port = 3000;
app.use(express.json())

const AdminSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(5)
})



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post("/signup", (req, res) => {
    const userBody = req.body
    const response = AdminSchema.safeParse(userBody)
    if (response.success) {
        res.send({ msg: "lets login in few seconds" })
    }
    else {
        res.status(401).send({ msg: response.error.issues })
    }

})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
