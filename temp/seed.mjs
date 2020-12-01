import pkg from 'mongodb'
const {MongoClient} = pkg
import listings from './listings.mjs'
import users from './users.mjs'
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
  const listingsCollection = db.collection('listings')
  return {listingsCollection, client}
}

const seed = async () => {
  try {
    console.log(`[seed] : running...`)
    const {listingsCollection, client} = await connectToDatabase()

    for (const listing of listings) {
      await listingsCollection.insertOne(listing)
    }

    console.log(`Successfully seeded database...`)
    client.close()
  } catch (error) {
    throw new Error('failed to seed database')
  }
}

seed()
