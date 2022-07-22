const User = require("../models/userSchema");

const token = process.env.TOKEN || "todoT0k3n";
const passport = require("passport");
class UserController {

    static verifyToken = (req, res, next) => {
        let token = req.query.apiToken;
        if (token) {
            User.findOne({ apiToken: token })
                .then(user => {
                    if (user) next();
                    else next(new Error("Invalid API token."));
                })
                .catch(error => {
                    next(new Error(error.message));
                });
        } else {
            next(new Error("Invalid API token."));
        }
    }
    /*     static authenticate = passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: "Failed to login.",
            successRedirect: "/",
            successFlash: "Logged in!"
        }) */
    static loadRegisterPage(req, res, next) {
        res.render("userRegisteration");
    }
    static loadUserPage(req, res) {
        const userId = req.params.id;
        console.log("#####here#### " + req.params.id);
        User.findOne({ _id: userId })
            .exec()
            .then((user) => {
                console.log("###### User by Id: " + user);
                console.log(user.fullname);
                res.render("userPage", { userId: user });
            })
            .catch(error => console.log(error));
    }
    static userLogin(req, res, next) {
        res.render("login");
    }
    static authenticate(req, res, next) {
        console.log("##### LOGIN ATTEMPT ####");
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    user.passwordComparison(req.body.password)
                        .then(passwordsMatch => {

                            console.log(passwordsMatch)
                            if (passwordsMatch) {
                                console.log(user._id.toString());
                                let temp = user._id.toString();
                                res.redirect(`/users/${temp}`);
                                //req.flash("success", `${user.fullName}'s logged in successfully!`);
                                console.log("success", `${user.fullname}'s logged in successfully!`);
                                //res.user = user;
                                console.log("############### ", res.locals);
                            } else {
                                //req.flash("error", "Failed to log in user account: Incorrect Password.");
                                console.log("error", "Failed to log in user account: Incorrect Password.");
                                res.redirect("/users/login");
                            }
                            next();
                        });
                } else {
                    //req.flash("error", "Failed to log in user account: User account not found.");
                    console.log("error", "Failed to log in user account: User account not found.");
                    res.redirect("/");
                    next();
                }
            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    }
    static redirectView(req, res, next) {
        console.log("error here redirect");
    }
    static register(req, res, next) {

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
                //req.flash("success", `${user.fullname}'s account created successfully!`);
                res.redirect("/login");
                console.log("suscess create an user", res.locals);
                //res.locals.user = user;
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