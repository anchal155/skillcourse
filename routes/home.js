var express = require('express');
var router = express.Router();
var course = require('../Services/courses-service');
var restrict = require('../auth/restrict');

router.get('/', (req, res, next) => {
    res.render('home', {title: 'Dashboard', css: '1', firstname: req.user ? req.user.firstName:null, visitorNumber: req.session.visitorNumber});
});

router.get('/api/courses',restrict,function(req,res,next){
    course.getCourses(function(err,courses){
      if(err){
        return res.status(500).json({error:'Failed to retrieve courses'});
      } 
      res.json(courses);
    })
  })


  router.get('/api/course-details/:courseId', function(req, res, next){
    course.getCourseDetails(req.params.courseId, function(err, course){
      if(err){
        return res.status(500).json({
          error: 'Failed to retrieve details'
        })
      }
      res.json(course);
    });
  });

module.exports = router;