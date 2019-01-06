import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import typeDefs from './schema.graphql';
import resolvers from './resolvers/resolvers';
import './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log('Graphql server running...');
});
