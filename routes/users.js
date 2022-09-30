var express = require('express');
var passport = require('passport');
var config = require('../config');
var router = express.Router();
var userService = require('../Services/user-services');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', (req, res, next) => {
  var vm = {
    title: 'Sign Up'
  }
  res.render('users/create',vm);
});

router.post('/create', (req, res, next) => {

  userService.addUser(req.body, function(err){
    if(err){
      if (err.name === 'ValidationError') {
        var vm = {
          title: 'Sign Up',
          input: req.body,
          error: err
        }
        delete vm.input.password;
        return res.render('users/create', vm);
      }
    }
    req.login(req.body,function(err){
      res.redirect('/home');
    });
   
  });
  
});

router.post('/login', function(req, res, next){
  req.session.visitorNumber = 20000;
  if(req.body.rememberMe){
    req.session.cookie.maxAge=config.cookieAge;
  }
  next();
},

passport.authenticate('local',{
  failureRedirect:'/',
  successRedirect:'/home',
  failureFlash:'Invalid username or password'
}),function(req, res,next){
    res.redirect('/home');
})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    req.session.destroy();
    res.redirect('/');
  });
})


module.exports = router;
