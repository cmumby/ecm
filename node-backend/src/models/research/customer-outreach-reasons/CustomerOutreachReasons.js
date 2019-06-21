const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerOutreachReasons = new Schema({
    reason: String,
    extension: String
}); 