module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      notificationActionName: {
        type: DataTypes.ENUM,
        values: [
          "USER POST WAS REPLIED",
          "USER POST WAS RESWITCHED",
          "USER REPLY WAS RESWITCHED",
          "FOLLOWING CREATE NEW POST",
          "USER HAS NEW FOLLOWER",
          "USER POST WAS LIKED",
          "USER REPLY WAS LIKED",
        ],
      },
      isView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Notification.belongsTo(models.Like, {
      foreignKey: {
        name: "likeId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Notification.belongsTo(models.Follow, {
      foreignKey: {
        name: "followId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Notification.belongsTo(models.Post, {
      foreignKey: {
        name: "postId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Notification.belongsTo(models.Reply, {
      foreignKey: {
        name: "replyId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Notification.belongsTo(models.ReswitchProfile, {
      foreignKey: {
        name: "reswitchProfileId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Notification;
};
