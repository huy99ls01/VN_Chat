import mongoose from "mongoose";
import bluebird from "bluebird";

/** 
 * Connect to MongoDB
 * 
 */
let connectDB = () => { 
    mongoose.Promise = bluebird;

    //let DB_CONNECTION = "mongodb";
    //let DB_HOST = "localhost";
    //let DB_PORT = 27017;
    //let DB_NAME = "VN_Chat";
    //let DB_USERNAME = "";
    //let DB_PASSWORD = "";
    //  mongodb://localhost:20717/VN_Chat
    let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    return mongoose.connect(URI, {useMongoClient: true});
};

module.exports = connectDB;
