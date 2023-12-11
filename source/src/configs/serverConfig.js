const express = require('express');
const ejsConfig = require('./ejsConfig');
const sessionConfig = require('./sessionConfig')
const bodyParser = require('body-parser');

const serverConfig = (app, __dirname) => {
    const ejs = ejsConfig(app, __dirname);
    const session = sessionConfig(app);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
}

module.exports = serverConfig