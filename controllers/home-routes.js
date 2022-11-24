const sequelize = require("../config/connection");
const { Post, User } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// landing page
router.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
    return;
  }
  res.render("homepage");
});

// homepage
router.get("/home", withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "emoji", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// to edit a post
router.get("/home/edit/:id", withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "emoji", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      }
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login 
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/home");
    return;
  }
  res.render("login");
});

// signup
router.get("/signup", (req, res) => {
  
  res.render("signup");
});

module.exports = router;
