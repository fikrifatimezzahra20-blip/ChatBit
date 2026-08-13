import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";

export const Conversation =  sequelize.define('Conversation',{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
},
subject:{
    type:DataTypes.INTEGER,
    allowNull:false,
},
status:{
    type:DataTypes.INTEGER,
    unique:true,
    allowNull:false
},
client_id:{
    type:DataTypes.STRING,
    allowNull:false,
},
agent_id:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
},
created_at:{
    type:DataTypes.DATE,
    allowNull:true

},
closed_at:{
    type:DataTypes.DATE,
    allowNull:true
}

})
