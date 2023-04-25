const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

const MYSQL_USER: string = process.env.MYSQL_USER_NAME || "";
const MYSLQ_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DB: string = process.env.MYSQL_DB || "";
const MYSQL_HOST = process.env.MYSQL_HOST


export const sequelize = new Sequelize(
    MYSQL_DB,
    MYSQL_USER,
    MYSLQ_PASSWORD,
     {
       host: MYSQL_HOST,
       dialect: 'mysql'
     }
   );
 
 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error: any) => {
    console.error('Unable to connect to the database: ', error);
 });
