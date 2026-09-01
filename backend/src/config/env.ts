
import dotenv from 'dotenv';

dotenv.config();

export const nameDB = process.env.POSTGRES_DB || 'postgres';
export const UserDB = process.env.POSTGRES_USER || 'postgres';
export const PassWord = process.env.POSTGRES_PASSWORD || 'chatbit_password';
export const Host = process.env.DB_HOST || 'localhost';
export const Port = Number(process.env.DB_PORT) || 5432;
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_change_me';
export const SERVER_PORT = Number(process.env.PORT) || 3001;


