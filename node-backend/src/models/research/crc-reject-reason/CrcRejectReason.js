var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CrcRejectReason = new Schema({
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