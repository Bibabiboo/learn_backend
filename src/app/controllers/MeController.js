const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourse(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('me/stored-courses', { courses: mutipleMongooseToObject(courses) });
            })
            .catch((error) => next(error));
    }
}

module.exports = new MeController();
