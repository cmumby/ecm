var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvestmentVechiclesFunds = require('./InvestmentVechiclesFunds');
var CustomerDetails = require('./CustomerDetails');
var AccountRelationship = require('./AccountRelationship');
var LegalFormation = require('./LegalFormation');
var CustomerStructure = require('./CustomerStructure');
var SourceOfWealth = require('./SourceOfWealth');
var GeneralDescriptionOfBusiness = require('./GeneralDescriptionOfBusiness');


var Remediation = new Schema({
    investmentVechiclesFunds: InvestmentVechiclesFunds,
    customerDetails: CustomerDetails,
    accountRelationship: AccountRelationship,
    legalFormation: LegalFormation,
    customerStructure: CustomerStructure,
    sourceOfWealth: SourceOfWealth,
    generalDescriptionOfBusiness: GeneralDescriptionOfBusiness,
    sectionComplete: Boolean
});