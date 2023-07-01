module.exports = (sequelize) => {
    const ChatMember = sequelize.define(
        "ChatMember",
        {},
        { underscored: true }
    );

    ChatMember.associate = (models) => {
        ChatMember.belongsTo(models.ChatRoom, {
            foreignKey: {
                name: "chatRoomId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        ChatMember.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return ChatMember;
};
