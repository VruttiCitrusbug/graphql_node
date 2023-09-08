const {ApolloServer} = require('@apollo/server');

const mongoose = require('mongoose');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect('mongodb://127.0.0.1:27017/index-api',{useNewParser:true})
    .then(()=>{
        server.listen({port:3000});
        console.log("server at http://localhost:3000");
    });