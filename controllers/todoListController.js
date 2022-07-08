const TodoList = require("../models/todoListSchema");
const httpStatus = require("http-status-codes");

class TodoListController {
    static respondJSON = (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    }
    static errorJSON = (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    }
    static getAllTodo = (req, res) => {
        TodoList.find({})
            .exec()
            .then((todos) => {
                console.log(typeof (todos))
                if (req.query.format === "json") {
                    res.json(todos);
                } else {
                    res.render("todo", { todos: todos });
                }

            })
            .catch(error => console.log(error));

    };
    static getTodo = (req, res) => {
        const todoId = req.params.id;
        TodoList.find({})
            .exec()
            .then((todo) => {
                res.render("editTodo", { todos: todo, taskId: todoId })
            })
            .catch(error => console.log(error));
    };
    static createTodo(req, res, next) {

        console.log("############ CALLED ########");
        const payload = {
            content: req.body.content,
            owner: req.body.owner,
            updated_at: new Date(),
            created_at: new Date(),
        };

        //console.log(payload);
        TodoList.create(payload)
            .then(task => console.log(task))
            .then(console.log("suscess create a task"))
            .catch(error => console.log(error));
        res.redirect("/todos/");
    }


    static updateTodo = (req, res) => {
        const todoId = req.params.id;

        TodoList.findByIdAndUpdate(todoId, { content: req.body.content })
            .then(res.redirect("/todos/"))
            .catch(error => console.log(error));
    };

    static deleteTodo = (req, res) => {
        const todoId = req.params.id;
        TodoList.findByIdAndRemove(todoId)
            .then(res.redirect("/todos/"))
            .catch(error => console.log(error))
    }
};
module.exports = TodoListController;