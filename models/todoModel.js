var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var todoSchema = new Schema({
    id: Number,
    username: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    hasAttachment: Boolean
});


module.exports = mongoose.model('todolists', todoSchema);
