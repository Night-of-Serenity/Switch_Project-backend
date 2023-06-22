module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            username: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            firstName: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
            },
            bio: {
                type: DataTypes.STRING,
            },
            coverImageUrl: DataTypes.STRING,
            profileImageUrl: DataTypes.STRING,
            isGoogleLogin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            googleAccSub: {
                type: DataTypes.UUID,
            },
            googleAccName: DataTypes.STRING,
        },
        {
            underscored: true,
            paranoid: true,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Post, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Reply, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Like, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Follow, {
            as: "Following",
            foreignKey: {
                name: "folllowingUserId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Follow, {
            as: "Follower",
            foreignKey: {
                name: "followerUserId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.ReswitchProfile, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.ReswitchReply, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Message, {
            as: "Sender",
            foreignKey: {
                name: "senderId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.ChatMember, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });

        User.hasMany(models.Notification, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onDelete: "RESTRICT",
        });
    };

    return User;
};
