var express = require('express');
var bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;// requiring Mongo
const mongoUrl = "'mongodb://localhost:27017/'";
const Database = require('./Database');

// declare a new express app
var app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// Enable CORS for all methods(in localhost dev env)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  console.log('checking server status');
  mongodb.connect(mongoUrl, {useUnifiedTopology:true, useNewUrlParser: true}, function (error) { //establishing connection between MongoDb and Node
    if (error) {
        console.log('MongoDB connection error ', error);
    } else {
        console.log('MongoDB connected successfully !!');
    }
  });
});

app.post('/api/signup', async (req, res) => {
  const user = req.body;
  console.log('Adding user:::::', user);
  await Database.insertUserData(user, res);
});

app.post('/api/login', async (req, res) => {
  console.log('LOGIN---', req.body);
  await Database.getUserData(req.body, res);
})

app.listen('3030', () => {
  console.log(`Server listening on the port::`);
});

module.exports = app;