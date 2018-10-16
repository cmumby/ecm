let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Entity = require('./Entity');

let OusEntity = new Schema({
    entity: Entity,
    sectionComplete: Boolean
});