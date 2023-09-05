var express = require("express")
var { graphqlHTTP } = require("express-graphql")
var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
    id: Int,
    name: String
}
`)

// The root provides a resolver function for each API endpoint
var root = {
    id: () => {
    return 1;
    },
    name: () =>{
        return "vrutti";
    }
}

var app = express() 
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")

// console
// fetch("/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({ query: "{ id }" }),
//   })
//     .then(r => r.json())
//     .then(data => console.log("data returned:", data))

//output
// data returned: 
//{data: {…}}data: {id: 1}id: 1[[Prototype]]: Object[[Prototype]]: Object
