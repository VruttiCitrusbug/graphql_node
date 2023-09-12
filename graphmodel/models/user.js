const {model,Schema, SchemaType} = require('mongoose');

const Userschema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:{
            unique:true
        },
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 2,
        trim:true,
        index:{
            unique:true
        },
        unique:true
    },
    token:{
        type:String,
        require:false
    }
},{
    timestamps:false
})

module.exports = model('User',Userschema);