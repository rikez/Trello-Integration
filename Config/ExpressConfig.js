let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let autoload = require('consign');
let environmentVars = require('dotenv');
environmentVars.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

autoload()
    .include('App/Core')
    .then('App/Repository')
    .then('App/Services')
    .then('App/Middlewares')
    .then('App/Controllers')
    .then('App/Routes.js')
    .into(app);

module.exports = app;



