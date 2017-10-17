console.log('May Dash be with you')
const express = require('express');
const bodyParser= require('body-parser')
//Require Mongoose
var mongoose = require('mongoose');
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use( express.static( "public" ));
app.set('view engine', 'ejs')

//database stuff

//Set up default mongoose connection
/*
var mongoDB = 'mongodb://root:root@ds117965.mlab.com:17965/dash-gordon-quotes';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var Quote = require('./models/Quotes')
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
*/

//pure MongoDB
const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://root:root@ds117965.mlab.com:17965/dash-gordon-quotes', (err, database) => {
  if (err) return console.log(err)
    db = database
    app.listen(50050, () => {
      console.log('listening on 50050')
  })
})


//handlers
app.get('/', (req, res) => {
  console.log('You are in directory:' + __dirname)
  res.sendFile(__dirname + '/index.html')
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)})
})

app.get('/quotes', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('quotes.ejs', {quotes: result});
  })
})

app.post('/quotes', (req, res) => {
  console.log('Here should be the quote:')
  console.log(req.body)
  /*
  //mongoose style
  var q = new Quotes();
  q.name = req.body.name;
  q.quote = req.body.quote;

  q.save(function(err){
    if (err)
      res.send(err);
    res.json({ message: 'Quote created: '})
  })
  */
  //remove all entries in db first
  db.collection('quotes').remove()
  //tehn post new one
  db.collection('quotes').save(req.body, (err, result) => {
  if (err) return console.log(err)
  console.log('saved to database')
  res.redirect('/')
})
})
