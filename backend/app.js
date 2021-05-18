const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Post = require('./modals/post');

const app = express();
// mongoose.connect('mongodb://localhost:27017/')
//     .then(() => {
//         console.log('Connected to DB!');
//     })
//     .catch(() => {
//         console.log('Connection failed!');
//     });

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../dist/CRUDApi'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'GET, POST, PATCH, DELETE, PUT, OPTIONS'
//     );
//     next();
// }));

module.exports = app;
