const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Entry extends Model {}

Entry.init(
    {
        entryid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeStamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "user",
              key: "id",
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "entry",
    }
);

module.exports = Entry;