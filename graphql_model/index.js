const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./typedef');
const resolvers = require('./resolvers');

const app = express();

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start(); // Start the Apollo Server

    server.applyMiddleware({ app }); // Integrate Apollo Server with Express

    mongoose.connect('mongodb://127.0.0.1:27017/index-api')
        .then(() => {
            app.listen({ port: 3000 }, () =>
                console.log(`Server is running at http://localhost:3000${server.graphqlPath}`)
            );
        })
        .catch(err => {
            console.error("Error connecting to MongoDB:", err);
        });
}

startApolloServer();
