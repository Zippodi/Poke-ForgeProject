const express = require('express');
const router = express.Router();

const UserDAO = require('../data/dao/UserDAO');

router.post('/login', (req, res) => {
  console.log("body of login request: ", req.body);
  if (req.body.username && req.body.password) {
    UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
      let result = {
        user: user
      }

      //generateToken(req, res, user);
      res.status(200);
      console.log(user);
      console.log("yes!");
      res.json(result);
      console.log("yes2!");

    }).catch(err => {
      res.status(401).json({ error: err });
    });
  }
  else {
    res.status(401).json({ error: 'Not authenticated' });
  }


});

router.post('/register', (req, res) => {
  //validate registration data
  console.log("body of register request: ", req.body);
  if (req.body.username && req.body.password) {
    UserDAO.createUser(req.body.username, req.body.password).then(user => {
      let result = {
        user: user
      }

      //generateToken(req, res, user);

      res.json(result);
    }).catch(err => {
      res.status(401).json({ error: err });
    });
  }
  else {
    res.status(401).json({ error: 'Not authenticated' });
  }

});

module.exports = router;