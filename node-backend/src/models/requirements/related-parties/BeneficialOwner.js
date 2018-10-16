let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let BeneficialOwner = new Schema({
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
    countryOfIussuance: String,
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