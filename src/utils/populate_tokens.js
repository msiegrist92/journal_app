const User = require('../db/schemas/user.js');
const Tokens = require('../db/schemas/tokens.js')

const getAll = async (user_id) => {
  const user = await User.findById(user_id);
  const tokens = await user.populate('tokens').execPopulate();
  const all_tokens = user.tokens;
  return all_tokens;
}

module.exports = {
  getAll: getAll
}
