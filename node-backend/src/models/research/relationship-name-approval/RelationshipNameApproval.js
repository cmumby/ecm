let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RelationshipNameApproval = new Schema({
    rmName: String,
    primayLobApproverName: String,
    crcApproverName: String,
    rmApprovalDate: Date,
    primaryLobApprovalDate: Date,
    crcApprovalDate: Date
}); 