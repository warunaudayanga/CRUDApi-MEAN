const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const versionRoutes  = require('./routes/versions')
const authRoutes  = require('./routes/auth')

const app = express();

const dbUrl = {local: 'mongodb://localhost:27017/db', cloud: 'mongodb+srv://admin:appuhami@cluster0.in9l4.mongodb.net/db'}
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(dbUrl.cloud, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle CORS access
app.use(((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, PUT, OPTIONS'
    );
    next();
}));

// Serve only the static files for path '/'
app.use('/', express.static(path.join(__dirname, 'angular')));

// routes
app.use('/api/versions', versionRoutes);
app.use('/api/auth', authRoutes);

// Serve the static files for other paths
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'angular', 'index.html'));
})

module.exports = app;
