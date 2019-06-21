//Case.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CaseReasearch = require("./case-reasearch/CaseReasearch");
const DataQaulityExceptions = require("./data-qaulity-exceptions/DataQaulityExceptions");
const CustomerOutreachReasons = require("./customer-outreach-reasons/CustomerOutreachReasons");
const FinancialInstitutionTracking = require("./financial-institution-tracking/FinancialInstitutionTracking");
const ForProgramUseOnly = require("./for-program-use-only/ForProgramUseOnly");
const CrcRejectReason = require("./crc-reject-reason/CrcRejectReason");
const MiddleOfficeTrackingFields = require("./middle-office-tracking-fields/MiddleOfficeTrackingFields");
const RejectedFromCornerstoneLoad = require("./rejected-from-cornerstone-load/RejectedFromCornerstoneLoad");
const MiddleOfficeFlags = require("./middle-office-flags/MiddleOfficeFlags");
const LobFlags = require("./lob-flags/LobFlags");
const CrcFlags = require("./crc-flags/CrcFlags");
const PrimaryLobTracking = require("./primary-lob-tracking/PrimaryLobTracking");
const CustomerInformation = require("./customer-information/CustomerInformation");
const SummaryOfCustomerRelationship = require("./summary-of-customer-relationship/SummaryOfCustomerRelationship");
const HighRiskCustomerFactors = require("./high-risk-customer-factors/HighRiskCustomerFactors");
const RelationshipOverview = require("./relationship-overview/RelationshipOverview");
const ProductAnalysisAndHighRiskProducts = require("./product-analysis-and-high-risk-products/ProductAnalysisAndHighRiskProducts");
const DueDiligenceUpdate = require("./due-diligence-update/DueDiligenceUpdate");
const EnhancedDueDiligence = require("./enhanced-due-diligence/EnhancedDueDiligence");
const RelationshipNameApproval = require("./relationship-name-approval/RelationshipNameApproval");

//schema
const Researach = new Schema({
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