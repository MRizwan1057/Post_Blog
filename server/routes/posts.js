const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// Create Post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error.messages);
  }
});

// Update  Post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error.messages);
        console.log(error);
      }
    } else res.status(404).json("You cannot update except your own post");
  } catch (error) {
    res.status(500).json(error.messages);
    console.log(error);
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (error) {
        res.status(500).json(error.messages);
        console.log(error);
      }
    } else res.status(404).json("You cannot delete except your own post");
  } catch (error) {
    res.status(500).json(error.messages);
    console.log(error);
  }
});

// Get Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//Get All Post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
