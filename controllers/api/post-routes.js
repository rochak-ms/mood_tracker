const router = require("express").Router();
const { Post, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// to get all posts when the url is in default
router.get("/", (req, res) => {
  Post.findAll({
      attributes: ["id", "title", "emoji", "content", "user_id", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
          {
              model: User,
              attributes: ["username"],
          }
      ],
  })
  .then((dbPostData) => res.json(dbPostData.reverse()))
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

// to get posts via their id in URL
router.get("/:id", (req, res) => {
  Post.findOne({
      where: {
          id: req.params.id,
      },
      attributes: ["id", "title", "emoji", "content", "user_id", "created_at"],
      include: [
          {
              model: User,
              attributes: ["username"],
          },
      ],
  })
  .then((dbPostData) => {
      if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
      }
      res.json(dbPostData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// to create a post
router.post("/", withAuth, (req, res) => {
  Post.create({
      title: req.body.title, // send this as the emoji title 
      content: req.body.content,
      emoji: req.body.emoji,
      user_id: req.session.user_id,
  })
  .then((dbPostData) => res.json(dbPostData))
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

// to delete a post
router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
      where: {
          id: req.params.id,
      },
  })
  .then((dbPostData) => {
      if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
      }
      res.json(dbPostData);
  })
  .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;