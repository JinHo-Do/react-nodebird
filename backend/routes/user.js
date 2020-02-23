const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');

router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다.');
  }

  const user = { ...req.user.toJSON() };
  delete user.password;

  return res.json(user);
});

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

        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [
            // associate된 컬럼을 같이 가져온다.
            {
              model: db.Post,
              as: 'Posts', // User에서 Post를 Posts로 as 를 했기 때문에 as속성을 설정해 준다.
              attributes: ['id'], // password를 제외하기 위해 id만 가져온다.
            },
            {
              model: db.User,
              as: 'Followings',
              attributes: ['id'],
            },
            {
              model: db.User,
              as: 'Followers',
              attributes: ['id'],
            },
          ],
          attributes: ['id', 'nickname', 'userId'],
        });

        return res.json(fullUser);
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
