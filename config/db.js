require('dotenv').config()
const mongoose = require('mongoose');
let ConnectionString = "mongodb+srv://anbatquoclong_db_user:An21022004@cluster003.jqwvtsv.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster003"

module.exports = function(){

    mongoose.connect(ConnectionString);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log('====> Connected to MongoDB.');
    })

    return mongodb;
}