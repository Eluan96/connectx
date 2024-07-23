import { Sequelize, Transaction } from "sequelize";
import dotenv from "dotenv";
import dbConfig from "./dbConfig";
dotenv.config();

export const {
  GMAIL_USER,
  GMAIL_PASSWORD,
  APP_SECRET,
} = process.env;

export const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
} = dbConfig;

export const db = new Sequelize(
  DB_NAME!,
  DB_USERNAME!,
  DB_PASSWORD as string,
  {
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
  }
);



