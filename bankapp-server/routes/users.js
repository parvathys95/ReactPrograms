var express = require('express');
var router = express.Router();
var Bank = require('../services/bank');

/* GET users listing. */
router.get('/', function (req, res) {
  var result = Bank.getUsers();
  res.send(result);
});
router.post('/register', function (req, res) {
  let usname = req.body.username;
  let pwd = req.body.password;
  let acno = req.body.acno;
  let confirmPassword = req.body.confirmPassword;
  let data = Bank.getUsers();

  if (usname in data) {
    res.send({ message: "User already exists. Please login!" });
  }
  else if (pwd != confirmPassword) {
    res.send({ message: "Password and confirm password doesn't match" });
  }
  else {
    Bank.addUser(usname,pwd,acno);
    res.send({ message:"User registered successfully" });
  }
});

  router.post('/login', function(req, res, next) {
    let usname = req.body.username;
    let pwd = req.body.password;
    let data = Bank.getUsers()
    if (usname in data) {
      let password = data[usname]["password"];
      if (pwd === password) {
        // localStorage.setItem("currentUser", usname);
        Bank.setCurrentUser(usname); //data will not lost after page refresh. setting data to local storage
        res.send({message: "Login Successfully!"});

      }

      else {
        res.send({message: "You provided invalid data!"});
      }
    }

    else {
      res.send({message:"invalid user"});
    }
   });

 router.post('/deposit', function(req, res) {
  let uname = req.body.username;
  let amt = Number( req.body.amount);
  let data = Bank.getUsers();
  if (uname in data) {
      data[uname]["balance"] += amt
      let bal = data[uname]["balance"]
      data[uname]["history"].push({
          typeOfTransaction:"Credit",
          amount:amt
      });
      res.send({balance: bal, message:"Deposit Success"});
  }
  else {
    res.send({message:"invalid user"});
  } 
  });
 
  router.post('/withdraw', function(req, res) {
    let uname = req.body.username;
    let amt = Number(req.body.amount)
    // let btag = document.querySelector("#bal");
    let data = Bank.getUsers();
    if (uname in data) {
        let avlbal = data[uname]["balance"]
        if (amt > avlbal) {
            res.send({message:"insufficient balance"});

        }
        else {
            data[uname]["balance"] -= amt
            let bal = data[uname]["balance"]
            data[uname]["history"].push({
                typeOfTransaction:"Debit",
                amount:amt
            });
            res.send({balance: bal, message:"Withdraw Success"});
        }
    }
    else {
      res.send({message:"invalid user"});
    }
  });


// router.post('/user/:id', function(req, res, next) {
//   res.send(req.params.id);
// });



router.get('/user', function (req, res) {
  res.send(req.query.id);
});

module.exports = router;
