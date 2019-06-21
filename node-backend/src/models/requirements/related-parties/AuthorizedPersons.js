const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const AuthorizedPersons = new Schema({
    isIndividual: Boolean,
    firstName: String,
    middleName: String,
    lastName: String,
    occupation: String,
    wcisRelatedPartyType: String,
    wcisId: Number,
    firstLine: String,
    secondLine: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    dateOfBirth: Date,
    idType: String,
    tin: String,
    tinType: String,
    countryOfIssuance: String,
    expirationDate: Date,
    domicile: String,
    countryOfCitizenship: String,
    legalEntityType: String,
    organizationType: String,
    relationshipType: String,
    beneficialOwnerType: String,
    stateOfRegistration: String,
    cddiTaskRequest: String,
    isPep: Boolean,
    raCorrectionRequired: Boolean,
    comments: String
});