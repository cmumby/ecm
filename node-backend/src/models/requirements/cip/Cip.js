let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let CustomerName = require('./CustomerName');
let TaxOrGovernmentId = require('./TaxOrGovernmentId');

let Cip = new Schema({
    customerName: CustomerName,
    taxOrGovernmentId: TaxOrGovernmentId,
    sectionComplete: Boolean
});