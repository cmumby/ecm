//Case.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let CaseReasearch = require("./case-reasearch/CaseReasearch");
let DataQaulityExceptions = require("./data-qaulity-exceptions/DataQaulityExceptions");
let CustomerOutreachReasons = require("./customer-outreach-reasons/CustomerOutreachReasons");
let FinancialInstitutionTracking = require("./financial-institution-tracking/FinancialInstitutionTracking");
let ForProgramUseOnly = require("./for-program-use-only/ForProgramUseOnly");
let CrcRejectReason = require("./crc-reject-reason/CrcRejectReason");
let MiddleOfficeTrackingFields = require("./middle-office-tracking-fields/MiddleOfficeTrackingFields");
let RejectedFromCornerstoneLoad = require("./rejected-from-cornerstone-load/RejectedFromCornerstoneLoad");
let MiddleOfficeFlags = require("./middle-office-flags/MiddleOfficeFlags");
let LobFlags = require("./lob-flags/LobFlags");
let CrcFlags = require("./crc-flags/CrcFlags");
let PrimaryLobTracking = require("./primary-lob-tracking/PrimaryLobTracking");
let CustomerInformation = require("./customer-information/CustomerInformation");
let SummaryOfCustomerRelationship = require("./summary-of-customer-relationship/SummaryOfCustomerRelationship");
let HighRiskCustomerFactors = require("./high-risk-customer-factors/HighRiskCustomerFactors");
let RelationshipOverview = require("./relationship-overview/RelationshipOverview");
let ProductAnalysisAndHighRiskProducts = require("./product-analysis-and-high-risk-products/ProductAnalysisAndHighRiskProducts");
let DueDiligenceUpdate = require("./due-diligence-update/DueDiligenceUpdate");
let EnhancedDueDiligence = require("./enhanced-due-diligence/EnhancedDueDiligence");
let RelationshipNameApproval = require("./relationship-name-approval/RelationshipNameApproval");

//schema
let Researach = new Schema({
    caseReasearch: CaseReasearch,
    dataQaulityExceptions: DataQaulityExceptions,
    customerOutreachReasons: CustomerOutreachReasons,
    financialInstitutionTracking: FinancialInstitutionTracking,
    forProgramUseOnly: ForProgramUseOnly,
    crcRejectReason: CrcRejectReason,
    middleOfficeTrackingFields: MiddleOfficeTrackingFields,
    rejectedFromCornerstoneLoad: RejectedFromCornerstoneLoad,
    middleOfficeFlags: MiddleOfficeFlags,
    lobFlags: LobFlags,
    crcFlags: CrcFlags,
    primaryLobTracking: PrimaryLobTracking,
    customerInformation: CustomerInformation,
    summaryOfCustomerRelationship: SummaryOfCustomerRelationship,
    highRiskCustomerFactors: HighRiskCustomerFactors,
    relationshipOverview: RelationshipOverview,
    productAnalysisAndHighRiskProducts: ProductAnalysisAndHighRiskProducts,
    dueDiligenceUpdate: DueDiligenceUpdate,
    enhancedDueDiligence: EnhancedDueDiligence,
    relationshipNameApproval: RelationshipNameApproval
});