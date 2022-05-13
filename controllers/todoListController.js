const TodoList = require("../models/todoListSchema");

class TodoListController {
    static getAllTodo = (req, res) => {
        TodoList.find({})
            .exec()
            .then((todos) => {
                console.log(todos)
                res.render("todo", {
                    todos: todos
                });
            })
        //res.send(`This is the page for ${todos}`);

    };
    static createTodo = (req, res) => {
        const todoTask = new TodoList({
            content: req.body.content
        });
        todoTask.save()
            .then(result => console.log(result))
            .catch(error => console.log(error));
        res.redirect("/todos/:alltodos");
    };

    static updatePage = (req, res) => {
        const todoId = req.params.id;
        TodoList.find({}, (error, todo) =>{
            if(error) return res.send(500, error);
            res.render("editTodo", {todos:todo, taskId:todoId});
        });
    };

    static updateTodo = (req, res) => {
        const todoId = req.params.id;

        TodoList.findByIdAndUpdate(todoId, {content: req.body.content}, error =>{
            if (error) return res.send(500, error);
            res.redirect("/todos/:alltodos");
        });
    };

    static deleteTodo = (req, res) =>{
        const todoId = req.params.id;
        TodoList.findByIdAndRemove(todoId, error =>{
            res.redirect("/todos/:alltodos")
        })
    }
};
module.exports = TodoListController;