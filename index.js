const { knex } = require('./connection');
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
  }
  
  type Query {
    students: [Student]
  }
`;

const resolvers = {
    Query: {
      students: async() => await getStudents(),
    }
};

async function getStudents() {
    const result = await knex.select().from('student');
    return result;
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});
  
  // The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

/*(async() => {
    const students = await getStudents();
    console.log(students);
})();*/