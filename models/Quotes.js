var mongoose     = require('mongoose');
//define a schema
var Schema = mongoose.Schema;

var QuotesSchema = new Schema({
  name: {type: String, default: 'Dash Gordon'},
  quote: String,
  updated: { type: Date, default: Date.now }
})

//compile model from schema
var QuotesModel = mongoose.model('quotes', QuotesSchema );
