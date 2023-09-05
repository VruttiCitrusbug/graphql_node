var { graphql, buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    id: Int,
    name: String
  }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
  id: () => {
    return 2;
  },
}

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema,
  source: "{ id }",
  rootValue,
}).then(response => {
  console.log(response)
  //{ data: [Object: null prototype] { id: 2 } }
})