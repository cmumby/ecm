var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RelationshipNameApproval = new Schema({
    rmName: String,
    primayLobApproverName: String,
    crcApproverName: String,
    rmApprovalDate: Date,
    primaryLobApprovalDate: Date,
    crcApprovalDate: Date
}); 