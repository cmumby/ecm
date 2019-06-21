const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrcRejectReason = new Schema({
    administrative: Boolean,
    ccdNotMet: Boolean,
    missingBo: Boolean,
    sharedCustomer: Boolean,
    incompleteInfo: Boolean,
    incorrectCustomerType: Boolean,
    screeningAndDispositioning: Boolean,
    missingHraForm: Boolean,
    badAmlFactors: Boolean,
    badAmlRisk: Boolean,
    escalations: Boolean
}); 