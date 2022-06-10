const User = require("../models/userSchema");

class UserController{
    static loadRegisterPage(req, res, next){
        res.render("userRegisteration");
    }
    static register(req, res, next){
        
        console.log("############ CALLED ########");
        const payload = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            updated_at: new Date(),
            created_at: new Date(),
          };
        //const findEmail=User.findOne({email: req.body.email});
        
        console.log(payload);
        User.create(payload)
        .then(user => console.log(user))
        .then(console.log("suscess create an user"))
        .catch(error => console.log(error));
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
        User.findOne({userId})
            .exec()
            .then((user) => {
                console.log("###### User by Id: "+user);
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