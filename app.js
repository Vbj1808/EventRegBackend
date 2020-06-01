const express = require('express'),
      bodyParser = require('body-parser'),
      passport = require("passport");
      mongoose = require("mongoose");
      config = require("./config");
      path = require("path");
      logger = require('morgan');
      cookieParser = require("cookie-parser"),
      adminRouter = require("./routes/loginRoute");

var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var connect = mongoose.connect(config.mongoUrl, { useNewUrlParser: true });

connect.then(() => {
    console.log("Connected to Database");
  })
    .catch((err) => console.log(err));


app.use("/admin",adminRouter);
//port
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running successfully on port ${port}`));