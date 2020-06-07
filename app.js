//require packages
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


//require cors package
var cors = require('cors');
//using express
var app = express();
//using express.json instead of body parser
app.use(express.json());
//using cors
var corsOptions = {
  origin: 'https://stackhackevent.herokuapp.com',
  credentials: true 
}
app.use(cors(corsOptions));
//using passport
app.use(passport.initialize());
app.use(passport.session());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//connect to mongodb atlas
var connect = mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connect.then(() => {
    console.log("Connected to Database");
  })
    .catch((err) => console.log(err));

//require admin router
app.use("/admin",adminRouter);
//require event dashboard on admin side route
app.use("/admin/dashboard/",eventRouter);
//require user side route
app.use("/user", userRouter);
//port
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running successfully on port ${port}`));