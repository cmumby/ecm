let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let CddiTaskRequest = require('./CddiTaskRequest');
let Reports = require('./Reports');
let ScreeningCustomer = require('./ScreeningCustomer');
let ScreeningParty = require('./ScreeningParty');

let Screening = new Schema({
    cddiTaskRequest: CddiTaskRequest,
    reports: Reports,
    screeningCustomer: ScreeningCustomer,
    screeningParty: ScreeningParty,
    sectionComplete: Boolean
});