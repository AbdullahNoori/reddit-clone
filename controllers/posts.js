module.exports = app => {
    // CREATE
    app.post("/posts/new", (req, res) => {
      console.log(req.body);
    });
  };
  // Let's edit our INDEX call in our posts.js
  Post.find({}).lean()
  .then(posts => {
    res.render("posts-index", { posts });
  })
  .catch(err => {
    console.log(err.message);
  });
  