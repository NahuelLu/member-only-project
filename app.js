require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signupRouter');
const postRouter = require("./routes/postRouter")
const joinClubRouter = require("./routes/joinRouter")
const mongoose = require("mongoose");
const app = express();
//Packages required to authentication 
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user")
const bcrypt = require("bcryptjs")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//Connect to MongoDB using mongoose
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_DB_KEY
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("App was connected sucessfully to MongoDB!")
}



app.use(logger('dev'));
app.use(express.json());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
)
passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
})

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})


app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/"
  })
)
app.get("/log-in",(req,res) => {
  res.render("log-in-form",{
    title: "Login form "
  })
})
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
})
app.get("/welcome", (req,res) => {
  res.render("welcome",{
    title: "Welcome"
  })
})
app.use('/', indexRouter);
app.use("/sign-up", signupRouter)
app.use("/post", postRouter)
app.use("/join-club", joinClubRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
