const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const nodemailer = require("nodemailer");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

app.post("/", async (req, res) => {

  const email = document.querySelector("#email-signup").value.trim();
  
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: moodymoodtrackerssss,
      pass: moodymoodtracker,
    },
  });

  const mailOptions = {
    from: '"MoodTracker" <moodymoodtrackerssss@gmail.com>',
    to: email,
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
});