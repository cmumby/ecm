const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RelationshipNameApproval = new Schema({
    rmName: String,
    primayLobApproverName: String,
    crcApproverName: String,
    rmApprovalDate: Date,
    primaryLobApprovalDate: Date,
    crcApprovalDate: Date
}); 