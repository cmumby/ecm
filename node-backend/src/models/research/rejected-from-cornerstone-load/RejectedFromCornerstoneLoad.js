let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RejectedFromCornerstoneLoad = new Schema({
    cornorstoneReject: Boolean,
    comments: String
}); 