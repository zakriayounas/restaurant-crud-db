const { MongoClient } = require("mongodb");
require('dotenv').config();

let dbInstance;
const connectionUrl = process.env.MONGODB_URL;

const connectToDb = (callback) => {
    if (dbInstance) return callback();
    MongoClient.connect(connectionUrl)
        .then((client) => {
            dbInstance = client.db();
            callback();
        })
        .catch((error) => {
            console.error('Failed to connect to the database', error);
            callback(error);
        });
};

const getDb = () => {
    if (!dbInstance) throw new Error('Database not initialized');
    return dbInstance;
};

module.exports = { connectToDb, getDb };
