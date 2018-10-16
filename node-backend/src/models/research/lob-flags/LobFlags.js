let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let LobFlags = new Schema({
    pepEscalation: Boolean,
    sarfNegativeNews: Boolean,
    systemOfRecordUpdateRequired: Boolean,
    sarfOther: Boolean
}); 