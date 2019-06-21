const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RelatedPartiesAuthorizedPersons = require('./RelatedPartiesAuthorizedPersons');
const ControlProngs = require('./ControlProngs');

const RelatedParties = new Schema({
    relatedPartiesAuthorizedPersons: RelatedPartiesAuthorizedPersons,
    authorizedPersons: ControlProngs, // needs same schema as control prongs
    controlProngs: ControlProngs,
    sectionComplete: Boolean
});