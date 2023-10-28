require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { verifyToken } = require("./auth.js");
const teacher = require("./models/teacher.js");
const questionBank = require("./models/questionBank.js");

const app = express();
const PORT = 5000;
const secretKey = "enigma";
app.use(cors());
app.use(bodyParser.json());

const mongodbUri = process.env.MONGO_URI;

const users = [
  {
    id: 1,
    username: "ami",
    password: "123",
    designation: "student",
  },
];

const mongoose = require("mongoose");
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

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
    { expiresIn: "1800s" }
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
  async function insertData() {
    try {
      // Insert data into Collection1
      const newData = new teacher({
        empid: "00000",
        name: "kuhkuh",
        dept: "sjsi",
        ongoingCourses: [
          {
            year: "2",
            courseName: "sasa",
          },
        ],
      });
      const savedData = await newData.save();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  insertData();
  res.json({
    message: "yoyo",
  });
});

app.post("/insertTeacher", async (req, res) => {
  try {
    const { empid, name, dept, ongoingCourses } = req.body;
    const newTeacher = new teacher({
      empid,
      name,
      dept,
      ongoingCourses,
    });
    const savedTeacher = await newTeacher.save();
    res.status(201).json({
      message: "Teacher data saved successfully",
      data: savedTeacher,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving teacher data" });
  }
});

app.post("/insertQS", async (req, res) => {
  try {
    const { subject, setNo, questions} = req.body;
    const newSet = new questionBank({
        subject,
        setNo,
        questions
    });
    const saved = await newSet.save();
    res.status(201).json({
      message: "Question data saved successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving Question data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
