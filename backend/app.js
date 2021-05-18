const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const versionRoutes  = require('./routes/versions')

const app = express();

mongoose.connect('mongodb://localhost:27017/', { // <-- local
// mongoose.connect('mongodb+srv://admin:appuhami@cluster0.in9l4.mongodb.net/db?retryWrites=true/', { // <-- cloud
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(() => {
    console.log('Connection failed!');
});

// Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/angular'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
    next();
}));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use('/api/versions', versionRoutes);
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'));
})

module.exports = app;
