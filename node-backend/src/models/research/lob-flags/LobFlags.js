var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LobFlags = new Schema({
    pepEscalation: Boolean,
    sarfNegativeNews: Boolean,
    systemOfRecordUpdateRequired: Boolean,
    sarfOther: Boolean
}); 