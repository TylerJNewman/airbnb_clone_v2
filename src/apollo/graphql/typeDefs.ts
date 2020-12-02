import gql from 'graphql-tag'

export const typeDefs = gql`
  type Query {
    authUrl: String!
  }

  type Mutation {
    logIn: String!
    logOut: String!
  }
`
