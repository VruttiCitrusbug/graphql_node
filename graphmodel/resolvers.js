const User = require('./models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
    Query:{
        async user(_,{ID}) {
            return await User.findById(ID)
        },
        async getuser(_,{amount}) {
            return await User.find().sort({ createdAt: -1}).limit(amount)
        }
    },
    Mutation:{
        async createuser(_,{userinput:{name,email,password}}) {
            const createduser = new User({
                name:name,
                email:email,
                password: await bcrypt.hash(password,8)
            })
            const res = await createduser.save();

            return {
                id:res.id,
                ...res._doc
            }
        },
        async deleteuser(_,{ID}) {
            const user = await User.findById(ID)
            if(user){
                await User.deleteOne({_id:ID})
                return true;
            }
            else{
                return false;
            }
        },
        async edituser(_,{ID,userinput:{name,email,password}}) {
            await User.updateOne({_id:ID},{name:name,email:email,password:password})
            return await User.findById(ID)
        },
        async loginuser(_,{logininput:{email,password}}){
            try{
                const user1 = await User.findOne({email})

            if(!user1){
                throw new Error('unable to log in')
            }
            const ismatch = await bcrypt.compare(password,user1.password)

            if(!ismatch){
                throw new Error('unable to log in')
            }
            
            const token = await jwt.sign({_id:user1._id.toString()},'thisismynewtoken', {expiresIn:'7 days'})
            await user1.save()
            return token
        
            }catch(e){
                return "token"
            }
        }
    }
}