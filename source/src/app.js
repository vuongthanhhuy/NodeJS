const express = require('express');

const app = express();

app.use(express.json());

const cors = require('cors');

app.use(cors());

app.listen(8080);

const serverConfig = require('./configs/serverConfig');
const server = serverConfig(app, __dirname);

const rootRoute = require('./routes/rootRoute');

app.use("/", rootRoute);