module.exports = (sequelize, DataTypes) => {
  const PostToTag = sequelize.define(
    "PostToTag",
    {},
    {
      underscored: true,
    }
  );

  PostToTag.associate = (models) => {
    PostToTag.belongsTo(models.Post, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    PostToTag.belongsTo(models.Tag, {
      foreignKey: {
        name: "tagId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return PostToTag;
};
