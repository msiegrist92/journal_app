const pop = require('../utils/populate_entries.js');
const popTokens = require('../utils/populate_tokens.js');
const mongoose = require('mongoose');
const express = require('express');
const User = require('../db/schemas/user.js');
const Tokens = require('../db/schemas/tokens.js');
const router = new express.Router();
const bodyParser = require('body-parser');
const json_parser = bodyParser.json();
const auth = require('../utils/auth.js');
const bcrypt = require('bcrypt');

router.post('/user', json_parser, async (req, res) => {
  const find = await User.findOne({email: req.body.email});
  if(find != null){
    return res.status(400).send('email already in use');
  }
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  })
  try {
    //password hashing is handled by the schema.pre method
    await user.save()
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/user/login', json_parser, async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    if(user === null){
    }
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (err) {
    res.status(500).send(err);
  }

})

router.post('/user/logout', json_parser, auth,  async (req, res) => {
  try {
    //cascade delete all tokens where owner === reg.user._id
    await Tokens.deleteMany({owner: req.user._id});
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
})

router.get('/user/me', auth, async (req, res) => {
  try {
    const entries = await pop.getAll(req.user._id);
    res.status(200).send({user: req.user, entries});
  } catch (err) {
    res.status(500).send(err)
  }
})


//this route is only for updating user password
router.patch('/user/me', json_parser, auth, async (req, res) => {
  const allowed = ['old_pw', 'new_pw'];

  const data = JSON.parse(req.body.data);

  if(!bcrypt.compareSync(data.old_pw, req.user.password)){
    return res.status(401).send();
  }

  try {
    req.user.password = data.new_pw;
    await req.user.save();

    res.status(200).send('password changed');
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/user/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send('user deleted');
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
