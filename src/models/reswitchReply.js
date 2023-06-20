module.exports = (sequelize, DataTypes) => {
    const ReswitchReply = sequelize.define(
        "ReswitchReply",
        {
          textcontent: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          },
          image: {
            type: DataTypes.STRING,
            validate: {
              notEmpty: true,
            },
          },
        },
        {
          underscored: true,
          paranoid: true,
        }
      );

      ReswitchReply.associate = (models) => {
       
        ReswitchReply.belongsTo(models.ReswitchProfile, {
            foreignKey: {
              name: "reswitchProfileId",
              allowNull: false,
            },
            onDelete: "RESTRICT",
          });
          ReswitchReply.belongsTo(models.User, {
            foreignKey: {
              name: "userId",
              allowNull: false,
            },
            onDelete: "RESTRICT",
          });
        
      };

    return ReswitchReply
}