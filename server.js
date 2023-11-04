// Require Statements
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const cors = require("cors");
// const session = require("express-session");
// const MongoDBStore = require('connect-mongodb-session')(session);
const {} = './validation.js';


// const store = new MongoDBStore({
//   uri: process.env.MONGODB_URI,
//   collection: 'sessions', // Change this to your desired collection name
// });


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
  .use(cors())
  // .use(
  //   session({
  //     secret: '123456789',
  //     resave: false,
  //     saveUninitialized: false,
  //     store: store,
  //   })
  // );

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});




