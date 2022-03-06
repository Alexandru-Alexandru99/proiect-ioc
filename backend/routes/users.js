const router = require('express').Router();
const config = require("../auth.config");
let User = require('../models/user.model');
let Land = require('../models/land.model');
let Stock = require('../models/house.model');
let House = require('../models/stock.model');
let Wallet = require('../models/wallet.model');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var past_x_days = 60 * 86400000;

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/byday').post((req, res) => {
  User.aggregate([{
    $match: {
      createdAt: {
        $gte: new Date("2016-01-01")
      } 
    } 
  }, { 
    $group: {
      _id: { 
        "year":  { "$year": "$createdAt" },
        "month": { "$month": "$createdAt" },
        "day":   { "$dayOfMonth": "$createdAt" }
      },
      count:{$sum: 1}
    }
  }]).exec(function(err,data){
    if (err) {
      console.log('Error Fetching model');
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const password = bcrypt.hashSync(req.body.password, 8)

  const newUser = new User({username, password});

  const newLand = new Land({username});

  const newHouse = new House({username});

  const newStock = new Stock({username});

  const newWallet = new Wallet({username});

  console.log(newUser);

  newWallet.save();
  newStock.save()
  newHouse.save()
  newLand.save()
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  User.findOne({
    username: req.body.username
  })
    // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.json('User not found!');
        return;
      }

      if (!user) {
        return res.json('User not found!')
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        res.json('Invalid password!')
        return;
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        id: user._id,
        username: user.username,
        type: user.type,
        //email: user.email,
        //roles: authorities,
        accessToken: token
      });
    });
});

router.route('/changePassword').post((req, res) => {
  const username = req.body.username;

  const password = bcrypt.hashSync(req.body.password, 8)

  const filter = { username: username };
  const update = { password: password };

  User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
      if (err) {
        res.json('User not found!');
        return;
      }

      if (!user) {
        return res.json('User not found!');
      }
      res.json('Password changed!')
    });

});

router.route('/updateProfile').post((req, res) => {
  const username = req.body.username;
  const update = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    address: req.body.address
  };

  // const password = bcrypt.hashSync(req.body.password, 8)
  if (req.body.password) {
    update.password = bcrypt.hashSync(req.body.password, 8);
  }

  const filter = { username: username };

  User.findOneAndUpdate(filter, update)
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.json('User not found!');
      }
      res.json('User updated!')
    });

});

router.route('/profileInfo').post((req, res) => {
  const username = req.body;
  console.log(username);
  User.findOne({
    username: req.body.username
  })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;