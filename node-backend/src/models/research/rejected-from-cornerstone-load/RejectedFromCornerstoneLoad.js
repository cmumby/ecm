var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RejectedFromCornerstoneLoad = new Schema({
    cornorstoneReject: Boolean,
    comments: String
}); 