const mongoose = require('mongoose');
const validator = require('validator');
const formatDate = require('../../utils/date_regex.js');


const schema = new mongoose.Schema({
  sleep : {
    type: Number,
    required: true,
    validate(value){
      if(value < 1 || value > 10){
        throw new Error("Number must be between 1 and 10");
      }
    }
  },
  diet : {
    type: Number,
    required: true,
    validate(value){
      if(value < 1 || value > 10){
        throw new Error("Number must be between 1 and 10");
      }
    }
  },
  expenses : {
    type: Number,
    required: true,
    validate(value){
      if(value < 0){
        throw new Error("Value must be greater than 0");
      }
    }
  },
  income : {
    type: Number,
    required: true,
    validate(value){
      if(value < 0){
        throw new Error("Value must be greater than 0");
      }
    }
  },
  exercise: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true
  },
  notes : {
    type: String,
    required: true
  },
  //when creating an entry the date will always be the default value
  date: {
    type: String,
    default: formatDate(new Date().toString()),
    unique: true
  }
})

const Entry = mongoose.model("Entry", schema);

module.exports = Entry;
