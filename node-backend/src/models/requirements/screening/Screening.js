var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CddiTaskRequest = require('./CddiTaskRequest');
var Reports = require('./Reports');
var ScreeningCustomer = require('./ScreeningCustomer');
var ScreeningParty = require('./ScreeningParty');

var Screening = new Schema({
    cddiTaskRequest: CddiTaskRequest,
    reports: Reports,
    screeningCustomer: ScreeningCustomer,
    screeningParty: ScreeningParty,
    sectionComplete: Boolean
});