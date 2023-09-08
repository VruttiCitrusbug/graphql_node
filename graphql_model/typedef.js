const {gql} = require('apollo-server')

module.exports = gql`
type user{
    name:String,
    email:String,
    password:String
}

input userinput{
    name:String,
    email:String,
    password:String
}

type Query{
    user(ID: ID!): user!
    getuser(amount:Int): [user]
}

type Multation{
    createuser(userinput: userinput): user!
    deleteuser(ID:ID!): Boolean
    edituser(ID:ID!,userinput:edituserinput):
}


`
// input edituserinput{
    
// }