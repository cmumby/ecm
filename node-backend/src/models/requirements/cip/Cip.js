var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CustomerName = require('./CustomerName');
var TaxOrGovernmentId = require('./TaxOrGovernmentId');




var Cip = new Schema({
    customerName: CustomerName,
    taxOrGovernmentId: TaxOrGovernmentId,
    sectionComplete: Boolean
});