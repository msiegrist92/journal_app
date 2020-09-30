const express = require('express');
const calendar = require('../utils/calendar.js');
const router = new express.Router();
const app = express();

const in_links = {
  option_1: "Create",
  link_1: "/create",
  option_2: "Calendar",
  link_2: "/calendar",
  option_3: "Recents",
  link_3: "/recent",
  option_4: "Search",
  link_4: "/search",
  option_5: "Log Out"
}

router.get('/', async (req, res) => {
  await res.render('/', {
    option_1: "Log In",
    option_2: "Sign Up",
    option_3: "Help",
    option_4: "About",
  });
})

router.get('/search', async (req, res) => {
  await res.render('search', in_links)
})

router.get('/create', async (req, res) => {
  await res.render('create', in_links)
})

router.get('/recent', async (req, res) => {
  await res.render('recent', in_links);
})

router.get('/calendar', async (req, res) => {
  let cal = calendar.createCal();
  res.render('calendar', cal);
})

module.exports = router;
