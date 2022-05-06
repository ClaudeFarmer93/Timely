const router = require("express").Router();
//add home controller
const homeController = require("./controllers/homeController");

//middleware print req Url
router.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  });

router.get("/todos/:alltodos", homeController.sendReqParam);


module.exports = router;