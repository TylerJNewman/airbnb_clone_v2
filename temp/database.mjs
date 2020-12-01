import pkg from 'mongodb'
const {MongoClient} = pkg
import dotenv from 'dotenv'
dotenv.config()

const {MONGODB_URI, MONGODB_DB} = process.env

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local',
  )
}

async function connectToDatabase() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  const client = await MongoClient.connect(MONGODB_URI, opts).catch((err) =>
    console(err),
  )
  const db = client.db(MONGODB_DB)
  return {
    db: {
      bookings: db.collection('bookings'),
      listings: db.collection('listings'),
      users: db.collection('users'),
    },
    client,
  }
}

export default connectToDatabase
