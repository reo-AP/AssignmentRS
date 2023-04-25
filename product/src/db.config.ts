import { Sequelize } from "sequelize";
const mongoose = require('mongoose');
require('dotenv').config();

export default class ConfigDB{
    private static MongoDBUrl = process.env.MONGO_URL;
    public static connectMongoDB: Function =  async function (){
    await mongoose.connect(ConfigDB.MongoDBUrl, {}).then(() => { console.log(`Connected to Mongo server`) }, (err: any) => { console.log(err) });
}
}



