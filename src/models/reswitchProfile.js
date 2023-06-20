module.exports = (sequelize, DataTypes) => {
    const ReswitchProfile = sequelize.define("ReswitchProfile", {}, { underscored: true });

    ReswitchProfile.associate = (models) => {
       
        ReswitchProfile.hasMany(models.Notification, {
          foreignKey: {
            name: "reswitchProfileId",
            allowNull: false,
          },
          onDelete: "RESTRICT",
        });
        ReswitchProfile.belongsTo(models.User, {
            foreignKey: {
              name: "userId",
              allowNull: false,
            },
            onDelete: "RESTRICT",
          });
          ReswitchProfile.belongsTo(models.Post, {
            foreignKey: {
              name: "postId",
              allowNull: false,
            },
            onDelete: "RESTRICT",
          });
          ReswitchProfile.belongsTo(models.Reply, {
            foreignKey: {
              name: "replyId",
              allowNull: false,
            },
            onDelete: "RESTRICT",
          });

      };

    return ReswitchProfile
}