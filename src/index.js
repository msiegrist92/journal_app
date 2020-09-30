const express = require('express');
require('./db/mongoose.js');
const hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(express.json());


app.set('view engine', 'hbs');
app.set('views', "templates/views");
hbs.registerPartials("templates/partials");

app.use(express.static('public'));

const user_router = require('./routers/user.js');
const entry_router = require('./routers/entry.js');
const page_router = require('./routers/pages.js');
app.use(entry_router);
app.use(page_router);
app.use(user_router);

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json()

app.listen(port, () => {
  console.log('app is up on port ' + port);
})
