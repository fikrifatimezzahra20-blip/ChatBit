import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";

export const Message =  sequelize.define('Message',{
id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
},
convrsation_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
},
sender_id:{
    type:DataTypes.INTEGER,
    unique:true,
    allowNull:false
},
content:{
    type:DataTypes.STRING,
    allowNull:false,
},
is_read:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
},
sent_at:{
    type:DataTypes.DATE,
    allowNull:false,
}

})


