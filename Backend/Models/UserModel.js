const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
},
{
    versionKey: false
});

module.exports = mongoose.model('user', usersSchema);
