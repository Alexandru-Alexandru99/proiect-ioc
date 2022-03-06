const router = require('express').Router();
let Land = require('../models/land.model');
let Wallet = require('../models/wallet.model');

router.route('/').get((req, res) => {
  Land.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user').post((req, res) => {
    const username = req.body;
    console.log(username);
    Land.findOne({
      username: req.body.username
    })
      .then(userLands => res.json(userLands))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sell').post((req, res) => {
  const username = req.body.username;
  const planet = req.body.planet;
  var amount = req.body.amount;
  const query = { username: username };
  var marsAmount = 0;
  var uranusAmount = 0;
  var moonAmount = 0;
  var saturnAmount = 0;
  var jupiterAmount = 0;
  var neptunAmount = 0;
  var plutoAmount = 0;

  Land.findOne(query)
    .then(item => {
      marsAmount = item["mars"];
      uranusAmount = item["uranus"];
      moonAmount = item["moon"];
      saturnAmount = item["saturn"];
      jupiterAmount = item["jupiter"];
      neptunAmount = item["neptun"];
      plutoAmount = item["pluto"];

      const filter = { username: username };
      var update = {};

      if(planet == "mars") {
        var newAmount = 1;
        if (marsAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(marsAmount) - parseInt(amount);
        }
        update = { mars: newAmount };
      }
      if(planet == "uranus") {
        var newAmount = 1;
        if (uranusAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(uranusAmount) - parseInt(amount);
        }
        update = { uranus: newAmount };
      }
      if(planet == "moon") {
        var newAmount = 1;
        if (moonAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(moonAmount) - parseInt(amount);
        }
        update = { moon: newAmount };
      }
      if(planet == "saturn") {
        var newAmount = 1;
        if (saturnAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(saturnAmount) - parseInt(amount);
        }
        update = { saturn: newAmount };
      }
      if(planet == "jupiter") {
        var newAmount = 1;
        if (jupiterAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(jupiterAmount) - parseInt(amount);
        }
        update = { jupiter: newAmount };
      }
      if(planet == "neptun") {
        var newAmount = 1;
        if (neptunAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(neptunAmount) - parseInt(amount);
        }
        update = { neptun: newAmount };
      }
      if(planet == "pluto") {
        var newAmount = 1;
        if (plutoAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(plutoAmount) - parseInt(amount);
        }
        update = { pluto: newAmount };
      }

      Land.findOneAndUpdate(filter, update)
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          res.json('Succesfully selling!');
        });
    })
});

router.route('/buy').post((req, res) => {
  const username = req.body.username;
  const query = { username: username };
  var marsAmount = req.body.mars;
  var uranusAmount = req.body.uranus;
  var moonAmount = req.body.moon;
  var saturnAmount = req.body.saturn;
  var jupiterAmount = req.body.jupiter;
  var neptunAmount = req.body.neptun;
  var plutoAmount = req.body.pluto;

  Land.findOne(query)
    .then(item => {
      marsAmount = parseInt(marsAmount) + parseInt(item["mars"]);
      uranusAmount = parseInt(uranusAmount) + parseInt(item["uranus"]);
      moonAmount = parseInt(moonAmount) + parseInt(item["moon"]);
      saturnAmount  = parseInt(saturnAmount) + parseInt(item["saturn"]);
      jupiterAmount = parseInt(jupiterAmount) + parseInt(item["jupiter"]);
      neptunAmount = parseInt(neptunAmount) + parseInt(item["neptun"]);
      plutoAmount = parseInt(plutoAmount) + parseInt(item["pluto"]);
    

      const filter = { username: username };
      const update = {
        mars: marsAmount,
        uranus: uranusAmount,
        moon: moonAmount,
        saturn: saturnAmount,
        jupiter: jupiterAmount,
        neptun: neptunAmount,
        pluto: plutoAmount
      };

      Land.findOneAndUpdate(filter, update)
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          res.json('Succesfully buying!')
        });
    })

});

module.exports = router;