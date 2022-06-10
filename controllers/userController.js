const User = require("../models/userSchema");

class UserController{
    static register(req, res, next){
        const payload = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
          };
        const findEmail=User.find({email: req.body.email});
        if (findEmail){
            throw{name: "Bad Request", message: "Email is already registered"};
        } else {
            User.create(payload)
            .then(console.log("suscess create an user", result))
            .catch(error => console.log(error));
        }
    }
}
module.exports = UserController;