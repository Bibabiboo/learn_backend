const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});

        if (Object.hasOwnProperty.bind(req.query)('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
