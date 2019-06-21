const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LobFlags = new Schema({
    pepEscalation: Boolean,
    sarfNegativeNews: Boolean,
    systemOfRecordUpdateRequired: Boolean,
    sarfOther: Boolean
}); 