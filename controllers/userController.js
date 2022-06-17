const User = require("../models/userSchema");

class UserController {
    static loadRegisterPage(req, res, next) {
        res.render("userRegisteration");
    }
    static loadUserPage(req, res) {
        const userId = req.params.id
        res.render("userPage", { userId: userId });
    }
    static userLogin(req, res, next) {
        res.render("login");
    }
    static authenticate(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then(user => {
                if (user && user.password === req.body.password) {
                    res.redirect(`/users/${user._id}`);
                    req.flash("success", `${user.fullName}'s logged in successfully!`);
                    res.user = user;
                    console.log("test here");
                    next();
                } else {
                    req.flash("error", "Your account or password is incorrect.Please try again or contact your system administrator!");
                    res.locals.redirect = "/users/login";
                    next();
                }
            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });

        
    }
    static redirectView(req, res, next) {
        console.log("error here");
    }
    static register(req, res, next) {

        console.log("############ CALLED ########");
        const payload = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            updated_at: new Date(),
            created_at: new Date(),
        };

        console.log(payload);
        User.create(payload)
            .then(user => {
                req.flash("success", `${user.fullname}'s account created successfully!`);
                res.redirect("/users");
                console.log("suscess create an user", res.locals);
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                res.redirect("/userRegister");
                req.flash(
                    "error",
                    `Failed to create user account because: ${error.message}.`
                );
                next();

            });
    }
    static getAllUser = (req, res) => {
        User.find({})
            .exec()
            .then((user) => {
                console.log(user)
                //res.render("userRegisteration", { todos: todos });
            })
            .catch(error => console.log(error));

    };
    static getUserById = (req, res) => {
        const userId = req.params.id;
        User.findOne({ userId })
            .exec()
            .then((user) => {
                console.log("###### User by Id: " + user);
            })
            .catch(error => console.log(error));
    };

    static updateUser = (req, res) => {
        const userId = req.params.id;

        User.findByIdAndUpdate(userId, { content: req.body.content })
            .then(console.log("###### User Updated ######"))
            .catch(error => console.log(error));
    };

    static deleteUser = (req, res) => {
        const userId = req.params.id;
        TodoList.findByIdAndRemove(userId)
            .then(console.log("###### User Deleted ######"))
            .catch(error => console.log(error))
    }
}
module.exports = UserController;