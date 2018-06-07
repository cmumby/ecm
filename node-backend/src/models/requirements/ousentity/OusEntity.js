var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Entity = require('./Entity');

var OusEntity = new Schema({
    entity: Entity,
    sectionComplete: Boolean
});