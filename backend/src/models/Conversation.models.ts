import sequelize from "../config/database";
import { DataTypes } from "sequelize";

export const Conversation = sequelize.define('Conversation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'en_attente'
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    agent_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    closed_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

