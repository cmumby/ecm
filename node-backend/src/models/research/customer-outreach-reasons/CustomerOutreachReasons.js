var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerOutreachReasons = new Schema({
    reason: String,
    extension: String
}); 