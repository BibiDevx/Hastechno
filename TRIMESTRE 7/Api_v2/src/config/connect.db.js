import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({path: ".env"});

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        //logging: false
    }
);

async function testConnection() {
    try {
        await sequelize
        .authenticate()
        .then(() => {
            console.log("Connection has been established successfully.");
        })
        .catch((err)=>{
            console.log(err);
        });
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

testConnection();

export default sequelize;