const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require('../../Attachment');

const ProhibitedCustomers = new Schema({
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
