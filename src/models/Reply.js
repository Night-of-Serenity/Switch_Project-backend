module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define(
        "Reply",
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

    Reply.associate = (models) => {
        Reply.belongsTo(models.Post, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        Reply.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        Reply.hasMany(models.Like, {
            foreignKey: {
                name: "replyId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });

        Reply.hasMany(models.ReswitchProfile, {
            foreignKey: {
                name: "replyId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });

        Reply.hasMany(models.Notification, {
            foreignKey: {
                name: "replyId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return Reply;
};
