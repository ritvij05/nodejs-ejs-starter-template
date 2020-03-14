var port = process.env.PORT || 3000;
var session = require('express-session');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const dateTime = require('date-time');
var session = require('express-session');


//joining path of directory 
//const directoryPath = path.join(__dirname, 'public/uploads');


//memory leak issue solving line and session creation
var MemoryStore = require('memorystore')(session)

// app.use(express.cookieParser());
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
    secret: 'secret docs'
  }))

//including public folder for accessing files present in public folder
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//Setting the homepage or start page Route
app.get('/', function (req, res) {
    // res.redirect('/');
    res.render('pages/index', { title: "Online-Portal" });
});

app.listen(port, function () {
    console.log('Listening at port 3000');
});