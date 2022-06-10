const TodoList = require("../models/todoListSchema");

class TodoListController {
    static getAllTodo = (req, res) => {
        TodoList.find({})
            .exec()
            .then((todos) => {
                //  console.log(todos)
                res.render("todo", { todos: todos });
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
    static createTodo = (req, res) => {
        const todoTask = new TodoList({
            content: req.body.content
        });
        todoTask.save()
            .then(result => console.log(result))
            .catch(error => console.log(error));
        res.redirect("/todos/");
    };

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