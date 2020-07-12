postsRoute = require("../controllers/posts.js")
commentsRoute = require("../controllers/comments.js")
repliesRoute = require("../controllers/replies.js")
authRoute = require("../controllers/auth.js")

var express = require('express');
var router = express.Router();

router.use('/', postsRoute);
// router.use('/', commentsRoute);
// router.use('/', repliesRoute);
router.use('/', authRoute);

module.exports = router;

