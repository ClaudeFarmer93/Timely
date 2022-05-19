require("./config/mongoose");

const routers = require("./router.js");
const bp = require("body-parser");

const port = 3000,
  express = require("express"),
  app = express();

//Body parser Because we are using Express@4 we need to install the body-parser package
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
// Router
app.use(routers);
// Views
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`The Express.js server has started and is listening
on port number: ${port}`);
});
//Public folder
app.use(express.static("public"));

