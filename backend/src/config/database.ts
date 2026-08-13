
import { Sequelize } from "sequelize";
import { Host, nameDB, PassWord, Port, UserDB } from "./env";

const sequelize = new Sequelize
(nameDB,
   UserDB,
   PassWord, {
   host: Host,
   port:Port,
   dialect: "postgres",
   }
);
export default sequelize;

