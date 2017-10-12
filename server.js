console.log('May Dash be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

//database stuff
const MongoClient = require('mongodb').MongoClient
var db
MongoClient.connect('mongodb://dash:dashdb@ds117965.mlab.com:17965/dash-gordon-quotes', (err, database) => {
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
    res.render('index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  console.log('Here should be the quotes:')
  console.log(req.body)
  db.collection('quotes').save(req.body, (err, result) => {
  if (err) return console.log(err)

  console.log('saved to database')
  res.redirect('/')
  })
})
