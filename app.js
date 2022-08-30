const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const dbUrlLocal = "mongodb://localhost:27017/daily-journal";
const dbUrl =
  "mongodb+srv://admin:1239875@cluster0.l0bpsfp.mongodb.net/?retryWrites=true&w=majority/daily-journal";

const homeStartingContent = "To post a new content in the daily journal plese ";
const aboutContent =
  "I am a beginner programmer, looking for possibilities to start a career in the software industry where I’ll get an opportunity to expand my knowledge. I continually look for opportunities to develop myself. I am able to find creative solutions to technical problems and am excellent when learning new skills.";
const contactContent =
  "Feel free to contact me as I am open for any oportunities";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect(dbUrl);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
      id: post._id,
    });
  });
});

app.get("/posts/:postId/delete", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findByIdAndDelete(requestedPostId, function (err, post) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000);
