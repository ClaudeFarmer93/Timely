const router = require("express").Router();
//add home controller
const homeController = require("./controllers/homeController");
const TodoController = require("./controllers/TodoListController");

//middleware print req Url
router.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  });

router.get("/", homeController.sendReqParam);
router.get("/todos/:alltodos", TodoController.getAllTodo);
router.post("/addTodo", TodoController.createTodo);
router.post("/updateTodo/:id", TodoController.updateTodo);
router.get("/deleteTodo/:id", TodoController.deleteTodo);
router.get("/updatePage/:id", TodoController.updatePage);
module.exports = router;