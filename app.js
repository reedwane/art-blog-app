const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// create an express app
const app = express();

// connecting to mongoDB
const dbURI =
	"mongodb+srv://reedwane:ayomide@cluster0.9yysg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(dbURI)
	.then((result) => {
		// listen at port
		const PORT = process.env.PORT || 3001;
		app.listen(PORT);
	})

	.catch((err) => console.log(err));

// setting the view engine as ejs
app.set("view engine", "ejs");

// middleware and static files
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Blog Routes
app.use("/blogs", blogRoutes);

// redirecting / to /blogs
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

// the about page
app.get("/about", (req, res) => {
	res.render("about", { title: "About" });
});

app.use((req, res) => {
	res.status(404).render("404", { title: "404" });
});
