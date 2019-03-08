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
    },
    /**
     * 
     * @param {*} uploadPath 
     * @param {*} fileName 
     * Checks to see if the filename exists on the server.
     *  -if the filename exists then upload it with an number increment ie: (flile.1.pdf)
     *  -if filename is full number, follow string rules (80.1.pdf, 80.2.pdf NOT 81.pdf)
     */
    renameIfExists: function(uploadPath, fileName){
      if(fs.existsSync(`${uploadPath}/${fileName}`)){
        let fileNameParts = fileName.split('.'); 
        const fileIterator = (fileNameParts[(fileNameParts.length - 2)]); 
        const isNumber = /^\d+$/.test(fileIterator);
        //Check stringFileName.ext or NumberFileName.ext
        if(isNumber === false || (isNumber === true && fileIterator === fileNameParts[0]) ) { 
          fileNameParts[(fileNameParts.length - 1)] = '1.' + fileNameParts[(fileNameParts.length - 1)];
          fileName = fileNameParts.join('.');
          return {'name': fileName , 'exist': true};
         //Check stringFileName.[number].ext or NumberFileName.[number].ext
        } else if (isNumber === true) {
          fileNameParts[(fileNameParts.length - 2)] = parseInt(fileNameParts[(fileNameParts.length - 2)]) + 1 ; 
          fileName = fileNameParts.join('.');
          return {'name': fileName , 'exist': true};
        }
      }
      return {'name': fileName , 'exist': false};
    }
}
