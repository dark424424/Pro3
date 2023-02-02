var mongoose = require("mongoose")

const localURL = 'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false'
const cloudURL = `mongodb+srv://long:longpro423@cluster0.ihcowzt.mongodb.net/?retryWrites=true&w=majority`

const db = {
    url :cloudURL,
    options : {
        useNewUrlParser :true
    }

};

mongoose.connect(db.url,db.options, ()=>console.log("Connected Mongodb"));


module.exports = mongoose;