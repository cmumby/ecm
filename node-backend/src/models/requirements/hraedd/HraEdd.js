var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Edd = require('./Edd');

var HraEdd = new Schema({
    edd: Edd,
    sectionComplete: Boolean
});