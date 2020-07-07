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


  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id)
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });