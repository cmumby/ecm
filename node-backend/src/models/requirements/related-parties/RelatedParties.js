var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RelatedPartiesAuthorizedPersons = require('./RelatedPartiesAuthorizedPersons');
var ControlProngs = require('./ControlProngs');

var RelatedParties = new Schema({
    relatedPartiesAuthorizedPersons: RelatedPartiesAuthorizedPersons,
    authorizedPersons: ControlProngs, // needs same schema as control prongs
    controlProngs: ControlProngs,
    sectionComplete: Boolean
});