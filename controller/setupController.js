var Todos = require('../models/todoModel');

module.exports = function(app){

    app.get('/api/setupTodos', function(req, res){

        // seed database
        var starterTodos = [
            {
                id: 1,
                username: 'andy',
                todo: 'Buy a cup of coffee',
                isDone: false,
                hasAttachment: false
            },
            {
                id: 2,
                username: 'nicky',
                todo: 'feed dog',
                isDone: false,
                hasAttachment: false
            },
            {
                id: 3,
                username: 'faith',
                todo: 'go swimming',
                isDone: false,
                hasAttachment: false
            },
            {
                id: 4,
                username: 'andy',
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
