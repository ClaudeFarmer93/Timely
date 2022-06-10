const router = require("express").Router();
//add home controller
const homeController = require("./controllers/homeController");
const TodoController = require("./controllers/TodoListController");
const errorCtrl = require("./controllers/errorController");
const UserController = require("./controllers/userController");

//middleware print req Url
router.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  });

router.get("/", homeController.sendReqParam);
//Changed from "/todos/:alltodos"
router.get("/todos/", TodoController.getAllTodo);
router.get("/getTodo/:id", TodoController.getTodo);
router.post("/addTodo", TodoController.createTodo);
router.post("/updateTodo/:id", TodoController.updateTodo);
router.get("/deleteTodo/:id", TodoController.deleteTodo);
router.get("/userRegister", UserController.loadRegisterPage);
router.post("/users/create", UserController.register);


//error controller
router.use(errorCtrl.respondNoResourceFound);
router.use(errorCtrl.respondInternalError);
module.exports = router;