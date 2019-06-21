//Attachment.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//schema
const Attachment = new Schema({      
    icon: String,
    fileName: String,
    filePath: String,
    fileType: String,
    uploader: String,
    section: String,
    comment: String,
    date: Date,
    
}, {
        collection: 'Attachments'
});

//module.exports = mongoose.model('Attachment', Attachment);