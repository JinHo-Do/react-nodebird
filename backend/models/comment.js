module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  );

  Comment.assoceate = db => {
    db.Comment.belongsTo(db.Users);
    db.Comment.belongsTo(db.Post);
  };

  return Comment;
};
