const router = require('express').Router();
const bcrypt = require('bcrypt');
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

router.post('/login', (req, res) => {});

router.post('/logout', (req, res) => {});

router.delete('/:id/follow', (req, res) => {});

router.delete('/:id/follower', (req, res) => {});

module.exports = router;
