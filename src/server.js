const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const route = require('./routes');
const database = require('./config/db/connect');

const app = express();
const port = 3000;

// CONNECT TO MONGODB
database.connect();

// static file logo-f8
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded()); // đưa data khi chúng ta post vào trong body theo dạng HTML (Form)
app.use(express.json()); // đưa data khi chúng ta post vào trong body theo dạng json (Fetch, XMLHttpRequest, axios...)

// HTTP logger
// app.use(morgan('combined'));

// Template engine (config path)
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './sources/views'));

// methodOverride: middleware để sử dụng method khác như (PUT, DELETE,...)
app.use(methodOverride('_method'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
