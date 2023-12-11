const express = require('express');
const session = require('express-session');

const sessionConfig = (app) => {
    app.use(session({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30 * 60 * 100
        }
    }));
}

module.exports = sessionConfig
