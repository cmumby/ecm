//Case.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Requirement = require('./requirements/Requirement');
let Research = require('./research/Research');
let Attachment = require('./Attachment');


//schema
let Case = new Schema({ 
  ecmId: Number,
  assignee: String,
  type: String,
  name: String,
  status: String,
  statusTimestamp: Date,
  notes: String,
  attachments: [Attachment],
  requirement: Requirement,
  research: Research
  

}, {
    collection: 'Cases'
});
module.exports = mongoose.model('Case', Case);
