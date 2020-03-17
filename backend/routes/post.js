const router = require('express').Router();
const db = require('../models');

router.post('/', async (req, res, next) => {
  try {
    const {
      body: { content },
      user: { id },
    } = req;

    if (!id) {
      return res.status(401);
    }

    const hashtags = content.match(/#[^/s]+/g); // 'OOOO #OO #OO OOOO.'
    const newPost = await db.Post.create({
      content: content,
      UserId: id,
    });

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() },
          }),
        ),
      );

      await newPost.addHashtags(result.map(tags => tags[0])); // sequelize 에서 model의 associate를 보고 자동 생성되는 메소드
    }

    // const user = await newPost.getUser();
    // newPost.user = user;

    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
        },
      ],
    });

    res.json(fullPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/images', (req, res) => {});

module.exports = router;
