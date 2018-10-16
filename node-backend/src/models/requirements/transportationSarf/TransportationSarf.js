let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Sarf = require('./Sarf');

let TransportationSarf = new Schema({
    sarf: Sarf,
    sectionComplete: Boolean
});