
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName : {type: String, required:'First Name is mandatory'},
    lastName : {type: String, required:'last Name is mandatory'},
    email: {type: String, required:'Email is mandatory'},
    password: {type: String, required:'password is mandatory'},
    created: {type: Date, default: Date.now}
});


var User = mongoose.model('User', userSchema);

module.exports = {
    User: User
}