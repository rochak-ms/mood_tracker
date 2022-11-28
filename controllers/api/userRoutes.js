const router = require("express").Router();
const { User } = require("../../models");
const nodemailer = require("nodemailer");
require("dotenv").config();
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });
    // nodemailer functionality

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: "rmbmailer@gmail.com",
      to: req.body.email,
      subject: "Welcome!",
      text: "Welcome to the moodtracker app! We hope that you find a lot of value out of this application!",
    };

    const response = await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.send(err);
      } else {
        console.log(`Email sent! ${info.response}`);
        res.send("Success");
      }
    });

    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// login - checks for an existing user and logs in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
