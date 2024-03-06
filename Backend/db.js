const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/MyzBook";

const ConnectMongo=()=>{
        mongoose.connect(mongoURI,()=>{
            console.log("Connected Mongodb Succesfully");
        })
} 

module.exports = ConnectMongo;