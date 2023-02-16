require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const indexRoute = require("./routes/index");
const passport = require("passport");
var expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const dbuser = "Ruben";
const dbpass = "ybYVqK8bjO3szOeF";

const app = express();
require("./config/passport")(passport);
mongoose.set("strictQuery", false);

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoute);
app.use("/auth", userRoute);

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.aab9zko.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(3000);
    console.log("conectou ao banco🔥🔥🔥");
  })
  .catch((err) => console.log(err));
