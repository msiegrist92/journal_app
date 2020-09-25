const express = require('express');
const router = new express.Router();

router.get('/', async (req, res) => {
  await res.render('create', {
    option_1: "Log In",
    option_2: "Sign Up",
    option_3: "Help",
    option_4: "About",
  });
})

router.get('/create', async (req, res) => {
  await res.render('create', {
    option_1: "Create",
    option_2: "Calendar",
    option_3: "Recents",
    option_4: "Search",
    option_5: "Log Out"
  });
})

router.get('/recent', async (req, res) => {
  await res.render('recent', {
    option_1: "Create",
    option_2: "Calendar",
    option_3: "Recents",
    option_4: "Search",
    option_4: "Log Out"
  });
})

router.get('/calendar', async (req, res) => {
  res.render('calendar', {
    option_1: "Create",
    option_2: "Calendar",
    option_3: "Recents",
    option_4: "Search",
    option_4: "Log Out"
  });
})

module.exports = router;
