module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define(
    "ChatRoom",
    {
      roomTitle: {
        type: DataTypes.STRING,
      },
    },
    { underscored: true }
  );

  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.Message, {
      foreignKey: {
        name: "chatRoomId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });

    ChatRoom.belongsTo(models.User, {
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return ChatRoom;
};
