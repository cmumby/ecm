const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RejectedFromCornerstoneLoad = new Schema({
    cashVault: String,
    internationalWires: String,
    desktopDeposit: String,
    achDomestic: String
}); 