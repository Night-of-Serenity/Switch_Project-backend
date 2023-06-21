module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      textcontent: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.ChatRoom, {
      foreignKey: {
        name: "chatRoomId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    Message.belongsTo(models.User, {
      as: "Sender",
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Message;
};
