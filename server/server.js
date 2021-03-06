const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var logger = require("morgan");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.set('secretKey', 'nodeRestApi');

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
}));

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "You have reached a MongoDB Api"});
});



function ensureAuthenticated(req, res, next) {

console.log(req.ensureAuthenticated);
return next()
}

app.use('/module', ensureAuthenticated);


require('./app/routes/module.routes.js')(app);
require('./app/routes/users.routes.js')(app);

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});