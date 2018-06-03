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
var InternetGambling = require('./InternetGambling');
var ProhibitedCustomers = require('./ProhibitedCustomers');
var RelationshipManager = require('./RelationshipManager');
var CipCddApprovedDate = require('./CipCddApprovedDate');
var Submitter = require('./Submitter');


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
    internetGambling: InternetGambling,
    prohibitedCustomers: ProhibitedCustomers,
    relationshipManager: RelationshipManager,
    cipCddApprovedDate: CipCddApprovedDate,
    submitter: Submitter,
    sectionComplete: Boolean
});