const express = require('express'),
      bodyParser = require('body-parser'),
      passport = require("passport");

const connectDb = require('./config/db');

const app = express();

//added login route
const loginRoute = require("./routes/api/admin/loginRoute");

//Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//connect database
connectDb();


app.use(express.json({extended: false}));
app.get('/', (req,res) => res.send('Hello world'))

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./auth/passport")(passport);

//Routes
app.use("/api/admin/loginRoute", admin );

//port
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running successfully on port ${port}`));