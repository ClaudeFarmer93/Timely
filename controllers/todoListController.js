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
    static createTodo(req, res, next){
        
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