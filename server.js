const express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const router = require("./routes/index.js")
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


require('dotenv').config();
app.use(cookieParser()); // Add this after you initialize express.



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
              defaultLayout: 'main',
              layoutsDir: __dirname + '/views/layouts/',
              partialsDir: __dirname + '/views/partials/',
              }));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "public")));


// require('./controllers/posts.js')(app);
require('./data/reddit-db');

// require('./controllers/auth.js')(app);
// require('./controllers/comments.js')(app);
app.use(router)


const port = 8000;
app.listen(port, () => console.log(`Reddit app listening on port ${port}!`))

module.exports = app;