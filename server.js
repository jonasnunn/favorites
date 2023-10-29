// Require Statements
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const {} = './validation.js';


const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors());

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// app.use(session({
//   secret: process.env.PASSPORT_LONG_SECRET,
//   resave: false, 
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());


// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/secrets"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate(
//       { 
//           googleId: profile.id
//       }, 
//       function (err, user) {
//           return cb(err, user);
//       }
//   );
// }
// ));

// app.get("/auth/google", 
//     passport.authenticate("google", { scope: ["profile"] })
// );

// app.get("/auth/google/secrets", 
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/secrets");
// });