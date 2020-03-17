const router = require('express').Router();
const db = require('../models');

router.get('/', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [{ model: db.User, attributes: ['id', 'nickname'] }], // password를 가져 오지 않기.
      order: [['createdAt', 'DESC'] /* ['updatedAt', 'ASC'] */],
    });
    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
