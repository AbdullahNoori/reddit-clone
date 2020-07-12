module.exports = function(app) {
    // // const Post = require('../models/post');
// module.exports = function (app) {
//     // CREATE Comment
//     app.post("/post/:postId/comments", function (req, res) {
//         const comment = new Comment(req.body);
//         comment.author = req.user._id;
//         comment
//             .save()
//             .then(comment => {
//                 return Promise.all([
//                     Post.findById(req.params.postId)
//                 ]);
//             })
//             .then(([post, user]) => {
//                 post.comments.unshift(comment);
//                 return Promise.all([
//                     post.save()
//                 ]);
//             })
//             .then(post => {
//                 res.redirect(`/posts/${req.params.postId}`);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     });

//     app.put("/comment/:id/vote-up", function(req, res) {
//         Comment.findById(req.params.id).exec(function(err, comment) {
//             console.log('voting up _________________')
//             console.log('voting up _________________')
//             console.log('voting up _________________')
//             console.log('voting up _________________')
//             console.log('voting up _________________')
//             comment.upVotes.push(req.user._id);
//             comment.voteScore += 1;
//             if (comment.voteScore >= 0) {
//                 comment.positive = true;
//             }
//             else {
//                 comment.positive = false;
//             }
            
//             comment.save();
      
//             res.status(200);
//         });
//     });

//     app.put("/comments/:id/vote-down", function(req, res) {
//         Comment.findById(req.params.id).exec(function(err, comment) {
//             comment.downVotes.push(req.user._id);
//             comment.voteScore -= 1;
//             if (comment.voteScore >= 0) {
//                 comment.positive = true;
//             }
//             else {
//                 comment.positive = false;
//             }
//             comment.save();
      
//             res.status(200);
//         });
//     });
};