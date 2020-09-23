const express = require('express');
const Entry = require('../db/schemas/entry.js');
const router = new express.Router();
const bodyParser = require('body-parser')
const json_parser = bodyParser.json();

//create a new entry
router.post('/entries', json_parser, async (req, res) => {
  //passing req.body to entry schema
  const entry = new Entry({
    sleep: req.body.sleep,
    diet: req.body.diet,
    expenses: req.body.expenses,
    income: req.body.income,
    exercise: req.body.exercise,
    work: req.body.work,
    notes: req.body.notes
  });

  try {
    await entry.save();
    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err);
  }
})

//retrieve all entries
router.get('/entries', async (req, res) => {

  try {
    //await goes with function call not with declaring a variable u dummy
    const entries = await Entry.find({});
    res.status(200).send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
})

//will need to URI encode date string
//find entry by data
router.get('/entries/:date', async (req, res) => {
  const date = req.params.date;

  try {
    const entry = await Entry.find({date});
    res.status(200).send(entry);
  } catch (error) {
    res.status(400).send(error);
  }
})

router.get('/entries/recents/:amount', async (req, res) => {
  const amount = parseInt(req.params.amount);
  try {
    //await goes with function call not with declaring a variable u dummy
    const entries = await Entry.find({}).sort({"_id": -1}).limit(amount);
    res.send(entries);
  } catch (error) {
    res.status(400).send(error);
  }
})



//update entry
router.patch('/entries/:date', async (req, res) => {
  const date = req.params.date;
  const allowed = ['sleep', 'diet', 'expenses', 'income', 'exercise',
  'work', 'date', 'notes'];

  //ensures req.body only contains keys defined in schema
  const input_attempt = Object.keys(req.body);
  const isValid = input_attempt.every((keys) => allowed.includes(keys));

  if (!isValid){
    return res.status(400).send("invalid update property");
  }
  try {
    //for each key input to update - change entry to req.body property
    //find({}) returns an array
    const entry = await Entry.find({date});
    input_attempt.forEach((key) => entry[0][key] = req.body[key]);
    console.log(entry)
    await entry[0].save();
    res.status(200).send(entry);
  } catch (err) {
    res.status(500).send(err);
  }
})

//delete one entry by date
router.delete('/entries/:date', async (req, res) => {
  const date = req.params.date;
  const allowed = 'date';

  try {
    const entry = await Entry.findOneAndDelete({date});
    res.status(200).send(entry);
  } catch (err) {
    res.status(500).send(err);
  }

})

module.exports = router;
