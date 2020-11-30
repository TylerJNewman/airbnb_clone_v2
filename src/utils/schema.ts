import {makeExecutableSchema} from 'graphql-tools'
import {resolvers, typeDefs} from 'apollo/graphql'

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})
