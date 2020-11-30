import {ApolloServer} from 'apollo-server-micro'
import {connectToDatabase} from 'apolloServer/database'
import {schema} from 'lib/schema'

const apolloServer = new ApolloServer({
  schema,
  context: async (ctx) => {
    return {
      ...(await connectToDatabase()),
      ...ctx,
    }
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({path: '/api'})
