
const path = require('path');
const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars')



const app = express();
const port = 3000;
const hostname = 'localhost';

// static file logo-f8
app.use(express.static(path.join(__dirname, 'public')))


// HTTP logger
app.use(morgan('combined'))

// Template engine (handlebars)
app.engine('hbs', handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './sources/views'));

console.log(path.join(__dirname, 'sources/view'))

app.get('/', (req, res) => {
  res.render('home');  // ('home') : render file home.hbs và đưa vào body của main.hbs
});

app.get('/profile', (req, res) => {
  res.render('profile'); // ('profile') : render file profile.hbs và đưa vào body của main.hbs
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on port http://${hostname}${port}`)
});

