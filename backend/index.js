const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");

// allow cors requests from any origin and with credentials
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ayarn",
  database: "my_project",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Email setup
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "iamayarn2001@gmail.com",
    pass: "lher fllj iedu kmss",
  },
});

// sendMail function
const sendMail = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

// Registration
app.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  const sql =
    "INSERT INTO users (first_name, last_name, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    await new Promise((resolve, reject) => {
      db.query(
        sql,
        [first_name, last_name, email, hashedPassword, role, token],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    const mailOptions = {
      from: "iamayarn2001@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Please verify your account by clicking the link: http://localhost:3000/verify/${token}`,
    };

    await sendMail(mailOptions);

    res
      .status(200)
      .send(
        "Registration successful, please check your email for verification link."
      );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message || "Internal Server Error");
  }
});

// Email Verification
app.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(400).send("Invalid token.");

    const sql = "UPDATE users SET is_verified = true WHERE email = ?";
    db.query(sql, [decoded.email], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send("Email verified successfully.");
    });
  });
});

// Admin Login
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND role = "admin"';
  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0)
      return res.status(400).send("You are not allowed to login from here.");

    const user = result[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send("Invalid Password.");

    const token = jwt.sign({ id: user.id, role: user.role }, "secret", {
      expiresIn: "1h",
    });
    res.status(200).send({ auth: true, token });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
