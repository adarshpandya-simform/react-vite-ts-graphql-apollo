import { createYoga, createSchema } from 'graphql-yoga';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

export const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
