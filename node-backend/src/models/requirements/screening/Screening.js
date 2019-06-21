const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CddiTaskRequest = require('./CddiTaskRequest');
const Reports = require('./Reports');
const ScreeningCustomer = require('./ScreeningCustomer');
const ScreeningParty = require('./ScreeningParty');

const Screening = new Schema({
    cddiTaskRequest: CddiTaskRequest,
    reports: Reports,
    screeningCustomer: ScreeningCustomer,
    screeningParty: ScreeningParty,
    sectionComplete: Boolean
});