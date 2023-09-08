const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

async function startserver(){
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
        type Todo{
            id: ID!
            title:String!
            completed: Boolean
        }
        type Query{
            getTodo: [Todo]
        }
        `,
        resolvers:{
            Query:{
                getTodo: () => [
                    {id:1, title:'Some text',completed: false},
                ]
                // getTodo: async () => await axios.get('https://jsonplaceholder.typicode.com/todos').data
            }
        }
    });
    //ID! (! indicated required field )
    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphsql",expressMiddleware(server));

    app.listen(3000,()=>{
        console.log("server start at http://localhost:3000/graphsql")
    })
}

//Operation

// query ExampleQuery {
//     getTodo {
//       id
//       title
//     }
//   }

//Response

// {
//     "data": {
//       "getTodo": [
//         {
//           "id": "1"
//         }
//       ]
//     }
//   }

startserver()