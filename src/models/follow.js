module.exports = (sequelize, DataTypes) => {
    const Follow = sequelize.define(
        "Follow",
        {},
        {
            underscored: true,
            paranoid: true,
        }
    );

    Follow.associate = (models) => {
        Follow.belongsTo(models.User, {
            as: "Following",
            foreignKey: {
                name: "folllowingUserId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });

        Follow.belongsTo(models.User, {
            as: "Follower",
            foreignKey: {
                name: "followerUserId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
    };

    return Follow;
};
