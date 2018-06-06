var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Sarf = require('./Sarf');

var TransportationSarf = new Schema({
    sarf: Sarf,
    sectionComplete: Boolean
});