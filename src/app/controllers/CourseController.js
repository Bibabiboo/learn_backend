const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    // [GET] courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch((error) => next(error));
    }

    // [GET] courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${formData.videoId}/0.jpg`;
        const course = new Course(formData);

        course
            .save()
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch((error) => next(error));
    }

    // [GET] courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => res.render('courses/edit', { course: mongooseToObject(course) }))
            .catch((error) => next(error));
    }

    // [PUT] courses/:id
    update(req, res, next) {
        Course.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => next(error));
    }

    // [DELETE] courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => next(error));
    }

    // [DELETE] courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .catch((error) => next(error));
    }

    // [PATCH] courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/me/trash/courses'))
            .then(() => {
                return Course.updateOne({ _id: req.params.id }, { deleted: false });
            })
            .catch((error) => next(error));
    }

    // [POST] courses/handle-form-action
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/stored/courses'))
                    .catch((error) => next(error));

                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }

    // [POST] courses/handle-form-action
    handleFormActionsTrash(req, res, next) {
        switch (req.body.action) {
            case 'forceDelete':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .catch((error) => next(error));

            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('/me/trash/courses'))
                    .then(() => {
                        return Course.updateMany({ _id: { $in: req.body.courseIds } }, { deleted: false });
                    })
                    .catch((error) => next(error));
                break;
            default:
                res.json({ message: 'Action invalid' });
        }
    }
}

module.exports = new CourseController();
