var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Attachment = require('../../Attachment');

var ProhibitedCustomers = new Schema({
    isMarijunaDistributor: Boolean,
    customerHasWarrents: Boolean,
    isNonUsMexicanCdc: Boolean,
    isUsOwnsMexicanCdc: Boolean,
    isShellBank: Boolean,
    isVirtualCurrencyExchange: Boolean,
    isThroughAccount: Boolean,
    isThirdPartyCheckCasher: Boolean,
    isPuipidTransactor: Boolean,
    isInternationalCurrencyShipper: Boolean,
    attachments: [Attachment],
    raCorrectionRequired: Boolean,
    comments: String,
    complete: Boolean
});
