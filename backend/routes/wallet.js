const router = require('express').Router();
let Wallet = require('../models/wallet.model');


router.route('/').get((req, res) => {
  Wallet.find()
    .then(wallets => res.json(wallets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/user').post((req, res) => {
    const username = req.body;
    console.log(username);
    Wallet.findOne({
      username: req.body.username
    })
      .then(userWallet => res.json(userWallet))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update').post((req, res) => {
  const username = req.body.username;
  const amount = req.body.amount;
  console.log(username);

  const query = { username: username };
  var echAmount = 0;
  var btcAmount = 0;
  var atcAmount = 0;

  Wallet.findOne(query)
    .then(item => {
      echAmount = item["ech"];
      btcAmount = item["btc"];
      atcAmount = item["atc"];

      const filter = { username: username };
      const new_amount_btc = parseInt(btcAmount) + parseInt(amount) * 15; 
      const update = { btc: new_amount_btc };

      Wallet.findOneAndUpdate(filter, update)
      .exec((err, user) => {
        if (err) {
          res.json('Something went wrong!');
          return;
        }
        res.json('Transaction completed!');
      });
    });
});

router.route('/buy').post((req, res) => {
  const username = req.body.username;
  const coin = req.body.coin;
  const amount = req.body.amount;
  console.log(username);

  const query = { username: username };
  var echAmount = 0;
  var btcAmount = 0;
  var atcAmount = 0;

  Wallet.findOne(query)
    .then(item => {
      echAmount = item["ech"];
      btcAmount = item["btc"];
      atcAmount = item["atc"];

      const filter = { username: username };
      var update = {};

      if(coin == "ech") {
        console.log(echAmount);
        console.log(amount);
        var newAmount = parseInt(echAmount) + parseInt(amount);
        update = { ech: newAmount };
      }
      if(coin == "btc") {
        var newAmount = parseInt(btcAmount) + parseInt(amount);
        update = { btc: newAmount };
      }
      if(coin == "atc") {
        var newAmount = parseInt(atcAmount) + parseInt(amount);
        update = { atc: newAmount };
      }

      Wallet.findOneAndUpdate(filter, update)
      .exec((err, user) => {
        if (err) {
          res.json('Something went wrong!');
          return;
        }
        res.json('Transaction completed!');
      });
    });
});

router.route('/spent').post((req, res) => {
  const username = req.body.username;
  const btc = req.body.btc;
  const filter = { username: username };
  const update = { btc: btc };
  Wallet.findOneAndUpdate(filter, update)
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.json('Transaction completed!')
  });
});


module.exports = router;