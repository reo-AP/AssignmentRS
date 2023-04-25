import { Sequelize } from "sequelize";
const mongoose = require('mongoose');
require('dotenv').config();


const MongoDBUrl = process.env.MONGO_URL;
export async function connectMongoDB(){
    await mongoose.connect(MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, (err: any) => { console.log(err) });
}


