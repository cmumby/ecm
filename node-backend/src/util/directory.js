const fs = require('fs')
module.exports = {
    checkUploadPath: function(uploadPath){
        fs.exists(uploadPath, function(exists) {
            if(exists) { 
              return true
            }
            else {
              fs.mkdir(uploadPath, { recursive: true }, function(err) {
                if(err) { 
                  console.log('Error in folder creation', err);
                  return false; 
                } 
                return true;
              })
            }
         })
    }
}
