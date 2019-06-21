const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Entity = require('./Entity');

const OusEntity = new Schema({
    entity: Entity,
    sectionComplete: Boolean
});