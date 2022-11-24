const router = require("express").Router();
const { User, Post } = require("../../models");
const sequelize = require("../../config/connection");

// to find all users, excluding their password
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// to get a user by their id and show all of their posts
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "emoji", "content", "user_id", "created_at"],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// the following code is to create a new users
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  }).then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData.email
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// -----------------------------------------------------------------

// login page
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: "No user with that username or email!" });
        return;
      }
      const validPassword = dbUserData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.email = dbUserData,username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// ------------------------------------------------------------------

// logout page
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      return;
    });
  } else {
    res.status(404).end();
    return;
  }
  res.replace("/login")
});

// -------------------------------------------------------------------


module.exports = router;