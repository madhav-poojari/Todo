const express = require("express");
const router = express.Router();
const Post = require("../../models/PostSchema");
const auth = require("../../middleware/mid");

// get all global todo's
router.get("/allTodos", (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }
    res.json(posts);
  });
});

router.get("/:userId", auth, (req, res) => {
  const userId = req.params.userId;
  Post.find({ userid: userId }, (err, posts) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.json(posts);
  });
});

//add a new todo
router.post("/newtodo", (req, res) => {
  const post = new Post({
    title: req.body.title,
    userid: req.body.userid,
    priority: req.body.priority,
    status: req.body.status,
  });

  post.save((err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(post);
  });
});

//updating a certain todo
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const update = {};
  if (req.body.title) {
    update.title = req.body.title;
  }
  if (req.body.priority) {
    update.priority = req.body.priority;
  }
  if (req.body.status) {
    update.status = req.body.status;
  }
  Post.findByIdAndUpdate(id, { $set: update }, { new: true }, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });
});

//deleting a certain todo
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id, (err, post) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  });
});

module.exports = router;
