const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

//local host dev db
//'mongodb://127.0.0.1:27017/journal-app'

//process.env.DB_URI - production deployment db
//atlas cluster connection str
// mongodb+srv://<username>:<password>@cluster-x07dts06.rv6xw.mongodb.net/<dbname>?retryWrites=true&w=majority
