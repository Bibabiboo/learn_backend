
const path = require('path');
const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars');
const route = require('./routes')

const app = express();
const port = 3000;
const hostname = 'localhost';

// static file logo-f8
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded()) // đưa data khi chúng ta post vào trong body theo dạng HTML (Form)
app.use(express.json()) // đưa data khi chúng ta post vào trong body theo dạng json (Fetch, XMLHttpRequest, axios...)


// HTTP logger
// app.use(morgan('combined'))

// Template engine (config path)
app.engine('hbs', handlebars.engine({
  extname: ".hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './sources/views'));

// Routes init
route(app)



app.listen(port, hostname, () => {
  console.log(`Example app listening on port http://${hostname}${port}`)
});

