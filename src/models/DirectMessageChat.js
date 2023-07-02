module.exports = (sequelize, DataTypes) => {
    const DirectMessageChat = sequelize.define(
        "DirectMessageChat",
        {
            textcontent: {
                type: DataTypes.STRING,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
        },
        { underscored: true }
    );

    DirectMessageChat.associate = (models) => {
        DirectMessageChat.belongsTo(models.User, {
            as: "Sender",
            foreignKey: {
                name: "senderId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        DirectMessageChat.belongsTo(models.User, {
            as: "Receiver",
            foreignKey: {
                name: "receiverId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return DirectMessageChat;
};
