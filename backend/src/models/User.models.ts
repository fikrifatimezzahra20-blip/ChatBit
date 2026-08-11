import { PassWord } from './../config/env';
import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";
const User =  sequelize.define('User',{
id:{
    type:DataTypes.STRING,
    primaryKey:true,
    autoIncrement:true
},
fullname:{
    type:DataTypes.STRING,
    allowNull:false,
},
email:{
    type:DataTypes.STRING,
    unique:true,
    allowNull:false
},
passwordHash:{
    type:DataTypes.STRING,
    allowNull:false,
},
role:{
    type:DataTypes.ENUM('CLIENT','AGENT'),
    allowNull:false,
}
})