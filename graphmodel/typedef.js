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

input logininput{
    email:String,
    password:String
}

type Query{
    user(ID: ID!): user!
    getuser(amount:Int): [user]
}

type Mutation {
    createuser(userinput: userinput): user!
    deleteuser(ID:ID!): Boolean
    edituser(ID:ID!,userinput:userinput): user
    loginuser(logininput:logininput):String
}
`