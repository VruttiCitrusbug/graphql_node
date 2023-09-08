const {model,Schema, SchemaType} = require('mongoose');

const Userschema = new Schema({
    name:String,
    email:String,
    password:String
},{
    timestamps:true
})

module.exports = model('User',Userschema);