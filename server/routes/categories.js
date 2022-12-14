const router = require("express").Router();
const Category = require("../models/Category");

// Create a new category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Get all category
router.get("/", async (req, res) => {
  const categs = await Category.find();
  try {
    res.status(200).json(categs);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
