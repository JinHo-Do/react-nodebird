const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async (req, res, next) => {
  try {
    const { name } = req.params;
    const posts = await db.Posts.findAll({
      include: [
        {
          model: db.hashtag,
          where: { name: decodeURIComponent(name) },
        },
        {
          model: db.User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
