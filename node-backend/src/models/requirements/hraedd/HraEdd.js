let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Edd = require('./Edd');

let HraEdd = new Schema({
    edd: Edd,
    sectionComplete: Boolean
});