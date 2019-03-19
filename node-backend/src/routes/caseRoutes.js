let express = require('express');
let app = express();
let router = express.Router();
let Requirement = require('../models/requirements/Requirement');
const fileUpload = require('express-fileupload');
const { directory , renameIfExists } = require('../util/directory');
const fs = require('fs')
const dateFormat = require('dateformat');

router.use(fileUpload());


//Schema
let TodoList = require('../models/TodoList');
let Case = require('../models/Case');
let Naics = require('../models/Naics');

// Get Specific
router.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Case.find({ 'ecmId': id }, function (err, item) {
    res.json(item[0]);
  });
});

// Get All Items
router.route('/').get(function (req, res) {
  TodoList.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

router.route('/cases/list').get(function (req, res) {
  Case.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

router.route('/naics/list').get(function (req, res) {
  Naics.find(function (err, items) {
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});

// Add item
router.route('/add').post(function (req, res) {
  let item = new TodoList(req.body);
  item.save()
    .then(item => {

      res.json(req.body);
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//  Update Specific
router.route('/update/:id').post(function (req, res) {
  Case.findById(req.body.data._id,  function (err, item) {
    if (!item)
      return false;//res.status(400).send("Could not load Document");
    else {
      item.requirement = req.body.data.requirement;
      item.markModified('requirement');
      item.save().then(item => {
        res.json('Updated');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

router.route('/update/:id/attachments').post(function (req, res) {
  let id = req.params.id; 
  Case.findById(id ,  function (err, item) {
    if (!item) {
      return false;//res.status(400).send("Could not load Document");
      
    } else {
      item.attachments = req.body.data;
      item.markModified('attachments');
      item.save().then(item => {
        res.json('Updated');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      }); 
    }
  });
});

// Delete Specific
router.route('/delete/:id').get(function (req, res) {
  TodoList.findByIdAndRemove({ _id: req.params.id },
    function (err, item) {
      if (err) res.json(err);
      else res.json('Deleted');
    });
});

router.route('/upload').post( function (req, res, next) {


  let uploadFile = req.files.file;
  const referrer = req.headers.referer;
  let fileName = { name: req.files.file.name , exist: null }
  const caseNumber = referrer.split('/')[(referrer.split('/').length - 2)];
  const uploadPath = `${__dirname}/../../public/files/case/${caseNumber}`;
  
  let attachmentList = [];
  
  while (fileName.exist !== false ){
    fileName = renameIfExists(uploadPath, fileName.name);
  }

  ///directory.checkUploadPath(uploadPath); Will use on creation of case
  uploadFile.mv(
    `${uploadPath}/${fileName.name}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
        console.log('file error', err);
      }
      
      Case.find({ 'ecmId': caseNumber }, function (err, item) {
       const nItem = item[0];
       const iconType = fileName.name.split('.')[(fileName.name.split('.').length - 1)];
       const newAttachment = {
          icon: `${iconType.toUpperCase()}`,
          fileName: `${fileName.name}`,
          filePath: `public/files/case/${caseNumber}/${fileName.name}`,
          fileType: `${req.body.uploadType}`,
          uploader: "u616323", // TODO: Update with actuall usesr once implemented
          comment: `${req.body.uploadComment}`,
          date: dateFormat(Date.now(), "isoDateTime"),
        }
        nItem.attachments.push(newAttachment);
        attachmentList = nItem.attachments;
        
        
        nItem.markModified('attachments');
        nItem.save().then(item => {
          res.json({
              file: `public/files/case/${caseNumber}/${fileName.name}`,
              attachments: attachmentList
            });
        }).catch(err => {
          return res.status(500).send(err)
        });
      });  
    }
  ); 
});

router.route('/delete/:id/attachment').post( function (req, res, next) {
  const uploadPath = `${__dirname}/../../${req.body.data.filePath}`;
  fs.unlink(req.body.data.filePath , function (err) {
    if (err){ 
      throw err;
    } else {
      res.json({
        msg: 'ok',
      });
       // if no error, file has been deleted successfully
    console.log('File deleted!');
    }
   
  }); 
});

module.exports = router;