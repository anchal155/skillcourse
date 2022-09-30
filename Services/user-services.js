var User = require('../Models/users').User;
var bcrypt = require('bcrypt');

exports.addUser = function(user, next){
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, function(err, hash){
            if(err){
                return next(err);
            }
            var newUser = new User({
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email.toLowerCase(),
                password: hash
            });

            newUser.save(function(err){
                if(err){
                    return next(err);
                }
                else{
                    next(null);
                }
            });
    });
   
}

exports.findUser = function(email,next){
    User.findOne({email:email.toLowerCase()},function(err,user){
        return next(err, user);
    });
};