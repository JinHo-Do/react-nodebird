module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      src: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );

  Hashtag.assoceate = db => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };

  return Hashtag;
};