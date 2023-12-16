const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();


const connect = async (url)=>{
    mongoose.connect(url || process.env.MONGODB_URL || 'mongodb://127.0.0.1/cronjobs');
    mongoose.connection.on("connected", ()=>{
        console.log('connected to db successfully');
    })
    mongoose.connection.on("error", (err)=>{
        console.log('db connection unsuccessful');
        console.log(err);
    })
}

module.exports = {
    connect
}