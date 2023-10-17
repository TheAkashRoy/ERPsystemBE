const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const secretKey = "enigma";

app.use(bodyParser.json());

const users = [
    {
        id: 1,
        username: "ami",
        password: "123",
        designation: "student"
    },
];

const verifyToken = (req, res, next) => {
    //   const token = req.headers.authorization;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
    console.log(users);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = decoded;
        next();
    });
};


app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ message: "Username already taken" });
    }

    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);

    res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        secretKey,
        { expiresIn: '1800s' }
    );

    res.json({ message: "Login successful", token });
});

app.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "accessing the protected route",
        user: req.user,
    });
});

app.get("/", (req, res) => {
    res.json({
        message: "yoyo",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});