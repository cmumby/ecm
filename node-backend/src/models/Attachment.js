//Attachment.js

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//schema
var Attachment = new Schema({      
    icon: String,
    fileName: String,
    filePath: String,
    fileType: String,
    uploader: String,
    section: String,
    comment: String
    
}, {
        collection: 'Attachments'
});

module.exports = mongoose.model('Attachment', Attachment);
