const express = require('express') 
const router = express.Router(); 
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', (req, res)=>{
    // https://www.npmjs.com/package/bcrypt
   try {
       bcrypt.hash(req.body.password, 10)
       .then(hash => { 
        const user = new User({
           username: req.body.username, 
           password: hash
           });
               user.save()
               .then(result => {
               res.status(201).json({
               message: "User created",
               result: result
                   });
                       })
                       .catch(err => {
                       res.status(500).json({
                       error: err
                       })
                   });
               })
            } catch (err) {
                    console.log(err)
            }
});

router.post('/login', async (req, res)=>{  
  try {

    const {username, password} = req.body;

    const user = await User.findOne({username});
           // check if the user exists
      if (user && (await bcrypt.compare(password, user.password))) {
      //check if password matches
      const token = jwt.sign({username:user.username, userid:user._id}, 
      'secret_this_should_be_longer_than_it_is',
      {expiresIn: '1h'});
      res.status(200).json({token: token});
    }
  }
    catch(err) {
      console.log(error);
    }
  })



module.exports = router