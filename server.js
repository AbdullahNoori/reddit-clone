nnconst express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var routes = require('./routes');

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

require('dotenv').config();
app.use(cookieParser()); // Add this after you initialize express.

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    // req.user = null;
    console.log(`User ${req.user} is not logged in`)
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

// view engine Setup
app.engine('hbs', hbs({extname: 'hbs',
              defaultLayout: 'layout',
              layoutsDir: __dirname + '/views/layouts/',
              partialsDir: __dirname + '/views/partials/',
              }));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "public")));


require('./controllers/posts.js')(app);
require('./data/reddit-db');
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

// app.use(app.router); // **this line will be removed**


// Routes
app.get('/', (req, res) => {
  res.render("posts-index.hbs");
})

app.get('/post/new', (req, res) => {

  res.render("post-new.hbs");
})



module.exports = app;


const port = 7000;
app.listen(port, () => console.log(`Reddit app listening on port ${port}!`))
