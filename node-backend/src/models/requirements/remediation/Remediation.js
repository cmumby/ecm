var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvestmentVechiclesFunds = require('./InvestmentVechiclesFunds');
var CustomerDetails = require('./CustomerDetails');
var AccountRelationship = require('./AccountRelationship');
var LegalFormation = require('./LegalFormation');


var Remediation = new Schema({
    investmentVechiclesFunds: InvestmentVechiclesFunds,
    customerDetails: CustomerDetails,
    accountRelationship: AccountRelationship,
    legalFormation: LegalFormation,
    sectionComplete: Boolean
});