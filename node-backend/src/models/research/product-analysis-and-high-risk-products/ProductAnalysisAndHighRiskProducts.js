var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RejectedFromCornerstoneLoad = new Schema({
    cashVault: String,
    internationalWires: String,
    desktopDeposit: String,
    achDomestic: String
}); 