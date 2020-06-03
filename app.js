const express = require('express'),
      bodyParser = require('body-parser'),
      passport = require("passport");
      mongoose = require("mongoose");
      config = require("./config");
      path = require("path");
      logger = require('morgan');
      cookieParser = require("cookie-parser"),
      adminRouter = require("./routes/loginRoute"),
      eventRouter = require("./routes/eventRoutes"),
      userRouter = require("./routes/userRoute"),
      multer = require("multer");

var cors = require('cors');
var app = express();

app.use(express.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true 
}

app.use(cors(corsOptions));

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
app.use("/admin/dashboard/",eventRouter);
app.use("/user", userRouter);
//port
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running successfully on port ${port}`));