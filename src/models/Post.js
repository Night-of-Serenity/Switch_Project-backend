module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "Post",
        {
            textcontent: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
        },
        {
            underscored: true,
            paranoid: true,
        }
    );

    Post.associate = (models) => {
        Post.hasMany(models.ReswitchProfile, {
            foreignKey: {
                name: "postId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
        Post.hasMany(models.Reply, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
        Post.hasMany(models.Notification, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
        Post.hasMany(models.Like, {
            foreignKey: {
                name: "postId",
                allowNull: true,
            },
            onDelete: "RESTRICT",
        });
        Post.hasMany(models.PostToTag, {
            foreignKey: {
                name: "postId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
        Post.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return Post;
};
