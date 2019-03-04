let express = require('express');
let app = express();
let router = express.Router();
let Requirement = require('../models/requirements/Requirement');
const fileUpload = require('express-fileupload');

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
  const fileName = req.files.file.name;
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    }
  )
});

module.exports = router;