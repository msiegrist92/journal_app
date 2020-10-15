const mongoose = require('mongoose');

mongoose.connect(process.env.MONGDB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
