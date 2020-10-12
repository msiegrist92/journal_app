const jwt = require('jsonwebtoken');
const User = require('../db/schemas/user.js');
const Tokens = require('../db/schemas/tokens.js');
const popTokens = require('./populate_tokens.js');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user_id = decoded._id;


    //replace second argument with user's populated virtual
    const user = await User.findById(user_id);
    const tokens = await popTokens.getAll(user_id);
    if (!user){
      //this will trigger catch block
      throw new Error();
    }

    //ensure authorization token is present in user's tokens virtual
    const jwts = [];
    for (let val of tokens){
      jwts.push(val.token)
    }



    if(!jwts.includes(token)){
      throw new Error()
    }



    req.token = token;
    req.user = user;
    next();

  } catch (err) {
    res.status(401).send({error: "Pls auth"});
  }
}

const REGEXP = /(?<=token=)[\w-]+\.[\w-]+\.[\w-]+/

module.exports = auth;
