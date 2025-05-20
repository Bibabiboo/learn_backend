const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, documentsDeleted]) =>
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(courses),
                    documentsDeleted,
                }),
            )
            .catch((error) => next(error));
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) => {
                res.render('me/trash-courses', { courses: mutipleMongooseToObject(courses) });
            })
            .catch((error) => next(error));
    }
}

module.exports = new MeController();
