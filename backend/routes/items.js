const router = require('express').Router();
let Item = require('../models/items.model');

router.route('/').get((req, res) => {
    Item.find()
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/sold').post((req, res) => {

    const type = req.body.type;
    const amount = req.body.amount;

    const query = { type: type };
    var _type = "";
    var _cantity = 0;

    Item.findOne(query)
    .then(item => {
        _type = item["type"];
        _cantity = item["cantity"];

        const new_cantity = parseInt(_cantity) + parseInt(amount);
        const update = { cantity: new_cantity };

        Item.findOneAndUpdate(query, update)
        .exec((err, type) => {
          res.json('Succesfully update!')
        });
    })
});

router.route('/bought').post((req, res) => {

    const type = req.body.type;
    const amount = req.body.amount;

    const query = { type: type };
    var _type = "";
    var _cantity = 0;

    Item.findOne(query)
    .then(item => {
        _type = item["type"];
        _cantity = item["cantity"];

        if(amount > _cantity) {
            res.json("Currently there are not remaining items of that type!")
        }
        const new_cantity = parseInt(_cantity) - parseInt(amount);
        const update = { cantity: new_cantity };

        Item.findOneAndUpdate(query, update)
        .exec((err, type) => {
          res.json('Succesfully update!')
        });
    })
});

module.exports = router;