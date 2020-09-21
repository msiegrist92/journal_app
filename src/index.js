const express = require('express');
require('./db/mongoose.js');
const Entry = require('./db/schemas/entry.js');
const hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'hbs');
app.set('views', "templates/views");
hbs.registerPartials("templates/partials");

app.use(express.static('public'));

const entry_router = require('./routers/entry.js');
const page_router = require('./routers/pages.js');
app.use(entry_router);
app.use(page_router);

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json()

app.listen(port, () => {
  console.log('app is up on port ' + port);
})
