let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CustomerOutreachReasons = new Schema({
    reason: String,
    extension: String
}); 