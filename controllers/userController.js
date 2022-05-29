const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.register = async (req, res, next) => {
  console.log('here2');
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  user.save((err) => {
    if (err) {
      return next(err);
    }
    return res.status(200).json({ msg: 'user added' });
  });
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};
