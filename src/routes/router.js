'use strict';

const user = require('./api/users');
const todo = require('./api/todo');
const auth = require('./api/auth');

const router = (app) => {
    app.use('/api', auth);
    app.use('/api' , user);
    app.use('/api' , todo);
}

module.exports = router;