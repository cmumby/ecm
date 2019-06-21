//Case.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Requirement = require('./requirements/Requirement');
const Research = require('./research/Research');
const Attachment = require('./Attachment');


//schema
const Case = new Schema({ 
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
    collection: 'Cases',
    usePushEach: true
});
module.exports = mongoose.model('Case', Case);
