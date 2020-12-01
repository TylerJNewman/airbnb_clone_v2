import connectToDatabase from './database.mjs'
import listings from './listings.mjs'
import users from './users.mjs'

let mongoClient

const seed = async () => {
  try {
    console.log(`[seed] : running...`)

    const {db, client} = await connectToDatabase()
    mongoClient = client

    console.log(`[seed] : begin seeding of listings...`)
    for (const listing of listings) {
      await db.listings.insertOne(listing)
    }
    console.log(`[seed] : sucessfully seeded listings`)

    console.log(`[seed] : begin seeding of users...`)
    for (const user of users) {
      await db.users.insertOne(user)
    }
    console.log(`[seed] : sucessfully seeded users`)

    console.log(`Successfully seeded database...`)
  } catch (error) {
    console.dir(error)
    throw new Error('failed to seed database')
  } finally {
    mongoClient?.close()
  }
}

seed()
