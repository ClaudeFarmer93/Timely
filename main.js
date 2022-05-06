const port = 3000,
  express = require("express"),
  app = express();

//add home controller
const homeController = require("./controllers/homeController");

//middleware print req Url
app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

// router

app.get("/todos/:alltodos", homeController.sendReqParam);

app
  .get("/", (req, res) => {
    res.send("Welcome to Timely");
  })

  // server
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening
➥ on port number: ${port}`);
  });

// test commit
// tets

// test
