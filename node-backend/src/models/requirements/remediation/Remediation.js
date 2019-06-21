const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvestmentVechiclesFunds = require('./InvestmentVechiclesFunds');
const CustomerDetails = require('./CustomerDetails');
const AccountRelationship = require('./AccountRelationship');
const LegalFormation = require('./LegalFormation');
const CustomerStructure = require('./CustomerStructure');
const SourceOfWealth = require('./SourceOfWealth');
const GeneralDescriptionOfBusiness = require('./GeneralDescriptionOfBusiness');
const SourceOfFunds = require('./SourceOfFunds');
const ParticipationPurchased = require('./ParticipationPurchased');
const CipNotice = require('./CipNotice');
const InternetGambling = require('./InternetGambling');
const ProhibitedCustomers = require('./ProhibitedCustomers');
const RelationshipManager = require('./RelationshipManager');
const CipCddApprovedDate = require('./CipCddApprovedDate');
const Submitter = require('./Submitter');


const Remediation = new Schema({
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