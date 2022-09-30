var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');
var course = require('../Services/courses-service');

/* GET home page. */
router.get('/', restrict,function(req, res, next) {
    // course.getCourses(function(err, courses){
    //   if(err){
    //     return res.status(500).json({
    //       error:"failed to retrieve json data"
    //     });
    //   }
    //   console.log(courses);
    //   res.json(courses);
    // })
    res.render('courses/', {
      title: 'Dashboard'
    })
});

module.exports = router;