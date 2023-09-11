const User = require('./models/user')

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
                password:password
            })
            const res = await createduser.save();

            return {
                id:res.id,
                ...res._doc
            }
        },
        async deleteuser(_,{ID}) {
            return await User.deleteOne({_id:ID});
        },
        async edituser(_,{ID,userinput:{name,email,password}}) {
            await User.updateOne({_id:ID},{name:name,email:email,password:password})
            return await User.findById(ID)
        }
    }
}