module.exports = (sequelize) => {
    const Chat = sequelize.define(
        "Chat",{},{underscored: true,}
    )

Chat.associate = (models) => {
    
    
    Chat.hasMany(models.Message, {
        foreignKey: {
          name: "chatId",
          allowNull: false,
        },
        onDelete: "RESTRICT",
      });
    
    
    
    Chat.belongsTo(models.Chat,{
        as: "UserOne",
      foreignKey: {
        name: "user1Id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Chat.belongsTo(models.Chat,{
        as: "UserTwo",
        foreignKey: {
          name: "user2Id",
          allowNull: false,
        },
        onDelete: "RESTRICT",
      })




}

return Chat

}