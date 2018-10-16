let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PrimaryLobTracking = new Schema({
    primaryLobGroup: String,
    receivedDate: Date,
    requestDate: Date,
    escalationRequired: Boolean,
    escalationDate: Date,
    primaryRm: String,
    primaryRmRequestDate: Date,
    primaryLobContactName: String,
    primaryLobReceiveDate: Date,
    primaryLobEscalationContact: String
}); 