const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const user_schema = Schema({

  _id: Schema.Types.ObjectId,

  email : {
    lowercase: true,
    unique: true,
    type: String,
    required: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error ('invalid email address')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if(value.length < 6){
        throw new Error("password must be longer than six chars")
      }
      if(value.toLowerCase().includes('password')){
        throw new Error("password cannot be 'password'")
      }
    }
  },
  //user schema holds an array of auth tokens
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

//toJSON runs whenever object is parsed as toJSON
//declared as regular function so it binds to .this of schema instance
user_schema.methods.toJSON = function () {
  const user = this;
  const user_obj = user.toObject();
  delete user_obj._id;
  delete user_obj.password;

  return user_obj;
}

//middleware which hashes password before creating or modifying
user_schema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
})

//instance method which generates and returns an auth token upon login or creation
user_schema.methods.generateAuthToken = async function() {
  const user = this;
  //token holds user's id
  const token = jwt.sign({_id: user._id.toString()}, process.env.TOKEN_SECRET);
  //token is added to tokens array of user's document
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}

user_schema.statics.findUser = async (email, password) => {
  const user = await User.findOne({email});

  if(!user){
    throw new Error('unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch){
    throw new Error('unable to login');
  }

  return user;
}

user_schema.virtual('entries', {
  ref: 'Entry',
  localField: '_id',
  foreignField: 'owner',
})


const User = mongoose.model("User", user_schema);
module.exports = User;
