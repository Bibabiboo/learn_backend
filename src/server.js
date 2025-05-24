const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const $ = require('jquery');

const route = require('./routes');
const database = require('./config/db/connect');
const SortMiddleware = require('./app/SortMiddlewares/SortMiddlewares');

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
            //sort = req.query
            sortable: (field, sort) => {
                const sortTypes = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                };

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                };

                const icon = icons[sortTypes];
                const type = types[sortTypes];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <i class="${icon}"></i>
                        </a>`;
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './sources/views'));

// methodOverride: middleware để sử dụng method khác như (PUT, DELETE,...)
app.use(methodOverride('_method'));
// Sort Middleware
app.use(SortMiddleware);

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
