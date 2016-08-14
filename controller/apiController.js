var Todos = require('../models/todoModel');
var User = require('../models/userModel');
var authMiddleware = require('../middlewares/auth');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // register a new user
    app.post('/user/register', function(req, res) {

        // pick the right key to storage
        var body = _.pick(req.body, 'username', 'email', 'password');

        if (!_.isString(body.username) || !_.isString(body.password) || body.password.trim().length === 0) {
            return res.status(400).send('Oops! Something wrong happened. Todo is not saved');
        } else {
            var newUser = User({
                username: body.username,
                email: body.email,
                password: body.password
            });

            newUser.save(function(err) {
                if (err) {
                    console.log(err.errors.email.message);
                    throw err;
                }
                res.send('Save User Success')
            });
        }
    });

    app.post('/user/login', function(req, res) {
            var body = _.pick(req.body, 'username', 'password');

            User.findOne({
                    username: body.username
                }, function(err, user) {
                    if (err) throw err;

                    user.comparePassword(body.password, function(err, isMatch) {
                            if (err) {
                                throw error
                            } else if (isMatch) {

                                // create a token
                                var token = jwt.sign(user, app.get('superSecret'));

                                // return the information including token as JSON
                                res.header('auth',token).json({
                                    token: token
                                })
                        } else {
                            res.send('Ooh! Wrong password!');
                        }

                    });

            });

    });

var Auth = authMiddleware(app);


// get all todos
app.get('/api/todos', Auth.requireAuth ,function(req, res) {
    console.log(req.username);
    var queryParams = req.query;
    console.log(_.isEmpty(queryParams));

    // if query string is empty then find all todos
    if (!_.isEmpty(queryParams)) {
        console.log(queryParams);
        Todos.find(queryParams, function(err, todos) {
            if (err) throw err;
            res.send(todos);
        });
    } else {
        Todos.find({username: req.username}, function(err, todos) {
            if (err) throw err;
            res.send(todos);
        });
    }
});

// get user todo
app.get('/api/todos/:username', Auth.requireAuth, function(req, res) {
    Todos.find({
        username: req.params.username
    }, function(err, todos) {
        if (err) throw err;
        res.send(todos);
    });
});

// get current todo with id
app.get('/api/todo/:id', Auth.requireAuth, function(req, res) {

    // mongo default generated ID
    Todos.find({
        $or: [{
            _id: req.params.id
        }]
    }, function(err, todo) {
        if (err) throw err;
        res.send(todo);
    });

});

// sotrage a new todo
app.post('/api/todo', Auth.requireAuth, function(req, res) {
    // pick the right key to storage
    var body = _.pick(req.body, 'id', 'username', 'todo', 'isDone', 'hasAttachment');

    if (!_.isString(body.username) || !_.isString(body.todo) || body.todo.trim().length === 0) {
        return res.status(400).send('Oops! Something wrong happened. Todo is not saved');
    } else {
        var newTodo = Todos({
            id: body.id,
            username: body.username,
            todo: body.todo.trim(),
            isDone: body.isDone || false,
            hasAttachment: body.hasAttachment || false
        });

        newTodo.save(function(err) {
            if (err) throw err;
            res.send('Save Success')
        });
    }
});


// delete specific todo with mongoDB key _id
app.delete('/api/todo', Auth.requireAuth, function(req, res) {
    Todos.findByIdAndRemove(req.body.id, function(err) {
        if (err) throw err;
        res.send('Delete Success');
    })
});

// update a todo with mongoDB key _id
app.put('/api/todo', Auth.requireAuth, function(req, res) {
    var body = _.pick(req.body, 'id', 'username', 'todo', 'isDone', 'hasAttachment');

    Todos.findByIdAndUpdate(req.body.id, {
        username: body.username,
        todo: body.todo,
        isDone: body.isDone,
        hasAttachment: body.hasAttachment
    }, function(err, result) {
        if (err) throw err;
        res.send('Update todo ' + req.body.id + ' successful!');
    });
});

}
