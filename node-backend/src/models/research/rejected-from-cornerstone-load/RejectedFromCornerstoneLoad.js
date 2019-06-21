const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RejectedFromCornerstoneLoad = new Schema({
    cornorstoneReject: Boolean,
    comments: String
}); 