const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//local host dev
//'mongodb://127.0.0.1:27017/journal-app'
//process.env.DB_URI - production deployment
//atlas cluster connection str

// mongodb+srv://heroku_x07dts06:<password>@cluster-x07dts06.rv6xw.mongodb.net/<dbname>?retryWrites=true&w=majority
