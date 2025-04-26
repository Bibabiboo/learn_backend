const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    // [GET] /home
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
                // res.json(courses);
            })

            .catch((error) => next(error));
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
