const express = require('express');
const router = new express.Router();

router.get('/create', async (req, res) => {
  await res.render('create');
})

router.get('/recent', async (req, res) => {
  await res.render('recent');
})

router.get('/calendar', async (req, res) => {
  res.render('calendar');
})

module.exports = router;
