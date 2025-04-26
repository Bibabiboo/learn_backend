const profileRouter = require('./profiles');
const siteRouter = require('./sites');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    // app.get('/profile', (req, res) => {
    //     res.render('profile'); // ('profile') : render file profile.hbs và đưa vào body của main.hbs
    // });
    app.use('/profile', profileRouter);

    // Page me/stored/courses
    app.use('/me', meRouter);

    // Page course detail
    app.use('/:slug', coursesRouter);

    // app.get('/search', (req, res) => {
    //     res.render('search');
    // });
    app.use('/search', siteRouter);

    // app.get('/', (req, res) => {
    //     res.render('home');  // ('home') : render file home.hbs và đưa vào body của main.hbs
    //  });
    app.use('/', siteRouter);
}

module.exports = route;
