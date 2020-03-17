const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
  // [{ id: 3, cookie: 'asdfadsf' }]로 저장 후 쿠키로 유저 id 읽음
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  // id로 유저 정보를 읽음
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id },
      });

      return done(null, user); // req.user에 유저 정보 저장
    } catch (error) {
      console.error(error);
      return done(error);
    }
  });

  local();
};
