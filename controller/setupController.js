var Todos = require('../models/todoModel');

module.exports = function(app){

    app.get('/api/setupTodos', function(req, res){

        // seed database
        var starterTodos = [
            {
                username: 'andytest',
                todo: 'Buy a cup of coffee',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'nickytest',
                todo: 'feed dog',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'faithtest',
                todo: 'go swimming',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'andytest',
                todo: 'go hiking',
                isDone: false,
                hasAttachment: false
            },
        ];

        // create data seed and return connection status
        Todos.create(starterTodos, function(err, results){
            res.send(results);
        });

    });

}
