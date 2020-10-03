
const User = require('../db/schemas/user.js');

const allowed = ['sleep', 'diet', 'expenses', 'income', 'exercise',
'work', 'notes'];

const getAll = async (user_id) => {
  const user = await User.findById(user_id);
  const entries = await user.populate('entries').execPopulate();
  const all = user.entries;;
  return all;
}

const getByDate = async (user_id, date) => {
  const user = await User.findById(user_id);
  const entries = await user.populate({
    path: 'entries',
    match: {date}
  }).execPopulate();
  return user.entries;
}

const getRecents = async (user_id, amount) => {
  const user = await User.findById(user_id)
  const entries = await user.populate('entries').execPopulate();
  user.entries.reverse();
  user.entries.length = amount;
  return user.entries;
}

const getByMonth = async (user_id, month) => {
  const user = await User.findById(user_id);
  const entries = await user.populate('entries').execPopulate();
  let in_month = [];
  for(let entry of user.entries){
    if(entry.date.includes(month)){
      in_month.push(entry);
    }
  }
  return in_month;
}

const updateEntry = async (user_id, date, body) => {
  const user = await User.findById(user_id);
  const entries = await user.populate({
    path: 'entries',
    match: {date}
  }).execPopulate();
  for(key in body){
    user.entries[0][key] = body[key];
  }
  await user.entries[0].save();
}

const verifyUpdate = (body) => {
  const input_attempt = Object.keys(body);
  const isValid = input_attempt.every((keys) => allowed.includes(keys));
  return isValid;
}

module.exports = {
  getAll : getAll,
  getByDate: getByDate,
  getRecents: getRecents,
  getByMonth: getByMonth,
  updateEntry: updateEntry,
  verifyUpdate: verifyUpdate
}
