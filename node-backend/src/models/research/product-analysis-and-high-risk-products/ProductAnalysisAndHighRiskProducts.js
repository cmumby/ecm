let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let RejectedFromCornerstoneLoad = new Schema({
    cashVault: String,
    internationalWires: String,
    desktopDeposit: String,
    achDomestic: String
}); 