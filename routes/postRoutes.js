const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

// Get all posts
router.get("/", getPosts);

// Get single post
router.get("/:id", getPostById);

// Create post
router.post("/", authMiddleware, createPost);

// Update post
router.put("/:id", authMiddleware, updatePost);

// Delete post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;