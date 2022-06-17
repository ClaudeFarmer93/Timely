const router = require("express").Router();
//add home controller
const homeController = require("./controllers/homeController");
const TodoController = require("./controllers/TodoListController");
const errorCtrl = require("./controllers/errorController");
const UserController = require("./controllers/userController");
const expressSession = require("express-session"),
 cookieParser = require("cookie-parser"),
 connectFlash = require("connect-flash");

 //flash-messages modules
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
 secret: "secret_passcode",
 cookie: {
 maxAge: 4000000
 },
 resave: false,
 saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
 });

//middleware print req Url
router.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
  });

router.get("/", homeController.sendReqParam);
router.get("/todos/", TodoController.getAllTodo);
router.get("/getTodo/:id", TodoController.getTodo);
router.post("/addTodo", TodoController.createTodo);
router.post("/updateTodo/:id", TodoController.updateTodo);
router.get("/deleteTodo/:id", TodoController.deleteTodo);
router.get("/userRegister", UserController.loadRegisterPage);
router.post("/users/create", UserController.register);
router.get("/users", UserController.loadUserPage);
router.get("/users/:id", UserController.loadUserPage);
router.get("/users/login", UserController.userLogin);
router.post("/users/login", UserController.authenticate, UserController.redirectView);


//error controller
router.use(errorCtrl.respondNoResourceFound);
router.use(errorCtrl.respondInternalError);
module.exports = router;

