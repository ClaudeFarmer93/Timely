const port = 3000,
  express = require("express"),
  app = express();

const routers = require("./router.js");
const errorCtrl = require("./controllers/errorController");

// router
app.use(routers);
//view
app.set("view engine", "ejs");

app
  .get("/", (req, res) => {
    res.send("Welcome to Timely");
  })
  // server
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
  });

// test

//error controller
app.use(errorCtrl.respondNoResourceFound);
app.use(errorCtrl.respondInternalError);
