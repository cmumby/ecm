let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let MiddleOfficeFlags = new Schema({
    raiseQuestion: Boolean,
    generalScopeQuestion: Boolean,
    lobDispute: Boolean,
    disregardedEntity: Boolean,
    incorrectInvestment: Boolean,
    crossLobEscalation: Boolean,
    pendingDisposition: Boolean,
    riskChange: Boolean,
    fund: Boolean,
    pendingMerge: Boolean
}); 