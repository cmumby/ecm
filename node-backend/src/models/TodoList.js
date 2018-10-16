//TodoList.js

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//schema
let TodoList = new Schema({
  desc: {
    type: String
  },

},{
    collection: 'Tasks'
});

module.exports = mongoose.model('TodoList', TodoList);
