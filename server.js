//module imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/chromeraData');

mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb database @ 27017");
});

mongoose.connection.on('error', (error) => {
    if(error) console.log("Failed to connect to mongodb database @ 27017: "+ error);
});

//port
const PORT = 8080;

//middlewares
app.use(cors());
app.use(bodyparser.json());

//routes
const route_api = require('./routes/api');
app.use('/api', route_api);

app.get('/', (req, res) => {
    res.send('We are on home');
})

app.get('/posts', (req, res) => {
    res.send('We are on posts');
})

app.listen(PORT, () => {
    console.log('Server started at port: '+ PORT);
});

