const express = require('express');
const User = require('../db/schemas/user.js');
const router = new express.Router();
const bodyParser = require('body-parser');
const json_parser = bodyParser.json();
const auth = require('../utils/auth.js');


router.post('/user', async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })


  try {
    //password hashing is handled by the schema.pre method
    await user.save()
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (err) {
    res.status(400).send(err);
  }
})

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/user/logout', auth,  async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
})

router.get('/user/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/user/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed = ['email', 'password'];

  const isValidOperation = updates.every((key) => {
    return allowed.includes(key)
  })

  if (!isValidOperation) {
    return res.status(400).send('invalid update property');
  }

  try {
    updates.forEach(async (update) => {
      req.user[update] = req.body[update]
    })
    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(400).send(err)
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
