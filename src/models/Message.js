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
    Message.belongsTo(models.Chat, {
      foreignKey: {
        name: "chatId",
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

    Message.belongsTo(models.User, {
      as: "Receiver",
      foreignKey: {
        name: "receiverId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Message;
};
