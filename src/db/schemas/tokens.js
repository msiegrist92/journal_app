const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const token_schema = Schema({

  _id: Schema.Types.ObjectId,

  owner: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
    expires: 2700
  },

  token: {
    type: String,
    required: true,
    unique: true
  }

})

const Tokens = mongoose.model('Tokens', token_schema);
module.exports = Tokens;
