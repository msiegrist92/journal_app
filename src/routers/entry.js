const pop = require('../utils/populate_entries.js');
const User = require('../db/schemas/user.js');
const auth = require('../utils/auth.js');
const express = require('express');
const Entry = require('../db/schemas/entry.js');
const router = new express.Router();
const bodyParser = require('body-parser')
const json_parser = bodyParser.json();

//create a new entry
router.post('/entries', auth, json_parser, async (req, res) => {
  //passing req.body to entry schema
  const entry = new Entry({
    owner: req.user._id,
    sleep: req.body.sleep,
    diet: req.body.diet,
    expenses: req.body.expenses,
    income: req.body.income,
    exercise: req.body.exercise,
    work: req.body.work,
    notes: req.body.notes,
    date: req.body.date
  });

  try {
    await entry.save();
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
})

//retrieve all entries
router.get('/entries', auth, async (req, res) => {

  try {
    const entries = await pop.getAll(req.user._id);
    res.status(200).send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
})

//will need to URI encode date string
//find entry by data
router.get('/entries/:date', auth, async (req, res) => {
  const date_req = req.params.date;

  try {
    const entries = await pop.getByDate(req.user._id, date_req)
    res.status(200).send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
})

router.get('/entries/recents/:amount', auth,  async (req, res) => {
  const amount = parseInt(req.params.amount);
  try {
    const entries = await pop.getRecents(req.user._id, amount)
    res.send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
})

router.get('/entries/months/:month', auth, async (req, res) => {
  let month = req.params.month;
  try {
    const entries = await pop.getByMonth(req.user._id, month);
    res.status(200).send(entries);
  } catch (e) {
    res.status(500).send(e);
  }
})



//update entry
router.patch('/entries/:date', auth, json_parser, async (req, res) => {
  const date = req.params.date;
  const isValid = pop.verifyUpdate(req.body);
  if (!isValid){
    return res.status(400).send("invalid update property");
  }
  try {
    await pop.updateEntry(req.user._id, date, req.body);
    res.status(200).send('user updated');
  } catch (err) {
    res.status(500).send(err);
  }
})

//delete one entry by date
router.delete('/entries/:date', auth, json_parser, async (req, res) => {
  const date = req.params.date;

  try {
    const entry = await pop.getByDate(req.user._id, date);
    await entry[0].remove();
    res.status(200).send(entry[0]);
  } catch (err) {
    res.status(500).send(err);
  }

})

module.exports = router;
