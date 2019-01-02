import { GraphQLServer } from 'graphql-yoga';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log('Graphql server running...');
});
