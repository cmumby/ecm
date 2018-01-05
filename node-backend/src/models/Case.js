//Case.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var Case = new Schema({
  desc: {
    type: String
  },

},{
    collection: 'Tasks'
});

module.exports = mongoose.model('TodoList', TodoList);
