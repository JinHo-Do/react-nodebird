const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/follow', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.post('/', async (req, res, next) => {
  try {
    const { userId, nickname, password } = req.body;
    const exUser = await db.User.findOne({
      where: {
        userId,
      },
    });

    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12); // salt는 10 ~ 13 사이로
    const newUser = await db.User.create({
      nickname,
      userId,
      password: hashedPassword,
    });
    console.log('newUser: ', newUser);

    return res.json(newUser);
  } catch (error) {
    console.error(error);
    // TODO: 에러 핸들링
    return next(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    // local strategy done(...args)
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async loginError => {
      try {
        if (loginError) {
          return next(loginError);
        }

        const filteredUser = { ...user.toJSON() };
        delete filteredUser.password;

        return res.json(filteredUser);
      } catch (error) {
        console.error(error);
        return next(error);
      }
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logOut();
  req.session.destroy();
  res.send('로그아웃 성공');
});

router.delete('/:id/follow', (req, res) => {});

router.delete('/:id/follower', (req, res) => {});

module.exports = router;
