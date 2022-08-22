const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent =
  "To post a new content in the daily journal plese ";

const aboutContent =
  "I am a beginner programmer, looking for possibilities to start a career in the software industry where I’ll get an opportunity to expand my knowledge. I continually look for opportunities to develop myself. I am able to find creative solutions to technical problems and am excellent when learning new skills.";

const contactContent =
  "Feel free to contact me as I am open for any oportunities";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts,

    
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
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {

  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title)

    if (requestedTitle === storedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });

});
  
app.listen(process.env.PORT || 3000);

