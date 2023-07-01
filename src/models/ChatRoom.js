module.exports = (sequelize, DataTypes) => {
    const ChatRoom = sequelize.define(
        "ChatRoom",
        {
            roomTitle: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.ENUM("DIRECT MESSAGE", "CHAT ROOM"),
                defaultValue: "DIRECT MESSAGE",
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

        ChatRoom.hasMany(models.ChatMember, {
            foreignKey: {
                name: "chatRoomId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return ChatRoom;
};
