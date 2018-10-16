let express = require('express');
let app = express();
let router = express.Router();
let Requirement = require('../models/requirements/Requirement');

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
      res.status(400).send("Could not load Document");
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

// Delete Specific
router.route('/delete/:id').get(function (req, res) {
  TodoList.findByIdAndRemove({ _id: req.params.id },
    function (err, item) {
      if (err) res.json(err);
      else res.json('Deleted');
    });
});

module.exports = router;