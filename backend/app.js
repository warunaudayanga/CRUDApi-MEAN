const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Version = require('./modals/version');

const app = express();
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(() => {
    console.log('Connection failed!');
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/../dist/CRUDApi'));

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

app.post('/api/versions', ((req, res) => {
    const version = new Version({
        name: req.body.name,
        status: req.body.status,
    });
    version.save().then(createdVersion => {
        res.status(201).json({
            versionId: createdVersion._id
        })
    })
}));

app.get('/api/versions', (req, res) => {
    Version.find().then(docs => {
        res.status(200).json({
            versions: docs
        });
    })
});

app.put('/api/versions/:id', (req, res) => {
    const version = new Version({
        _id: req.body.id,
        name: req.body.name,
        status: req.body.status
    });
    Version.updateOne({_id: req.params.id}, version).then(() => {
        res.status(200).end();
    })
})

app.delete('/api/versions/:id', (req, res) => {
    Version.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).end();
    })
})

module.exports = app;
