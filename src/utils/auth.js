const jwt = require('jsonwebtoken');
const User = require('../db/schemas/user.js');

const auth = async (req, res, next) => {
  try {

    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'bigfluffykitter');
    //user's id is stored on the token
    //does user have the current token?
    const user = await User.findOne({_id: decoded._id, 'tokens.token':token});

    if (!user){
      //this will trigger catch block
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({error: "Pls auth"});
  }
}

module.exports = auth;
