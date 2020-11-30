import {makeExecutableSchema} from 'graphql-tools'
import {resolvers, typeDefs} from 'apolloServer/graphql'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
