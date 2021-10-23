const Blog = require("../models/blogs");

// fetching home blogs
const blog_index = (req, res) => {
	Blog.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render("blogs/index", { title: "Home", blogs: result });
		})
		.catch((err) => console.log(err));
};

// getting blog details
const blog_details = (req, res) => {
	const id = req.params.id;
	Blog.findById(id)
		.then((result) => {
			console.log(result);
			res.render("blogs/blog", {
				blog: result,
				title: result.title,
			});
		})
		.catch((err) => res.status(404).render("404", { title: "Blog not found" }));
};

// getting create page
const blog_create_get = (req, res) => {
	res.render("blogs/create", { title: "Create a new blog" });
};

// creating a post
const blog_create_post = (req, res) => {
	if (req.body) {
		try {
			const blog = new Blog({
				title: req.body.title,
				snippet: req.body.snippet,
				author: req.body.author,
				post: req.body.post,
			});

			blog
				.save()
				.then((result) => {
					console.log(result);
					res.redirect("/blogs");
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.log(error);
		}
		console.log(req.body);
	}
};

// deleting a blog
const blog_delete = (req, res) => {
	const id = req.params.id;

	Blog.findByIdAndDelete(id)
		.then((result) => res.json({ push: "/blogs" }))
		.catch((err) => console.log(err));
};

// exports
module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_delete,
};
