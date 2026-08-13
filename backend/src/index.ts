import sequelize from "./config/database";
import express from "express";
import route from "./routes/app";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(route);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been established successfully.");
        
        // Sync models with database (optional, but good for local development if tables don't exist)
        // await sequelize.sync();

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

startServer();