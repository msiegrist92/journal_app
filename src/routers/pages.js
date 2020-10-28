const express = require('express');
const calendar = require('../utils/calendar.js');
const me = require('../utils/me.js');
const link = require('../utils/currentCalLink.js');

const router = new express.Router();
const app = express();

const in_links = {
  option_1: "Create",
  link_1: "/create",
  option_2: "Calendar",
  link_2: "",
  option_3: "Recents",
  link_3: "/recent",
  option_4: "Search",
  link_4: "/search",
  option_5: "Account",
  link_5: '/me',
  option_6: 'Logout'
}

router.get('/', async (req, res) => {
  await res.render('index', {
    option_1: "Log In",
    link_1: "/login",
    option_2: "Sign Up",
    link_2: "/sign_up"
  });
})

router.get('/search', async (req, res) => {
  in_links.link_2 = link.currentCalLink();
  await res.render('search', in_links)
})

router.get('/create', async (req, res) => {
  in_links.link_2 = link.currentCalLink();
  await res.render('create', in_links)
})

router.get('/recent', async (req, res) => {
  in_links.link_2 = link.currentCalLink();
  await res.render('recent', in_links);
})

router.get('/help', async (req, res) => {
  in_links.link_2 = link.currentCalLink();
  await res.render('help', in_links);
})

router.get('/calendar/:month&:year', async (req, res) => {
  const month = req.params.month;
  const year = req.params.year;
  let cal = calendar.createCal(month, year);
  await res.render('calendar', cal);
})

router.get('/me', async (req, res) => {


  const to_render = {};

  //can we create more of to_render in createRender in /me utils
  me.createRender(req.cookies.token, req.hostname).then(async (obj) => {
    to_render.recent = obj.recent;
    to_render.first = obj.first;
    to_render.consistency = obj.consistency;
    to_render.email = obj.email;
    to_render.option_1 = "Create"
    to_render.option_2 = "Calendar"
    to_render.option_3 = "Recents"
    to_render.option_4 = "Search"
    to_render.option_5 = "Account"
    to_render.option_6 = 'Logout'
    to_render.link_1 = '/create'
    to_render.link_2 = link.currentCalLink();
    to_render.link_3 = '/recent'
    to_render.link_4 = '/search'
    to_render.link_5 = '/me'

    await res.render('me', to_render)
  })

})

router.get('/login', async (req, res) => {
  res.render('login', {
    link_1: '/login',
    option_1: 'Login',
    link_2: '/sign_up',
    option_2: 'Sign Up'
  });
})

router.get('/sign_up', async (req, res) => {
  res.render('sign_up', {
    link_1: '/login',
    option_1: 'Login',
    link_2: '/sign_up',
    option_2: 'Sign Up'
  })
})

module.exports = router;
