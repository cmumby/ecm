let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Attachment = require('../../Attachment');

let ProhibitedCustomers = new Schema({
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
