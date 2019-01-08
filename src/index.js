import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import typeDefs from './schema.graphql';
import resolvers from './resolvers/resolvers';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request,
    };
  },
});

server.start(() => {
  console.log('Graphql server running...');
});
