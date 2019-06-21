const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataQaulityExceptions = new Schema({
    exception: String
});