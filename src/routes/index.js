
const  profileRouter = require('./profiles')
const  siteRouter = require('./sites')

function route(app) {
    // app.get('/profile', (req, res) => {
    //     res.render('profile'); // ('profile') : render file profile.hbs và đưa vào body của main.hbs
    // });
    app.use('/profile' , profileRouter)
        
    // app.get('/', (req, res) => {
    //     res.render('home');  // ('home') : render file home.hbs và đưa vào body của main.hbs
    //  });
    app.use('/', siteRouter)
    
    // app.get('/search', (req, res) => {
    //     res.render('search'); 
    // });
    app.use('/search', siteRouter)

    
    
}

module.exports =  route