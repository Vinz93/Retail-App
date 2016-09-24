const express = require('express');
const passport = require('passport');
const morgan = require('morgan');

const categories = require('./routes/categories.js');
const products = require('./routes/products.js');
const users = require('./routes/users.js');

var app = express();
//==== bd connection and passport config =====
var connection = require('./config/db');
require('./config/passportAuth')(passport);

app.use(morgan('dev'));
// ====== passport configuration ========
app.use(require('express-session')({secret: "my Secret key"}));
app.use(passport.initialize());
app.use(passport.session());
// ====== routes ======
app.use('/categories',categories);
app.use('/products',products);
app.use('/users',users);
require('./routes/auth')(app, passport);
//====== client front end ======
app.use(express.static("public"));

module.exports = app;
