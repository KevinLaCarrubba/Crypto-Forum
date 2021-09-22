const router = require("express").Router();
const { User, Comment } = require("../../models");
const withAuth = require("../../helpers/utils/auth");

router.get("/", async (req, res) => {
  const commentData = await Comment.findAll().catch((err) => {
    res.json(err);
  });
  res.json(commentData);
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await User.findByPk(req.params.id, {
      include: Comment,
    });

    if (!commentData) {
      res.status(400).json({ message: "Data not found!" });
      return;
    }
    res.status(200).json(commentData);
    return;
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    console.log("delete comments");
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
