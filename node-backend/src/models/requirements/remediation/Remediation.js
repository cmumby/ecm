var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvestmentVechiclesFunds = require('./InvestmentVechiclesFunds');
var CustomerDetails = require('./CustomerDetails');
var AccountRelationship = require('./AccountRelationship');
var LegalFormation = require('./LegalFormation');
var CustomerStructure = require('./CustomerStructure');
var SourceOfWealth = require('./SourceOfWealth');
var GeneralDescriptionOfBusiness = require('./GeneralDescriptionOfBusiness');
var SourceOfFunds = require('./SourceOfFunds');
var ParticipationPurchased = require('./ParticipationPurchased');
var CipNotice = require('./CipNotice');


var Remediation = new Schema({
    investmentVechiclesFunds: InvestmentVechiclesFunds,
    customerDetails: CustomerDetails,
    accountRelationship: AccountRelationship,
    legalFormation: LegalFormation,
    customerStructure: CustomerStructure,
    sourceOfWealth: SourceOfWealth,
    generalDescriptionOfBusiness: GeneralDescriptionOfBusiness,
    sourceOfFunds: SourceOfFunds,
    participationPurchased: ParticipationPurchased,
    cipNotice: CipNotice,
    sectionComplete: Boolean
});