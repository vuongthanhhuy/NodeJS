const express = require('express');
const path = require('path');
const ejs = require('ejs');

const ejsConfig = (app, __dirname) => {
    app.use(express.static(path.join(__dirname, 'views')));
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
}

module.exports = ejsConfig
