let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let InvestmentVechiclesFunds = require('./InvestmentVechiclesFunds');
let CustomerDetails = require('./CustomerDetails');
let AccountRelationship = require('./AccountRelationship');
let LegalFormation = require('./LegalFormation');
let CustomerStructure = require('./CustomerStructure');
let SourceOfWealth = require('./SourceOfWealth');
let GeneralDescriptionOfBusiness = require('./GeneralDescriptionOfBusiness');
let SourceOfFunds = require('./SourceOfFunds');
let ParticipationPurchased = require('./ParticipationPurchased');
let CipNotice = require('./CipNotice');
let InternetGambling = require('./InternetGambling');
let ProhibitedCustomers = require('./ProhibitedCustomers');
let RelationshipManager = require('./RelationshipManager');
let CipCddApprovedDate = require('./CipCddApprovedDate');
let Submitter = require('./Submitter');


let Remediation = new Schema({
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