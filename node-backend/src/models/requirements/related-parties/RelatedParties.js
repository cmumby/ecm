let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RelatedPartiesAuthorizedPersons = require('./RelatedPartiesAuthorizedPersons');
let ControlProngs = require('./ControlProngs');

let RelatedParties = new Schema({
    relatedPartiesAuthorizedPersons: RelatedPartiesAuthorizedPersons,
    authorizedPersons: ControlProngs, // needs same schema as control prongs
    controlProngs: ControlProngs,
    sectionComplete: Boolean
});