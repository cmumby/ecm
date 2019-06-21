const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerName = require('./CustomerName');
const TaxOrGovernmentId = require('./TaxOrGovernmentId');

const Cip = new Schema({
    customerName: CustomerName,
    taxOrGovernmentId: TaxOrGovernmentId,
    sectionComplete: Boolean
});