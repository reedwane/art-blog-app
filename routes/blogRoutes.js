const express = require("express");
const blogController = require("../controller/controller");

const router = express.Router();

// Home
router.get("/", blogController.blog_index);

//posting a new blog
router.post("/", blogController.blog_create_post);

// the page for creating a new blog
router.get("/create", blogController.blog_create_get);

// getting the details for each blog page
router.get("/:id", blogController.blog_details);

//deleting a blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
