const router = require('express').Router();
let Stock = require('../models/stock.model');
let Wallet = require('../models/wallet.model');


router.route('/').get((req, res) => {
  Stock.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user').post((req, res) => {
    const username = req.body;
    console.log(username);
    Stock.findOne({
      username: req.body.username
    })
      .then(userStocks => res.json(userStocks))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/sell').post((req, res) => {
  const username = req.body.username;
  const stock = req.body.stock;
  var amount = req.body.amount;
  const query = { username: username };
  var transportAmount = 0;
  var medicineAmount = 0;
  var educationAmount = 0;
  var infrastructureAmount = 0;
  var teslaAmount = 0;
  var spaceXAmount = 0;
  var agricultureAmount = 0;

  Stock.findOne(query)
    .then(item => {
      transportAmount = item["transport"];
      medicineAmount = item["medicine"];
      educationAmount = item["education"];
      infrastructureAmount = item["infrastructure"];
      teslaAmount = item["tesla"];
      spaceXAmount = item["spaceX"];
      agricultureAmount = item["agriculture"];

      const filter = { username: username };
      var update = {};

      if(stock == "transport") {
        var newAmount = 1;
        if (transportAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(transportAmount) - parseInt(amount);
          update = { transport: newAmount };
        }
      }
      if(stock == "medicine") {
        var newAmount = 1;
        if (medicineAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(medicineAmount) - parseInt(amount);
          update = { medicine: newAmount };
        }
      }
      if(stock == "education") {
        var newAmount = 1;
        if (educationAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(educationAmount) - parseInt(amount);
          update = { education: newAmount };
        }
      }
      if(stock == "infrastructure") {
        var newAmount = 1;
        if (infrastructureAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(infrastructureAmount) - parseInt(amount);
          console.log(newAmount);
          update = { infrastructure: newAmount };
        }
      }
      if(stock == "tesla") {
        var newAmount = 1;
        if (teslaAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(teslaAmount) - parseInt(amount);
          update = { tesla: newAmount };
        }
      }
      if(stock == "spaceX") {
        var newAmount = 1;
        if (spaceXAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(spaceXAmount) - parseInt(amount);
          console.log(newAmount);
          update = { spaceX: newAmount };
        }
      }
      if(stock == "agriculture") {
        var newAmount = 1;
        if (agricultureAmount < amount) {
          return res.send("Can't sell!");
        }
        else {
          newAmount = parseInt(agricultureAmount) - parseInt(amount);
          console.log(newAmount);
          update = { agriculture: newAmount };
        } 
      }

      Stock.findOneAndUpdate(filter, update)
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
  var transportAmount = req.body.transport;
  var medicineAmount = req.body.medicine;
  var educationAmount = req.body.education;
  var infrastructureAmount = req.body.infrastructure;
  var teslaAmount = req.body.tesla;
  var spaceXAmount = req.body.spaceX;
  var agricultureAmount = req.body.agriculture;

  Stock.findOne(query)
    .then(item => {
      transportAmount = parseInt(transportAmount) + parseInt(item["transport"]);
      medicineAmount = parseInt(medicineAmount) + parseInt(item["medicine"]);
      educationAmount = parseInt(educationAmount) + parseInt(item["education"]);
      infrastructureAmount = parseInt(infrastructureAmount) + parseInt(item["infrastructure"]);
      teslaAmount = parseInt(teslaAmount) + parseInt(item["tesla"]);
      spaceXAmount = parseInt(spaceXAmount) + parseInt(item["spaceX"]);
      agricultureAmount = parseInt(agricultureAmount) + parseInt(item["agriculture"]);
    

      const filter = { username: username };
      const update = {
        transport: transportAmount,
        medicine: medicineAmount,
        education: educationAmount,
        infrastructure: infrastructureAmount,
        tesla: teslaAmount,
        spaceX: spaceXAmount,
        agriculture: agricultureAmount
      };

      Stock.findOneAndUpdate(filter, update)
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