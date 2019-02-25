//Attachment.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;


//schema
let Attachment = new Schema({      
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