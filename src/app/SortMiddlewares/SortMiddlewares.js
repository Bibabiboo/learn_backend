function SortMiddleware(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default',
    };

    if (Object.hasOwnProperty.bind(req.query)('_sort')) {
        Object.assign(res.locals._sort, {
            enable: true,
            type: req.query.type,
            column: req.query.column,
        });
    }

    next();
}

module.exports = SortMiddleware;
