var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CcdiTaskRequest = require('./CcdiTaskRequest');
var Reports = require('./Reports');
var ScreeningCustomer = require('./ScreeningCustomer');
var ScreeningParty = require('./ScreeningParty');

var Screening = new Schema({
    ccdiTaskRequest: CcdiTaskRequest,
    reports: Reports,
    screeningCustomer: ScreeningCustomer,
    screeningParty: ScreeningParty,
    sectionComplete: Boolean
});