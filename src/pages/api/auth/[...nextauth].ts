import {NextApiHandler} from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
// import Adapters from 'next-auth/adapters'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // database: process.env.MONGODB_URI_NEXT_AUTH,
}

// we will define `options` up next
const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
