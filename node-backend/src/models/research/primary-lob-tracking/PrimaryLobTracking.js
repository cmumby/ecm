const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrimaryLobTracking = new Schema({
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