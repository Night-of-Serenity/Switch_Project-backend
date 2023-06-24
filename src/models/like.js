module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {}, { underscored: true });

    Like.associate = (models) => {
        Like.hasMany(models.Notification, {
            foreignKey: {
                name: "likeId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
        Like.belongsTo(models.Post, {
            foreignKey: {
                name: "postId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
        Like.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
        Like.belongsTo(models.Reply, {
            foreignKey: {
                name: "replyId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
    };
    return Like;
};
