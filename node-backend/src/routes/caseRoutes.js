var express = require('express');
var app = express();
var router = express.Router();
var Requirement = require('../models/requirements/Requirement');

//Schema
var TodoList = require('../models/TodoList');
var Case = require('../models/Case');
var Naics = require('../models/Naics');

// Get Specific
router.route('/:id').get(function (req, res) {
  var id = req.params.id;
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
    //console.log(items);
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});
router.route('/naics/list').get(function (req, res) {
  Naics.find(function (err, items) {
    //console.log(items);
    if (err) {
      console.log(err);
    } else {
      res.json(items);
    }
  });
});


// Add item
router.route('/add').post(function (req, res) {
  var item = new TodoList(req.body);
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
      //res.status(400).send("Could not load console.log("loading document...");
      ;
    else {
      item.requirement = req.body.data.requirement;//= req.body.data.requirement.proxyRR.registeredAddress.firstLine;
      item.markModified('requirement');
     ///console.log("case:", item.requirement.proxyRR.registeredAddress);
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

module.exports = router;